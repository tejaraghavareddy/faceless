import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Caption, FadeIn } from "../components/Layout";

export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const steps = ["User","Browser","DNS","IP","Routers","Server","HTTP Response","Render"];
  return (
    <AbsoluteFill style={{background:"linear-gradient(180deg,#0b1020,#101a33)"}}>
      <FadeIn at={5}><div style={{position:"absolute",top:120,left:0,right:0,textAlign:"center",fontSize:54,fontWeight:800}}>The Complete Journey</div></FadeIn>
      <div style={{position:"absolute",top:300,left:80,right:80,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        {steps.map((s,i)=>{
          const at=20+i*25; const o=interpolate(frame,[at,at+12],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
          return <React.Fragment key={s}>
            <div style={{opacity:o,background:"#1b2747",border:"2px solid #4f8cff",borderRadius:14,padding:"16px 14px",minWidth:150,textAlign:"center",fontSize:24,fontWeight:700}}>{s}</div>
            {i<steps.length-1 && <div style={{opacity:o,color:"#7dd3fc",fontSize:34}}>→</div>}
          </React.Fragment>;
        })}
      </div>
      <FadeIn at={260}><div style={{position:"absolute",bottom:180,left:0,right:0,textAlign:"center",fontSize:64,fontWeight:900,letterSpacing:1}}>THE INTERNET IS A NETWORK OF NETWORKS</div></FadeIn>
      {frame < 350 && <Caption text="DNS finds it, IP addresses route it, routers forward it, protocols deliver it, HTTPS protects it." at={10} />}
      {frame >= 350 && <Caption text="Behind a simple click is an extraordinary system of interconnected technologies. That's how the internet works." at={350} />}
    </AbsoluteFill>
  );
};
