'use client';

import { useState } from 'react';
import { batteryShiftValue } from '@/lib/battery-storage';
import BatteryEnergyScene from '@/components/BatteryEnergyScene';
import EnquiryForm from '@/components/EnquiryForm';

const money=(value:number)=>new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR',minimumFractionDigits:2}).format(value);
const periods=[
  {label:'Morning',time:'07:00',title:'The day starts before the solar peak.',body:'Breakfast and early activity can arrive before strong solar output. Available battery energy may help; the grid covers any remaining demand.',source:'Battery + grid → home',charge:30,theme:'morning'},
  {label:'Midday',time:'13:00',title:'Give spare daylight a later purpose.',body:'Solar supplies the home first. Where generation exceeds demand, compatible controls can charge the battery; any further surplus may be exported.',source:'Solar → home + battery',charge:85,theme:'day'},
  {label:'Evening',time:'19:00',title:'The roof rests. Your home doesn’t.',body:'Stored electricity can supply some evening use after solar production falls. Battery reserve, output limits and demand determine how much the grid still supplies.',source:'Battery → home',charge:55,theme:'evening'},
  {label:'Low-rate hours',time:'02:00',title:'A different way to fill the battery.',body:'Where your equipment and tariff allow, scheduled grid charging may help. Fennor compares the full tariff and storage losses with you before proposing this strategy.',source:'Grid → battery',charge:65,theme:'night'},
];

export function BatteryDayStory(){
  const [selected,setSelected]=useState(1);const period=periods[selected];
  return <div className={`bs-story bs-time-${period.theme}`}>
    <div className="bs-time-buttons" role="group" aria-label="Explore a day with battery storage">{periods.map((p,i)=><button type="button" key={p.label} aria-pressed={i===selected} onClick={()=>setSelected(i)}><span>{p.time}</span>{p.label}</button>)}</div>
    <div className="bs-story-body"><div className="bs-story-copy" aria-live="polite"><span className="bs-story-time">{period.time}</span><h3>{period.title}</h3><p>{period.body}</p><p className="bs-flow-label">{period.source}</p><small>Illustrative sequence, not live monitoring or a forecast. Times, charge levels and energy availability vary.</small></div>
    <BatteryEnergyScene period={selected} charge={period.charge} label={period.label} flow={period.source}/></div><noscript><p className="bs-small">Midday example shown. The selector needs JavaScript; the rest of the guidance remains available.</p></noscript>
  </div>;
}

export function BatteryCapacity(){
  const [size,setSize]=useState(10);
  return <div className="bs-capacity"><div className="bs-capacity-stage" role="img" aria-label={`Conceptual modular stack illustrating ${size} kWh with ${size/5} battery modules. Not an installation drawing.`}><div className="bs-capacity-stack"><div className="bs-stack-controller"><span>HUAWEI</span><i/></div>{Array.from({length:size/5},(_,i)=><div className="bs-stack-module" key={i}/>)}<div className="bs-stack-feet"/></div><span className="bs-stack-caption">MODULAR STORAGE / CONCEPT VIEW</span></div>
    <div className="bs-capacity-copy"><p className="bs-kicker">UNDERSTAND THE TWO NUMBERS</p><h3>Capacity is not<br/><em>the same as power.</em></h3><div className="bs-capacity-choices" role="group" aria-label="Explore battery capacity">{[5,10,15].map(n=><button key={n} type="button" aria-pressed={size===n} onClick={()=>setSize(n)}>{n}<span>kWh</span></button>)}</div><div className="bs-capacity-readout" aria-live="polite"><p><strong>{size} kWh</strong><span>Published usable energy<br/>LUNA2000-{size}-S0 example</span></p><p><strong>{size===5?'2.5':'5'} kW</strong><span>Published battery maximum output<br/>not a promise of whole-home backup</span></p></div><p className="bs-small">Huawei’s S0 datasheet lists 5, 10 and 15 kWh configurations. Actual delivery depends on operating conditions, reserve settings and the complete system. A 5 kW inverter does not turn the 5 kWh S0 battery’s 2.5 kW battery-output limit into 5 kW.</p></div>
  </div>;
}

export function BatteryValue(){
  const [mode,setMode]=useState('solar');const [input,setInput]=useState('5');const [eff,setEff]=useState('90');const [buy,setBuy]=useState('32');const [sell,setSell]=useState('20');const [low,setLow]=useState('12');
  const fields=[input,eff,buy,mode==='solar'?sell:low];
  const value=fields.every(x=>x.trim()!=='')?batteryShiftValue(Number(input),Number(eff),Number(buy),Number(mode==='solar'?sell:low)):null;
  const valid=(s:string,min:number,max:number)=>s.trim()!==''&&Number.isFinite(Number(s))&&Number(s)>=min&&Number(s)<=max;
  return <div className="bs-value-tool"><div className="bs-value-controls"><div className="bs-mode" role="group" aria-label="Choose charging source"><button type="button" aria-pressed={mode==='solar'} onClick={()=>setMode('solar')}>Store surplus solar</button><button type="button" aria-pressed={mode==='grid'} onClick={()=>setMode('grid')}>Charge at a lower rate</button></div><p className="bs-small">One illustrative charge/discharge event. These are editable assumptions—not typical tariffs or a daily promise. Use a consistent VAT basis.</p><div className="bs-value-fields">
      <div><label htmlFor="bs-input">Energy put into storage <span>kWh / event</span></label><input id="bs-input" type="number" min="0.1" max="50" step="0.1" value={input} onChange={e=>setInput(e.target.value)} aria-invalid={!valid(input,.1,50)}/></div>
      <div><label htmlFor="bs-eff">Round-trip efficiency <span>% assumed</span></label><input id="bs-eff" type="number" min="50" max="100" step="1" value={eff} onChange={e=>setEff(e.target.value)} aria-invalid={!valid(eff,50,100)}/></div>
      <div><label htmlFor="bs-import">Import rate avoided <span>cent / kWh</span></label><input id="bs-import" type="number" min="0" max="200" step="0.1" value={buy} onChange={e=>setBuy(e.target.value)} aria-invalid={!valid(buy,0,200)}/></div>
      <div><label htmlFor="bs-alternative">{mode==='solar'?'Export rate given up':'Low-rate charging cost'} <span>cent / kWh</span></label><input id="bs-alternative" type="number" min="0" max="200" step="0.1" value={mode==='solar'?sell:low} onChange={e=>mode==='solar'?setSell(e.target.value):setLow(e.target.value)} aria-invalid={!valid(mode==='solar'?sell:low,0,200)}/></div>
    </div><p className="bs-small">Input limits: 0.1–50 kWh, 50–100% efficiency and 0–200 cent/kWh. Use a system-specific efficiency estimate, not the example as a Huawei specification.</p></div>
    <div className="bs-value-result" aria-live="polite"><p className="bs-kicker">ADDITIONAL ENERGY VALUE / EVENT</p><output aria-label="Additional battery energy value">{value?money(value.difference):'—'}</output><p>{!value?'Enter valid figures to compare.':value.difference>0?'The tariff difference leaves value after energy losses.':'These assumptions do not leave a positive energy-value difference.'}</p>{value&&<dl><div><dt>Energy returned for use</dt><dd>{value.delivered.toFixed(2)} kWh</dd></div><div><dt>Imports avoided</dt><dd>{money(value.avoided)}</dd></div><div><dt>{mode==='solar'?'Export income given up':'Grid charging cost'}</dt><dd>− {money(value.alternative)}</dd></div></dl>}<p className="bs-small">Not net savings or payback. Excludes installed cost, finance, maintenance, degradation and replacements. Assumes enough usable capacity and charging time, and all returned energy replaces imports at the entered rate. Real demand, reserve settings and power limits can reduce the result. No annual multiplication is assumed.</p></div>
    <noscript><p className="bs-small">Initial illustration shown. Call us to compare your own figures.</p></noscript>
  </div>;
}

export function BatteryEnquiry(){
  const [solar,setSolar]=useState('I already have solar');
  return <EnquiryForm topic="Battery storage enquiry" context={`Starting point: ${solar}`} className="bs-enquiry-form" buttonClassName="bs-button" buttonLabel="Send my battery enquiry">
    <label htmlFor="bs-solar-status">Your starting point</label><select id="bs-solar-status" value={solar} onChange={e=>setSolar(e.target.value)}>{['I already have solar','I am planning solar + storage','I am interested in storage without solar','This is for a farm or business'].map(x=><option key={x}>{x}</option>)}</select>
    <label htmlFor="bs-location">Town or county</label><input id="bs-location" name="area" required maxLength={120} autoComplete="address-level2" />
    <label htmlFor="bs-notes">What would you like storage to do? <span>(optional)</span></label><textarea id="bs-notes" name="details" rows={3} maxLength={1500} placeholder="Evening use, current inverter, backup priorities…" />
  </EnquiryForm>;
}
