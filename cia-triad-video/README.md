# The CIA Triad — The Foundation of Cybersecurity

A 7:59 animated technical documentary on the three principles of information security:
Confidentiality, Integrity and Availability. 1920 × 1080, 30 fps, narrated.

## Watch

```
out/cia-triad.mp4
```

## Build

```bash
npm install
python3 -m venv ../.venv && ../.venv/bin/pip install edge-tts imageio-ffmpeg numpy
../.venv/bin/python scripts/build_audio.py   # narration, ambient score, timeline
../.venv/bin/python scripts/build_mix.py     # final audio mix
./render.sh npx remotion render src/index.ts CiaTriad out/cia-triad.mp4 --muted --concurrency=2
ffmpeg -i out/cia-triad.mp4 -i out/mix.m4a -c:v copy -c:a copy -shortest out/cia-triad-final.mp4
```

`render.sh` sets the local fontconfig / shared-library paths needed by the
headless Chromium build in this container.

## Structure

| File | Purpose |
| --- | --- |
| `src/CiaTriad.tsx` | composition: scene sequencing, crossfades, narration audio |
| `src/timeline.json` | generated scene/beat timing derived from the recorded narration |
| `src/design.ts` | palette, typography, motion helpers |
| `src/components/Chrome.tsx` | documentary frame, headers, definition bands |
| `src/components/Diagram.tsx` | devices, servers, databases, network flows |
| `src/components/Triad.tsx` | pillar and triangle diagrams |
| `src/scenes/Scene1–8.tsx` | the eight chapters |
| `scripts/narration.json` | the narration script |
| `scripts/build_audio.py` | text-to-speech, ambient score, timeline generation |

Scene boundaries are driven by the narration audio, so the visuals and the
voice track stay in sync if the script is re-recorded.
