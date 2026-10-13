'use client';
import {useId,useState} from 'react';
import EnquiryForm from '@/components/EnquiryForm';

const priorities=[
  {name:'Hot water first',values:[2,1,0],heading:'Heat for later. Electricity, too.',text:'In this example the immersion takes 2 kW, with 1 kW available for the battery. When the water reaches its target, priorities need to move on. Actual allocation depends on the connected controls.'},
  {name:'EV first',values:[0,0,3],heading:'Daylight for your next journey.',text:'Here the car receives the full 3 kW surplus. The vehicle must be connected and able to accept that power. Cloud cover, minimum charging requirements and selected mode can change what happens next.'},
  {name:'Battery first',values:[0,3,0],heading:'Keep some electricity for the evening.',text:'Here the battery takes the available 3 kW. That assumes enough spare capacity and a compatible charging rate. Once full, surplus can be directed elsewhere or exported.'},
];
export function SurplusExplorer(){
  const [selected,setSelected]=useState(0);const choice=priorities[selected];
  return <div className="ax-explorer"><div className="ax-explorer-controls"><p className="sp-kicker">ONE SURPLUS. DIFFERENT PRIORITIES.</p><h3>Where would you<br/>use it first?</h3><div className="sp-choice" aria-label="Illustrative surplus priority">{priorities.map((p,i)=><button key={p.name} type="button" aria-pressed={selected===i} onClick={()=>setSelected(i)}>{p.name}<span aria-hidden="true">↗</span></button>)}</div><p className="sp-note">Illustrative allocation, not a live controller or a promise of product interoperability. Fennor assesses compatibility and explains how your chosen priority would work. The installation team configures the agreed controls and demonstrates them at handover.</p></div><div className="ax-allocation" aria-live="polite" aria-atomic="true"><div className="ax-surplus-head"><div><span>AFTER THE HOME’S IMMEDIATE USE</span><strong>3.0 <small>kW</small></strong></div><span className="ax-surplus-badge">Available solar surplus</span></div><div className="ax-allocation-bars">{['Hot water','Battery','Electric car'].map((name,i)=><div className="ax-allocation-row" key={name}><div><span>{name}</span><b>{choice.values[i].toFixed(1)} kW</b></div><div className="ax-track"><span style={{width:`${choice.values[i]/3*100}%`}}/></div></div>)}</div><h4>{choice.heading}</h4><p>{choice.text}</p><p className="sp-note">The allocation totals 3 kW in every example. No energy is counted twice. Export remains another option; these examples assume the full surplus can be accepted.</p></div></div>;
}

export function SolarBrief({kind}:{kind:'accessories'|'ground-mounted'}){
  const [interest,setInterest]=useState('');
  const interestId=useId();
  const options=kind==='accessories'?['EDDI / hot water','EV charging','Backup / changeover','Monitoring & controls','Help choosing']:['A home','A farm','A business','Not sure yet'];
  const selected=options.includes(interest)?interest:options[0];
  return <EnquiryForm topic={kind==='accessories'?'Solar accessories enquiry':'Ground-mounted solar enquiry'} context={`Interest: ${selected}`} className="sp-brief" buttonClassName="sp-button">
    <label>Your town / county<input name="area" required maxLength={120} autoComplete="address-level2"/></label>
    <div className="enquiry-option-field"><label htmlFor={interestId}>{kind==='accessories'?'What interests you?':'What would the system serve?'}</label><select id={interestId} name="interest" value={selected} onChange={event=>setInterest(event.target.value)}>{options.map(v=><option key={v}>{v}</option>)}</select></div>
    <label>{kind==='accessories'?'Your current system and priorities':'Your site and plans'}<textarea name="details" rows={4} maxLength={1800} placeholder={kind==='accessories'?'Inverter model, battery, cylinder or EV plans…':'Available space, approximate distance to the building, shade or access…'}/></label>
  </EnquiryForm>;
}
