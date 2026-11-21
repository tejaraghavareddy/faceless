#!/bin/bash
cd /workspace/chats/bfbf10ab70cd8ec9bf1705f7/cia-triad-video
TOTAL=14370
SIZE=1500
: > out/chunks/log.txt
for ((start=0; start<TOTAL; start+=SIZE)); do
  end=$((start+SIZE-1)); if [ $end -ge $TOTAL ]; then end=$((TOTAL-1)); fi
  ./render.sh npx remotion render src/index.ts CiaTriad "out/chunks/chunk_${start}.mp4" \
    --frames=${start}-${end} --muted --codec=h264 --crf=18 --pixel-format=yuv420p --concurrency=2 \
    >> out/chunks/log.txt 2>&1
  if [ -f "out/chunks/chunk_${start}.mp4" ]; then
    echo "OK ${start}-${end}" >> out/chunks/status.txt
  else
    echo "FAIL ${start}-${end}" >> out/chunks/status.txt
  fi
done
echo "ALL_DONE" >> out/chunks/status.txt
