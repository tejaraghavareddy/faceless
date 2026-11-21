#!/usr/bin/env python3
"""Generate per-beat narration audio, ambient score, and the Remotion timeline."""
import asyncio
import json
import math
import os
import subprocess
import wave

import edge_tts
import imageio_ffmpeg
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VO = os.path.join(ROOT, "public", "audio", "vo")
MUSIC = os.path.join(ROOT, "public", "audio", "music")
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FPS = 30

with open(os.path.join(ROOT, "scripts", "narration.json")) as f:
    script = json.load(f)


def duration(path: str) -> float:
    out = subprocess.run(
        [FFMPEG, "-i", path, "-f", "null", "-"],
        capture_output=True, text=True,
    ).stderr
    # ffmpeg reports "time=00:00:12.34"
    for line in out.splitlines():
        if "time=" in line:
            t = line.split("time=")[1].split(" ")[0]
            if ":" in t:
                h, m, s = t.split(":")
                return int(h) * 3600 + int(m) * 60 + float(s)
    raise RuntimeError(f"could not measure {path}")


async def synth(text: str, path: str) -> None:
    for attempt in range(4):
        try:
            comm = edge_tts.Communicate(text, script["voice"], rate=script["rate"])
            await comm.save(path)
            if os.path.getsize(path) > 4000:
                return
        except Exception as exc:  # network hiccup
            print("retry", attempt, exc)
            await asyncio.sleep(2)
    raise RuntimeError(f"TTS failed: {text[:40]}")


async def build_voice() -> None:
    for scene in script["scenes"]:
        for i, text in enumerate(scene["beats"], start=1):
            path = os.path.join(VO, f"{scene['id']}-b{i}.mp3")
            if not os.path.exists(path) or os.path.getsize(path) < 4000:
                await synth(text, path)
                print("voiced", os.path.basename(path))


def build_timeline() -> dict:
    gap = script["gap"]
    tail = script["sceneTail"]
    cursor = 0.0
    scenes = []
    for scene in script["scenes"]:
        start = cursor
        beats = []
        for i, text in enumerate(scene["beats"], start=1):
            path = os.path.join(VO, f"{scene['id']}-b{i}.mp3")
            dur = duration(path)
            beats.append({
                "text": text,
                "file": f"{scene['id']}-b{i}.mp3",
                "frame": round((cursor - start) * FPS),
                "seconds": round(cursor - start, 3),
                "durationInFrames": round(dur * FPS) + 2,
            })
            cursor += dur + gap
        spoken = cursor - gap + tail - start
        scenes.append({
            "id": scene["id"],
            "label": scene["label"],
            "startFrame": round(start * FPS),
            "durationInFrames": round(spoken * FPS),
            "beats": beats,
        })
        cursor = start + spoken
    total = scenes[-1]["startFrame"] + scenes[-1]["durationInFrames"]
    return {"fps": FPS, "totalFrames": total, "scenes": scenes}


def ambient_score(seconds: float, path: str) -> None:
    sr = 44100
    n = int(seconds * sr)
    t = np.arange(n) / sr
    rng = np.random.default_rng(7)

    # Slow harmonic pad: D minor-ish open fifths, very low level.
    chords = [
        [146.83, 220.00, 293.66],  # D
        [130.81, 196.00, 261.63],  # C
        [174.61, 261.63, 349.23],  # F
        [110.00, 164.81, 220.00],  # A
    ]
    chord_len = 14.0
    left = np.zeros(n)
    right = np.zeros(n)
    for k in range(int(math.ceil(seconds / chord_len))):
        a, b = int(k * chord_len * sr), int(min(n, (k + 1) * chord_len * sr))
        if b <= a:
            continue
        local = t[a:b] - t[a]
        env = np.minimum(1.0, local / 4.0) * np.minimum(1.0, (chord_len - local) / 4.0)
        env = np.clip(env, 0, 1) ** 1.5
        chord = chords[k % len(chords)]
        for j, f in enumerate(chord):
            for detune, pan in ((1.0, 0.0), (1.003, 0.45), (0.997, -0.45)):
                tone = np.sin(2 * np.pi * f * detune * local + j)
                tone += 0.28 * np.sin(2 * np.pi * f * 2 * detune * local)
                tone *= env * (0.055 / (j + 1))
                left[a:b] += tone * (1 - pan) * 0.5
                right[a:b] += tone * (1 + pan) * 0.5
    # Airy noise bed with slow swell.
    noise = rng.normal(0, 1, n)
    kernel = np.ones(2200) / 2200
    noise = np.convolve(noise, kernel, mode="same")
    swell = 0.5 + 0.5 * np.sin(2 * np.pi * t / 31.0)
    left += noise * swell * 0.006
    right += noise * swell * 0.006

    fade = int(3 * sr)
    for ch in (left, right):
        ch[:fade] *= np.linspace(0, 1, fade)
        ch[-fade:] *= np.linspace(1, 0, fade)

    peak = max(np.abs(left).max(), np.abs(right).max())
    left = left / peak * 0.5
    right = right / peak * 0.5
    stereo = np.stack([left, right], axis=1)
    pcm = (stereo * 32767).astype(np.int16)
    tmp = path.replace(".mp3", ".wav")
    with wave.open(tmp, "w") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes(pcm.tobytes())
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-i", tmp,
                    "-codec:a", "libmp3lame", "-b:a", "192k", path], check=True)
    os.remove(tmp)


async def main() -> None:
    os.makedirs(VO, exist_ok=True)
    os.makedirs(MUSIC, exist_ok=True)
    await build_voice()
    timeline = build_timeline()
    with open(os.path.join(ROOT, "src", "timeline.json"), "w") as f:
        json.dump(timeline, f, indent=2)
    print("total frames", timeline["totalFrames"],
          "=", round(timeline["totalFrames"] / FPS, 1), "s")
    for s in timeline["scenes"]:
        print(s["id"], s["label"], round(s["startFrame"] / FPS, 1), "->",
              round((s["startFrame"] + s["durationInFrames"]) / FPS, 1))
    ambient_score(timeline["totalFrames"] / FPS + 1.0,
                  os.path.join(MUSIC, "ambient.mp3"))
    print("music written")


if __name__ == "__main__":
    asyncio.run(main())
