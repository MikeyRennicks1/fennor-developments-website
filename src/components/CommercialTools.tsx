'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { enquiryEmailHref } from '@/config/contact';
import { businessProfiles, commercialGrantCeiling, commercialSources, euro } from '@/lib/commercial-solar';
import EnquiryForm from '@/components/EnquiryForm';

const CommercialContext = createContext({ kwp: 50, setKwp: (_value: number) => {}, profile: 0, setProfile: (_value: number) => {} });
export function CommercialProvider({ children }: { children: ReactNode }) {
  const [kwp, setKwp] = useState(50);
  const [profile, setProfile] = useState(0);
  return <CommercialContext.Provider value={{ kwp, setKwp, profile, setProfile }}>{children}</CommercialContext.Provider>;
}

export function BusinessDayExplorer() {
  const { profile, setProfile } = useContext(CommercialContext);
  const current = businessProfiles[profile];
  const points = (values: readonly number[]) => values.map((v, i) => `${36 + i * 53},${264 - v * 2}`).join(' ');
  const solar = points([0,0,0,6,32,70,95,85,50,8,0,0,0]);
  return <section className="cs-day cs-shell" id="working-day" aria-labelledby="cs-day-title">
    <div className="cs-section-label"><span>01 / THE WORKING DAY</span><span>Explore the relationship</span></div>
    <div className="cs-day-heading"><h2 id="cs-day-title">Same daylight.<br /><em>Different businesses.</em></h2><p>Roof space tells one part of the story.<br />When you use electricity tells the other.</p></div>
    <div className="cs-profiles" role="group" aria-label="Business operating pattern">{businessProfiles.map((item, index) => <button type="button" key={item.id} aria-pressed={profile === index} onClick={() => setProfile(index)}><span>0{index + 1}</span>{item.name}<b aria-hidden="true">↗</b></button>)}</div>
    <div className="cs-day-grid"><div className="cs-chart-wrap"><div className="cs-chart-key"><span><i />Illustrative solar output</span><span><i />Illustrative business demand</span></div>
      <svg className="cs-chart" viewBox="0 0 720 320" role="img" aria-label={`${current.hours}: illustrative relative solar and electricity-demand profiles, not measured data or a forecast`}>
        {[64,114,164,214,264].map(y => <path key={y} d={`M36 ${y}H672`} stroke="#cbdacf" strokeWidth="1" />)}
        <polygon points={`36,264 ${solar} 672,264`} fill="#c6e6ba" />
        <polyline points={solar} fill="none" stroke="#287248" strokeWidth="3" />
        <polyline key={current.id} className="cs-demand-line" points={points(current.values)} fill="none" stroke="#8b461c" strokeWidth="3" strokeDasharray="7 5" />
        {['00:00','06:00','12:00','18:00','24:00'].map((time, i) => <text key={time} x={36 + i * 159} y="295" textAnchor="middle" fill="#4f645d" fontSize="12">{time}</text>)}
      </svg><p className="cs-fine">Conceptual shapes on a relative scale. Not seasonal generation, interval-meter readings or a savings calculation.</p>
    </div><div className="cs-profile-copy" aria-live="polite"><span className="eyebrow">{current.hours}</span><h3>{current.insight}</h3><p>{current.detail}</p><a className="cs-link" href="#commercial-enquiry">Discuss your operating pattern ↗</a></div></div>
    <noscript><p className="cs-fine">The daytime example is shown. Call 089 403 2737 to discuss your operating pattern.</p></noscript>
  </section>;
}

export function CommercialGrantExplorer() {
  const { kwp, setKwp } = useContext(CommercialContext);
  const [cost, setCost] = useState('');
  const ceiling = commercialGrantCeiling(kwp);
  const entered = Number(cost);
  const validCost = cost !== '' && Number.isFinite(entered) && entered > 0 && entered <= 100000000;
  const invalidCost = cost !== '' && !validCost;
  const payment = validCost ? Math.min(ceiling, entered * .45) : ceiling;
  return <div className="cs-grant-tool" id="commercial-grant-tool">
    <div className="cs-grant-inputs"><span className="eyebrow">EXPLORE A SYSTEM SIZE</span><label htmlFor="cs-kwp">Solar PV capacity <strong>{kwp} <small>kWp</small></strong></label><input id="cs-kwp" type="range" min="1" max="1000" step="1" value={kwp} onChange={event => setKwp(Number(event.target.value))} /><div className="cs-range-ends"><span>1 kWp</span><span>1,000 kWp</span></div><div className="cs-presets" role="group" aria-label="Example system sizes">{[20,50,100,200,1000].map(value => <button type="button" key={value} aria-pressed={kwp === value} onClick={() => setKwp(value)}>{value.toLocaleString('en-IE')} kWp</button>)}</div>
    <label className="cs-cost-label" htmlFor="cs-cost">Eligible invoiced PV cost (€) <span>Optional · use your own figure</span></label><input id="cs-cost" type="number" min="0.01" max="100000000" step="0.01" inputMode="decimal" value={cost} aria-describedby="cs-cost-note" aria-invalid={invalidCost} placeholder="Enter an eligible cost" onChange={event => setCost(event.target.value)} /><p id="cs-cost-note" className="cs-fine">{invalidCost ? 'Enter a positive amount up to €100,000,000, or leave blank.' : 'Exclude batteries and other ineligible extras. This figure is not stored or sent.'}</p></div>
    <div className="cs-grant-result" aria-live="polite"><span className="eyebrow">{validCost ? 'ILLUSTRATIVE CAPPED SUPPORT' : 'SIZE-BASED GRANT CEILING'}</span><output aria-label="Illustrative grant amount">{euro(payment)}</output><p>{validCost ? `Lower of ${euro(ceiling)} for ${kwp} kWp and 45% of your entered eligible cost.` : `For a ${kwp.toLocaleString('en-IE')} kWp system, before the eligible-invoice limit.`}</p><div className="cs-grant-rule"><strong>Size-based ceiling<br /><span>or 45% of eligible invoiced cost</span></strong><span>Whichever is lower.</span></div><p className="cs-fine">Illustration only—not a quote, grant offer or eligibility check. Rates apply to the application window stated above; SEAI determines the award.</p><a className="cs-link" href={commercialSources.guide}>Check SEAI’s calculation and terms ↗</a></div>
  </div>;
}

export function CommercialEnquiry() {
  const { kwp, profile } = useContext(CommercialContext);
  const [company, setCompany] = useState('');
  const context = `Business: ${company || 'Not supplied'}\nOperating-pattern interest: ${businessProfiles[profile].name}\nExplored capacity: ${kwp} kWp (illustrative, not a design)`;
  return <section className="cs-enquiry cs-shell" id="commercial-enquiry"><div><p className="eyebrow">LET’S UNDERSTAND YOUR SITE</p><h2>A better plan.<br /><em>Starts with your business.</em></h2><p>Based in Slane. Commercial enquiries across Meath, Louth and Dublin, with projects elsewhere in Ireland considered individually.</p><a className="cs-phone" href="tel:+353894032737">089 403 2737 ↗</a><a href={enquiryEmailHref({ primary: 'info@fennor.ie' })}>info@fennor.ie</a><p className="cs-fine">Start with your premises and operating hours. Annual electricity use, interval data and roof photographs help if available; we explain what else is needed for the site assessment and investment proposal. No bills or files are uploaded here.</p></div>
    <EnquiryForm topic="Commercial solar enquiry" context={context} buttonClassName="cs-button cs-button-light" buttonLabel="Send my commercial enquiry">
      <p className="cs-enquiry-context">Your exploration: {kwp} kWp · {businessProfiles[profile].name}</p>
      <label htmlFor="cs-company">Business / organisation <span>(optional)</span></label><input id="cs-company" autoComplete="organization" maxLength={120} value={company} onChange={e => setCompany(e.target.value)} />
      <label htmlFor="cs-area">Site town or county</label><input id="cs-area" name="area" autoComplete="address-level2" maxLength={120} required />
      <label htmlFor="cs-notes">What should we know? <span>(optional)</span></label><textarea id="cs-notes" name="details" rows={3} maxLength={1800} placeholder="Working hours, roof type, energy use, future plans…" />
    </EnquiryForm>
  </section>;
}
