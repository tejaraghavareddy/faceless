import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Caption, FadeIn, Panel, Title } from "../components/Layout";

const Box: React.FC<{ x:number;y:number;w:number;h:number;text:string;color:string;at:number;active?:boolean }> = ({x,y,w,h,text,color,at,active}) => {
  const f=useCurrentFrame();
  const o=interpolate(f,[at,at+12],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <div style={{position:"absolute",left:x,top:y,width:w,height:h,opacity:o,background:active?"#2b6cb0":color,border:"2px solid #6ea8fe",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",fontSize:24,fontWeight:700,padding:8}}>{text}</div>;
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const step = frame < 300 ? 0 : frame < 600 ? 1 : frame < 900 ? 2 : frame < 1200 ? 3 : 4;
  const arrow = (x1:number,y1:number,x2:number,y2:number,at:number)=>{const o=interpolate(frame,[at,at+15],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7dd3fc" strokeWidth={4} markerEnd="url(#a)" opacity={o}/>};
  return (
    <AbsoluteFill>
      <Title subtitle="Scene 03 · Finding the Destination">DNS: Domain Name System</Title>
      <FadeIn at={5}><div style={{position:"absolute",left:120,top:180,fontSize:34,background:"#13203d",padding:"12px 20px",borderRadius:12,border:"1px solid #385"}}>
        Browser: <span style={{color:"#7dd3fc"}}>www.example.com</span> {frame>150 && <span> → <span style={{color:"#6ee7b7"}}>93.184.216.34</span></span>}
      </div></FadeIn>
      <Panel x={120} y={260} w={1680} h={520} label="DNS resolution (simplified)">
        <Box x={40} y={180} w={220} h={90} text="Browser" color="#24365f" at={20} active={step>=0}/>
        <Box x={330} y={180} w={220} h={90} text="DNS Resolver" color="#24365f" at={120} active={step>=1}/>
        <Box x={620} y={40} w={220} h={90} text="Root DNS" color="#24365f" at={320} active={step>=2}/>
        <Box x={620} y={180} w={220} h={90} text="TLD (.com)" color="#24365f" at={520} active={step>=3}/>
        <Box x={620} y={320} w={240} h={90} text="Authoritative DNS" color="#24365f" at={720} active={step>=4}/>
        <Box x={980} y={180} w={300} h={90} text="IP: 93.184.216.34" color="#1f513f" at={1000} active={step>=4}/>
        <svg style={{position:"absolute",inset:0}}>
          <defs><marker id="a" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#7dd3fc"/></marker></defs>
          {arrow(260,225,330,225,120)}
          {arrow(550,210,620,85,320)}
          {arrow(550,225,620,225,520)}
          {arrow(550,245,620,365,720)}
          {arrow(860,365,980,245,1000)}
        </svg>
        <FadeIn at={1100}><div style={{position:"absolute",right:40,bottom:30,fontSize:26,color:"#cfe"}}>Resolver caches answers to speed up future lookups.</div></FadeIn>
      </Panel>
      {frame < 700 && <Caption text="Computers need IP addresses. DNS translates a domain name into the destination IP." at={10} />}
      {frame >= 700 && <Caption text="The resolver may use cache or query Root, TLD, and Authoritative DNS servers, then returns the IP." at={700} />}
    </AbsoluteFill>
  );
};
