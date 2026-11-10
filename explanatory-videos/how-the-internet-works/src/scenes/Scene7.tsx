import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Caption, FadeIn, Panel, Title } from "../components/Layout";

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const build = interpolate(frame,[350,1100],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return (
    <AbsoluteFill>
      <Title subtitle="Scene 07 · Rendering">How the Website Appears</Title>
      <Panel x={100} y={180} w={500} h={560} label="Server response">
        <FadeIn at={20}><div style={{fontSize:26,lineHeight:2}}>
          <div style={{color:"#f97316"}}>&lt;html&gt; <span style={{color:"#cfe",fontSize:22}}>Structure</span></div>
          <div style={{color:"#60a5fa"}}>.css &#123; &#125; <span style={{color:"#cfe",fontSize:22}}>Appearance</span></div>
          <div style={{color:"#facc15"}}>script.js <span style={{color:"#cfe",fontSize:22}}>Behaviour</span></div>
          <div style={{color:"#a78bfa"}}>images, fonts…</div>
        </div></FadeIn>
      </Panel>
      <div style={{position:"absolute",left:640,top:430,fontSize:60,color:"#7dd3fc"}}>→</div>
      <Panel x={720} y={180} w={520} h={560} label="Browser processing">
        <FadeIn at={200}><div style={{fontSize:24,lineHeight:1.9}}>
          <div>1. Parse HTML → DOM</div>
          <div>2. Parse CSS → styles</div>
          <div>3. Run JavaScript</div>
          <div>4. Layout & paint</div>
          <div>5. Fetch extra resources</div>
        </div></FadeIn>
        <div style={{marginTop:30,height:18,background:"#13203d",borderRadius:9,overflow:"hidden"}}><div style={{width:`${build*100}%`,height:"100%",background:"#4f8cff"}}/></div>
      </Panel>
      <div style={{position:"absolute",left:1280,top:430,fontSize:60,color:"#7dd3fc"}}>→</div>
      <Panel x={1360} y={180} w={460} h={560} label="Rendered webpage" color="#eef4ff">
        <div style={{opacity:build,color:"#14213d"}}>
          <div style={{height:50,background:"#2563eb",borderRadius:8,color:"white",display:"flex",alignItems:"center",padding:"0 12px",fontWeight:700}}>Example Site</div>
          <div style={{marginTop:16,height:26,width:"80%",background:"#cbd5e1",borderRadius:6}}/>
          <div style={{marginTop:10,height:20,width:"95%",background:"#e2e8f0",borderRadius:6}}/>
          <div style={{marginTop:10,height:20,width:"90%",background:"#e2e8f0",borderRadius:6}}/>
          <div style={{marginTop:20,display:"flex",gap:10}}>
            <div style={{width:120,height:40,background:"#16a34a",borderRadius:8,color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>Button</div>
            <div style={{width:120,height:40,background:"#e5e7eb",borderRadius:8}}/>
          </div>
          <div style={{marginTop:20,height:120,background:"#dbeafe",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>Interactive content</div>
        </div>
      </Panel>
      {frame < 700 && <Caption text="HTML gives structure, CSS controls appearance, and JavaScript adds interactive behaviour." at={10} />}
      {frame >= 700 && <Caption text="The browser builds, lays out and paints the page — often requesting more resources — until it’s visible and interactive." at={700} />}
    </AbsoluteFill>
  );
};
