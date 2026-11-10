import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Caption, FadeIn, Panel, Title } from "../components/Layout";

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Title subtitle="Scene 06 · Communication & Security">TCP, HTTPS and Web Servers</Title>
      <Panel x={80} y={170} w={560} h={600} label="1) TCP handshake">
        <div style={{fontSize:24,lineHeight:2,marginTop:20}}>
          <FadeIn at={30}><div>Client → Server: <b style={{color:"#7dd3fc"}}>SYN</b></div></FadeIn>
          <FadeIn at={180}><div>Server → Client: <b style={{color:"#ffd166"}}>SYN-ACK</b></div></FadeIn>
          <FadeIn at={330}><div>Client → Server: <b style={{color:"#6ee7b7"}}>ACK</b></div></FadeIn>
          <FadeIn at={480}><div style={{marginTop:20,padding:12,background:"#1f513f",borderRadius:10}}>Connection established (reliable, ordered delivery)</div></FadeIn>
        </div>
      </Panel>
      <Panel x={680} y={170} w={560} h={600} label="2) HTTPS / TLS">
        <FadeIn at={600}><div style={{textAlign:"center",marginTop:30}}>
          <div style={{fontSize:80}}>🔒</div>
          <div style={{fontSize:28,fontWeight:700,marginTop:10}}>HTTPS = HTTP over TLS</div>
        </div></FadeIn>
        <FadeIn at={800}><div style={{fontSize:24,lineHeight:1.8,marginTop:30,padding:"0 10px"}}>
          <div>• Authenticates the server</div>
          <div>• Establishes shared keys</div>
          <div>• Encrypts & protects integrity in transit</div>
        </div></FadeIn>
        <FadeIn at={1100}><div style={{marginTop:30,fontSize:22,color:"#a9c1ff",padding:"0 10px"}}>Note: browsers can also use HTTP/3 over QUIC (UDP).</div></FadeIn>
      </Panel>
      <Panel x={1280} y={170} w={560} h={600} label="3) Web server response">
        <FadeIn at={1200}><div style={{fontSize:24,lineHeight:1.9,marginTop:20}}>
          <div>Browser sends <b>HTTP request</b> →</div>
          <div style={{margin:"16px 0",textAlign:"center",fontSize:50}}>🖥️</div>
          <div>← Server returns <b>HTTP response</b></div>
          <div style={{marginTop:20,display:"flex",gap:10,flexWrap:"wrap"}}>
            {["HTML","CSS","JS","Images"].map(r=> <span key={r} style={{background:"#355c9a",padding:"8px 12px",borderRadius:8}}>{r}</span>)}
          </div>
        </div></FadeIn>
      </Panel>
      {frame < 900 && <Caption text="TCP sets up a reliable connection with a three-way handshake: SYN, SYN-ACK, ACK." at={10} />}
      {frame >= 900 && frame < 1500 && <Caption text="HTTPS uses TLS to authenticate the server and encrypt data. The browser then sends an HTTP request." at={900} />}
      {frame >= 1500 && <Caption text="The web server processes the request and responds with HTML, CSS, JavaScript, images and more." at={1500} />}
    </AbsoluteFill>
  );
};
