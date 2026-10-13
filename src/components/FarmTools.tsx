'use client';

import { useState } from 'react';
import { farmEnergyValue, farmProfiles } from '@/lib/farm-solar';
import EnquiryForm from '@/components/EnquiryForm';

const money = (n: number) => new Intl.NumberFormat('en-IE', {style:'currency', currency:'EUR', maximumFractionDigits:0}).format(n);
const number = (n: number) => new Intl.NumberFormat('en-IE', {maximumFractionDigits:0}).format(n);

export function FarmPatternExplorer() {
  const [selected, setSelected] = useState(0);
  const farm = farmProfiles[selected];
  return <div className="fs-pattern">
    <div className="fs-farm-types" role="group" aria-label="Choose your farming enterprise">{farmProfiles.map((p,i) => <button key={p.id} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}><span>0{i+1}</span>{p.name}<b aria-hidden="true">↗</b></button>)}</div>
    <div className="fs-pattern-body">
      <div className="fs-pattern-copy" aria-live="polite"><p className="fs-eyebrow">{farm.name} / THE WORKING PATTERN</p><h3>{farm.title}</h3><p>{farm.insight}</p><div className="fs-load-tags">{farm.loads.map(load => <span key={load}>{load}</span>)}</div><p className="fs-season"><strong>Across the year.</strong> {farm.season}</p></div>
      <div className="fs-clock"><p className="fs-eyebrow">TIMING MATTERS AS MUCH AS ROOF SPACE</p><div className="fs-demand-bars" role="img" aria-label={`Illustrative ${farm.name.toLowerCase()} demand through a day; relative values, not measured data or a forecast.`}>{farm.levels.map((level,i) => <div key={i} className={i>=2&&i<=5?'fs-daylight':''}><span style={{height:`${level}%`}} /></div>)}</div><div className="fs-clock-labels"><span>Early</span><span>Daytime</span><span>Late</span></div><p className="fs-small">Conceptual demand only. Shading marks daytime—not a generation forecast. Real patterns vary by season, weather and equipment.</p><p className="fs-bring">{farm.question}</p><a className="fs-link" href="#farm-enquiry">Let’s look at your farm ↗</a></div>
    </div>
    <noscript><p className="fs-small">Dairy example shown. Call us to discuss dairy, pigs, poultry, tillage, beef or sheep.</p></noscript>
  </div>;
}

export function FarmValueExplorer() {
  const [generation,setGeneration] = useState('20000');
  const [selfUse,setSelfUse] = useState(70);
  const [buy,setBuy] = useState('28');
  const [sell,setSell] = useState('15');
  const validGeneration = generation.trim()!=='' && Number(generation)>=1 && Number(generation)<=1000000 && Number.isFinite(Number(generation));
  const validRate = (s:string) => s.trim()!=='' && Number.isFinite(Number(s)) && Number(s)>=0 && Number(s)<=200;
  const value = validGeneration && validRate(buy) && validRate(sell) ? farmEnergyValue(Number(generation),selfUse,Number(buy),Number(sell)) : null;
  return <div className="fs-value-tool">
    <div className="fs-value-inputs"><p className="fs-eyebrow">EDIT THE ASSUMPTIONS</p><p className="fs-small">Starting figures are examples, not Irish average tariffs or a prediction for your farm. Use rates on a consistent VAT basis.</p>
      <label htmlFor="fs-generation">Assumed annual solar generation <span>kWh / year</span></label><input id="fs-generation" type="number" min="1" max="1000000" step="1" inputMode="numeric" value={generation} onChange={e=>setGeneration(e.target.value)} aria-invalid={!validGeneration} aria-describedby="fs-generation-note" /><p className="fs-small" id="fs-generation-note">{validGeneration ? 'Fennor prepares a roof-specific generation estimate following assessment; use it here when available.' : 'Enter generation between 1 and 1,000,000 kWh.'}</p>
      <label htmlFor="fs-use">Solar used directly on the farm <strong>{selfUse}%</strong></label><input id="fs-use" type="range" min="0" max="100" step="5" value={selfUse} onChange={e=>setSelfUse(Number(e.target.value))} /><div className="fs-range-labels"><span>All exported</span><span>All used on site</span></div>
      <div className="fs-rate-inputs"><div><label htmlFor="fs-buy">Import unit rate <span>cent / kWh</span></label><input id="fs-buy" type="number" min="0" max="200" step="0.1" inputMode="decimal" value={buy} onChange={e=>setBuy(e.target.value)} aria-invalid={!validRate(buy)} /></div><div><label htmlFor="fs-sell">Export unit rate <span>cent / kWh</span></label><input id="fs-sell" type="number" min="0" max="200" step="0.1" inputMode="decimal" value={sell} onChange={e=>setSell(e.target.value)} aria-invalid={!validRate(sell)} /></div></div><p className="fs-small">Enter rates from 0–200 cent/kWh. Use zero export value if no payment is assumed.</p>
    </div>
    <div className="fs-value-result" aria-live="polite"><p className="fs-eyebrow">ILLUSTRATIVE ANNUAL GROSS ENERGY VALUE</p><output aria-label="Annual gross energy value">{value ? money(value.total) : '—'}</output><p>{value ? 'Avoided electricity purchases + potential export income.' : 'Enter valid generation and unit rates to see the illustration.'}</p>
      {value && <><div className="fs-energy-split" aria-hidden="true"><span style={{width:`${selfUse}%`}} /></div><dl><div><dt>Used on the farm <small>{number(value.used)} kWh</small></dt><dd>{money(value.avoidedImport)}</dd></div><div><dt>Exported <small>{number(value.exported)} kWh</small></dt><dd>{money(value.exportValue)}</dd></div></dl></>}
      <p className="fs-small">Not net savings or payback. Excludes installation, finance, maintenance, replacements, tax and battery losses. Assumes the remaining generation can be exported; curtailment and export limits can reduce the result. Standing charges remain. Self-use must be supported by demand at the time of generation.</p><a className="fs-link" href="#farm-enquiry">Turn assumptions into a farm-specific assessment ↗</a>
    </div>
    <noscript><p className="fs-small">The initial example is shown. Interactive changes require JavaScript. Call 089 403 2737 for help with your own figures.</p></noscript>
  </div>;
}

export function FarmEnquiry() {
  const [type,setType]=useState('Dairy');
  return <EnquiryForm topic="Farm solar enquiry" context={`Farm enterprise: ${type}`} className="fs-enquiry-form" buttonClassName="fs-button" buttonLabel="Send my farm enquiry">
    <label htmlFor="fs-enterprise">Farm enterprise</label><select id="fs-enterprise" value={type} onChange={e=>setType(e.target.value)}>{['Dairy','Pigs or poultry','Tillage or grain','Beef or sheep','Mixed or other'].map(x=><option key={x}>{x}</option>)}</select>
    <label htmlFor="fs-area">Town or county</label><input id="fs-area" name="area" autoComplete="address-level2" required maxLength={120} />
    <label htmlFor="fs-notes">Tell us a little about the farm <span>(optional)</span></label><textarea id="fs-notes" name="details" rows={3} maxLength={1800} placeholder="Roof type, daytime loads, annual use or grant status…" />
    <p className="fs-small">A short description is enough to start. Please leave out herd numbers and confidential farm records.</p>
  </EnquiryForm>;
}
