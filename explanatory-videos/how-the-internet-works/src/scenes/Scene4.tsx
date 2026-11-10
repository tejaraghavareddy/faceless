import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Caption, FadeIn, Panel, Title } from "../components/Layout";

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const split = interpolate(frame,[120,260],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const travel = interpolate(frame,[300,1500],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const packets = [0,1,2,3,4];
  return (
    <AbsoluteFill>
      <Title subtitle="Scene 04 · Addressing & Packets">IP Addresses and Data Packets</Title>
      <Panel x={120} y={170} w={520} h={250} label="Client">
        <div style={{fontSize:26}}>Laptop</div><div style={{color:"#7dd3fc",fontSize:24,marginTop:8}}>IP: 192.168.1.10</div>
      </Panel>
      <Panel x={1280} y={170} w={520} h={250} label="Server">
        <div style={{fontSize:26}}>Web Server</div><div style={{color:"#6ee7b7",fontSize:24,marginTop:8}}>IP: 93.184.216.34</div>
      </Panel>
      <Panel x={120} y={460} w={1680} h={320} label="Message split into packets">
        <div style={{position:"absolute",left:80,top:90,width:interpolate(split,[0,1],[400,120]),height:80,background:"#4f8cff",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,opacity:1-split*0.2}}>Data message</div>
        {packets.map(i=>{
          const baseY = 60 + i*45;
          const x = 350 + i*40 + travel*(900 - i*30);
          const y = baseY + Math.sin((frame/20)+i)*8;
          return <g key={i}/>;
        })}
        {packets.map(i=>{
          const baseY = 80 + i*42;
          const x = 360 + travel*(900 - i*25);
          const y = baseY;
          const o = interpolate(frame,[180+i*20,220+i*20],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
          return <div key={i} style={{position:"absolute",left:300 + i*90 + travel*700,top:baseY,opacity:o}}>
            <div style={{width:150,height:60,border:"2px solid #7dd3fc",borderRadius:10,overflow:"hidden",fontSize:16}}>
              <div style={{background:"#355c9a",padding:"2px 6px"}}>Header src/dst</div>
              <div style={{background:"#1f513f",padding:"4px 6px"}}>Data {i+1}</div>
            </div>
          </div>;
        })}
        <FadeIn at={900}><div style={{position:"absolute",right:40,top:30,fontSize:24,color:"#cfe"}}>Packets carry source, destination and payload. Receiver reassembles/passes data up.</div></FadeIn>
      </Panel>
      {frame < 800 && <Caption text="An IP address identifies where data should go. Large messages are sent as packets." at={10} />}
      {frame >= 800 && <Caption text="Each packet has header info (source/destination) and data, travelling across networks in manageable units." at={800} />}
    </AbsoluteFill>
  );
};
