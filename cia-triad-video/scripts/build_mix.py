#!/usr/bin/env python3
"""Assemble the final narration + ambient mix from the generated timeline."""
import json, os, subprocess, wave
import numpy as np
import imageio_ffmpeg

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FF = imageio_ffmpeg.get_ffmpeg_exe()
SR = 48000
tl = json.load(open(os.path.join(ROOT, "src", "timeline.json")))
dur = tl["totalFrames"] / tl["fps"] + 1.0
n = int(dur * SR)
mix = np.zeros((n, 2), dtype=np.float32)

def load(path, channels=2):
    tmp = "/tmp/_dec.wav"
    subprocess.run([FF, "-y", "-loglevel", "error", "-i", path, "-ar", str(SR), "-ac", str(channels), tmp], check=True)
    with wave.open(tmp) as w:
        data = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
        return data.reshape(-1, channels)

for scene in tl["scenes"]:
    for b in scene["beats"]:
        p = os.path.join(ROOT, "public", "audio", "vo", b["file"])
        a = load(p)
        start = int(round((scene["startFrame"] + b["frame"]) / tl["fps"] * SR))
        end = min(n, start + len(a))
        mix[start:end] += a[: end - start]

amb = load(os.path.join(ROOT, "public", "audio", "music", "ambient.mp3")) * 0.22
m = min(n, len(amb))
mix[:m] += amb[:m]

fade = int(SR * 1.5)
mix[:fade] *= np.linspace(0, 1, fade)[:, None]
mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
peak = float(np.abs(mix).max())
mix = mix / peak * 0.89
pcm = (mix * 32767).astype(np.int16)
wav = os.path.join(ROOT, "out", "mix.wav")
with wave.open(wav, "w") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
subprocess.run([FF, "-y", "-loglevel", "error", "-i", wav, "-c:a", "aac", "-b:a", "192k", os.path.join(ROOT, "out", "mix.m4a")], check=True)
print("mix", round(dur, 2), "s ->", os.path.join("out", "mix.m4a"))
