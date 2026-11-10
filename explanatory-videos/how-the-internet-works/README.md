# How the Internet Works — Explanatory Video (Remotion)

Animated technical documentary based on the provided 8-scene script (~6:45, 1920×1080, 30fps).

## Scenes
1. **The Big Question** (0:00–0:35) — typing a URL and the mystery of what happens next
2. **What is the Internet?** (0:35–1:20) — network of networks, home → ISP → world
3. **DNS: Finding the Destination** (1:20–2:15) — domain to IP resolution
4. **IP Addresses and Data Packets** (2:15–3:15) — addressing and packetization
5. **Routers and the Journey of Data** (3:15–4:15) — hop-by-hop forwarding
6. **TCP, HTTPS and Web Servers** (4:15–5:35) — handshake, TLS, HTTP request/response
7. **How the Website Appears** (5:35–6:25) — HTML/CSS/JS rendering in the browser
8. **Final Recap** (6:25–6:45) — complete journey infographic

## Preview (Remotion Studio)
```bash
cd how-internet-works-video
npm install
npm run start
```
Then open the studio (port 3001) and play the `HowTheInternetWorks` composition.

## Render MP4
```bash
cd how-internet-works-video
npm run build:video
# outputs: out/how-the-internet-works.mp4
```
> Rendering requires a Chromium/Chrome environment available to Remotion. If rendering fails in this environment, you can render locally with `npm install && npm run build:video` (Chrome/Chromium must be installed).

## Notes
- Visuals are programmatic animations with on-screen narration captions timed to each scene.
- No voiceover audio track is included; you can record narration over the rendered video or add an audio file in Remotion.
