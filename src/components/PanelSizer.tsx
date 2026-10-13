'use client';
import { useEffect, useState } from 'react';
import { readSelection, selectionQuery, selectionSummary } from '@/lib/solar-selection';
import { enquiryEmailHref } from '@/config/contact';
export default function PanelSizer() {
  const [panels, setPanels] = useState(12);
  const [watts, setWatts] = useState(440);
  const [extras, setExtras] = useState({ battery: false, eddi: false, ev: false });
  useEffect(() => {
    const selected = readSelection(new URLSearchParams(window.location.search));
    setPanels(selected.panels); setWatts(selected.watts); setExtras({ battery: selected.battery, eddi: selected.eddi, ev: selected.ev });
  }, []);
  return <section className="panel-sizer" aria-labelledby="sizer-title">
    <div><p className="eyebrow">SYSTEM SIZE EXPLORER</p><h2 id="sizer-title">Start with your panels.</h2><p>Explore how panel numbers affect system size, then talk to Fennor about a layout for your roof. The illustration does not confirm what fits.</p>{(extras.battery || extras.eddi || extras.ev) && <p className="carried-options">The options you selected: {extras.battery ? 'battery storage' : ''}{extras.battery && extras.eddi ? ' and ' : ''}{extras.eddi ? 'EDDI hot-water diversion' : ''}{extras.ev ? `${extras.battery || extras.eddi ? ' and ' : ''}EV charger` : ''}. We can use these preferences to start your enquiry; they are not included in a savings calculation here.</p>}<div className="panel-array" aria-hidden="true">{Array.from({ length: 20 }, (_, index) => <span key={index} className={index < panels ? 'panel-present' : ''} />)}</div><span className="array-caption">SCHEMATIC PANEL COUNT / NOT A ROOF DESIGN</span></div>
    <div className="sizer-controls"><label htmlFor="panel-count">Panel count <strong>{panels}</strong></label><input id="panel-count" type="range" min="8" max="20" step="1" value={panels} onChange={event => setPanels(Number(event.target.value))} /><div className="range-labels" aria-hidden="true"><span>8 panels</span><span>20 panels</span></div><label htmlFor="panel-watts">Assumed panel rating</label><select id="panel-watts" value={watts} onChange={event => setWatts(Number(event.target.value))}>{[400,420,440,460,480].map(value => <option value={value} key={value}>{value} W per panel</option>)}</select><output aria-live="polite">{(panels * watts / 1000).toFixed(2)} <span>kWp nominal capacity</span></output><p>{panels} panels × {watts} W ÷ 1,000. Change the panel rating to explore the size. We will explain the equipment proposed for your home separately; this example is not a product specification.</p><a className="text-link" href={`/solar/domestic?${selectionQuery({ panels, watts, ...extras })}#assessment`}>Send an online enquiry ↗</a><a className="text-link" href={enquiryEmailHref({ subject: 'Solar system enquiry', body: `${selectionSummary({ panels, watts, ...extras })} Please help assess a suitable system for my home.` })}>Email these system choices ↗</a></div>
  </section>;
}
