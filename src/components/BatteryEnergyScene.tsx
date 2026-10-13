'use client';

import { useId, useState } from 'react';

type Props={period:number;charge:number;label:string;flow:string};

// A shared coordinate system keeps the building, roof array and flow ports aligned.
export default function BatteryEnergyScene({period,charge,label,flow}:Props){
  const id=useId().replace(/:/g,'');const [replay,setReplay]=useState(0);
  const dark=period>=2;
  const homeToBattery='M330 276H386V298H438';
  const batteryToHome='M438 298H386V276H330';
  const gridToBattery='M488 110V204';
  const gridToHome='M466 90H410V276H330';
  const paths=period===0?[batteryToHome,gridToHome]:period===1?[homeToBattery]:period===2?[batteryToHome]:[gridToBattery];
  return <div className="bs-energy-scene">
    <svg className="bs-scene-svg" viewBox="0 0 600 400" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>{`${label}: ${flow}`}</title><desc id={`${id}-desc`}>{`Illustrative solar house and battery at ${charge}% charge. Arrows show the selected direction of energy flow; this is not live data.`}</desc>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={dark?'#d0d8d4':'#fffef3'}/><stop offset="1" stopColor={dark?'#8ba2a1':'#dce5d7'}/></linearGradient>
        <linearGradient id={`${id}-battery`}><stop stopColor="#ffffff"/><stop offset="1" stopColor="#d9e3de"/></linearGradient>
        <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={dark?'#25435d':'#416276'}/><stop offset="1" stopColor="#152d41"/></linearGradient>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 1L8 5 0 9" fill="none" stroke={dark?'#c9e89b':'#477844'} strokeWidth="2"/></marker>
      </defs>
      <ellipse cx="298" cy="325" rx="245" ry="29" fill={dark?'#102833':'#cad8c6'} opacity=".55"/>
      <circle cx="278" cy="205" r="173" fill="none" stroke={dark?'#9eb1ad':'#708b78'} opacity=".13"/>
      {dark?<path className="bs-scene-sky" d="M130 48A25 25 0 1 0 160 78A27 27 0 0 1 130 48" fill="#f6e6b9"/>:<g className="bs-scene-sky"><circle cx="148" cy="66" r="22" fill="#eccc7c"/><circle cx="148" cy="66" r="32" fill="none" stroke="#d3ac59" opacity=".35"/></g>}
      <g className="bs-scene-house">
        <path d="M120 202L200 130 280 202V320H120Z" fill={`url(#${id}-wall)`}/>
        <path d="M280 202L380 152V270L280 320Z" fill={dark?'#7c9695':'#b9ccbd'}/>
        <path d="M200 130L300 80 390 156 280 210Z" fill={dark?'#273e49':'#47616a'}/>
        <path d="M108 207L200 123 288 201 280 210 200 139 120 212Z" fill={dark?'#536c74':'#738b88'}/>
        <path d="M280 210L390 156V162L280 218Z" fill="#233c43"/>
        <path d="M295 90V61L313 52 324 60V100L313 106Z" fill={dark?'#597376':'#b9c6bd'}/>
        <path d="M295 61L307 67 324 60 313 52Z" fill="#40575b"/>
        <g className="bs-scene-panels" stroke="#90afbc" strokeWidth="1.1">
          <path d="M220 136L294 99 360 155 283 193Z" fill={`url(#${id}-panel)`}/>
          <path d="M244.7 123.7L308.7 180.3M269.3 111.3L334.3 167.7M241 155L316 117.7M262 174L338 136.3" fill="none"/>
        </g>
        <g fill={dark?'#f1ca85':'#abc5c7'} stroke={dark?'#3a535a':'#657e7f'} strokeWidth="5">
          <rect x="140" y="230" width="35" height="43"/><rect x="223" y="230" width="35" height="43"/>
          <path d="M305 219L330 207V241L305 253Z"/>
        </g>
        <path d="M187 320V258H210V320" fill="#46636c"/><circle cx="204" cy="290" r="2" fill="#dfc992"/>
        <path d="M120 320H280L380 270" fill="none" stroke="#869d91" strokeWidth="6"/>
        <path d="M342 234L359 225V259L342 268Z" fill="#edf2ec" stroke="#8da29a"/><path d="M347 244L354 240" stroke="#3e5b57" strokeWidth="3"/>
      </g>
      <g className="bs-scene-storage">
        <path d="M438 209L518 201 528 211V316L518 324 438 324Z" fill="#94aaa2"/>
        <rect x="438" y="209" width="80" height="115" rx="4" fill={`url(#${id}-battery)`}/>
        <path d="M438 246H518M438 286H518" stroke="#aebfb6"/>
        <rect x="453" y="218" width="50" height="19" rx="9" fill="#233e37"/>
        <circle cx="462" cy="227" r="2" fill="#cceca5"/><text x="482" y="231" textAnchor="middle" fill="#e3f3d6" fontSize="10">{charge}%</text>
        <rect x="450" y="260" width="56" height="8" rx="2" fill="#bdcbc0"/><rect className="bs-scene-charge" x="450" y="260" width={56*charge/100} height="8" rx="2" fill="#59814c"/>
        <path d="M442 324V330M513 324V330" stroke="#748c7f" strokeWidth="7"/>
      </g>
      <g className="bs-scene-grid" opacity={period===0||period===3?1:.5}>
        <rect x="464" y="69" width="48" height="41" rx="7" fill={dark?'#2b4754':'#f8faef'} stroke={dark?'#b4c5bc':'#8ba394'}/>
        <path d="M491 77L482 90H491L484 102" fill="none" stroke={dark?'#d4e9b0':'#547747'} strokeWidth="2"/>
        <text x="488" y="56" textAnchor="middle" className="bs-scene-label">GRID</text>
      </g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={homeToBattery} stroke={dark?'#5b757a':'#abbfaf'} strokeWidth="3"/>
        {(period===0||period===3)&&<path d={period===0?gridToHome:gridToBattery} stroke={dark?'#5b757a':'#abbfaf'} strokeWidth="3"/>}
        <g key={`${period}-${replay}`} className="bs-scene-active-paths">{paths.map((d,i)=><path key={i} data-flow={period===3?'grid-to-battery':period===1?'solar-to-storage':i===1?'grid-to-home':'battery-to-home'} d={d} className="bs-scene-flow" stroke={dark?'#c9e89b':'#477844'} strokeWidth="3" strokeDasharray="8 8" markerEnd={`url(#${id}-arrow)`}/>)}</g>
      </g>
      <circle cx="330" cy="276" r="4" fill={dark?'#c9e89b':'#477844'}/><circle cx="438" cy="298" r="4" fill={dark?'#c9e89b':'#477844'}/>
      <text x="227" y="358" textAnchor="middle" className="bs-scene-label">SOLAR HOME</text><text x="479" y="358" textAnchor="middle" className="bs-scene-label">BATTERY STORAGE</text>
    </svg>
    <div className="bs-scene-foot"><span>ILLUSTRATIVE ENERGY FLOW</span><button type="button" onClick={()=>setReplay(n=>n+1)}>Replay flow <span aria-hidden="true">↻</span></button></div>
  </div>;
}
