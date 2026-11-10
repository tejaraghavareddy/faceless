import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Caption, FadeIn, Panel, Title } from "../components/Layout";

const Hop: React.FC<{x:number;y:number;label:string;at:number}> = ({x,y,label,at}) => {
  const f=useCurrentFrame(); const o=interpolate(f,[at,at+12],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <div style={{position:"absolute",left:x,top:y,opacity:o,textAlign:"center"}}>
    <div style={{width:110,height:70,background:"#24365f",border:"2px solid #6ea8fe",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>Router</div>
    <div style={{fontSize:20,marginTop:6}}>{label}</div>
  </div>;
};

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame,[200,1500],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const pathX = 180 + t*1500;
  const pathY = 480 + Math.sin(t*Math.PI*2)*60;
  return (
    <AbsoluteFill>
      <Title subtitle="Scene 05 · The Journey">Routers Forward Packets Across Networks</Title>
      <Panel x={80} y={200} w={1760} h={560} label="Packet journey (example path)">
        <Hop x={40} y={220} label="Laptop" at={20}/>
        <Hop x={320} y={220} label="Home Router" at={80}/>
        <Hop x={620} y={120} label="ISP Network" at={160}/>
        <Hop x={920} y={260} label="Router A" at={240}/>
        <Hop x={1220} y={140} label="Router B" at={320}/>
        <Hop x={1480} y={240} label="Destination Net" at={400}/>
        <div style={{position:"absolute",left:1640,top:220,textAlign:"center",opacity:interpolate(frame,[420,440],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}}>
          <div style={{width:110,height:70,background:"#1f513f",border:"2px solid #6ee7b7",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>Server</div>
          <div style={{fontSize:20,marginTop:6}}>Web Server</div>
        </div>
        <svg style={{position:"absolute",inset:0}}>
          <path d="M150,255 C300,255 350,255 375,255 C500,255 560,155 675,155 C800,155 860,295 975,295 C1100,295 1160,175 1275,175 C1390,175 1430,275 1535,275 C1600,275 1640,255 1695,255" stroke="#355" strokeWidth={6} fill="none"/>
        </svg>
        <div style={{position:"absolute",left:pathX,top:pathY,width:26,height:26,borderRadius:13,background:"#ffd166",boxShadow:"0 0 20px #ffd166"}} />
        <FadeIn at={900}><div style={{position:"absolute",left:40,bottom:30,fontSize:24,background:"#13203d",padding:"10px 14px",borderRadius:10}}>
          Each router checks destination IP + routing table, then forwards to the next hop. Paths can vary.
        </div></FadeIn>
      </Panel>
      {frame < 900 && <Caption text="Routers forward IP packets between networks by consulting routing tables." at={10} />}
      {frame >= 900 && <Caption text="Packets may take different paths depending on topology, policies and conditions, hop by hop to the destination." at={900} />}
    </AbsoluteFill>
  );
};
