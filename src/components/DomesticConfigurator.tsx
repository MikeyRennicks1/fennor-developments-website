'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { defaultSelection, readSelection, selectionQuery, selectionSummary, type SolarSelection } from '@/lib/solar-selection';
import EnquiryForm from '@/components/EnquiryForm';

const SelectionContext = createContext<{ selection: SolarSelection; update: (change: Partial<SolarSelection>) => void }>({ selection: defaultSelection, update: () => {} });
export function SolarSelectionProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState(defaultSelection);
  const [ready, setReady] = useState(false);
  useEffect(() => { setSelection(readSelection(new URLSearchParams(window.location.search))); setReady(true); }, []);
  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    const query = new URLSearchParams(selectionQuery(selection));
    for (const [key, value] of query) url.searchParams.set(key, value);
    window.history.replaceState(window.history.state, '', url);
  }, [selection, ready]);
  return <SelectionContext.Provider value={{ selection, update: change => setSelection(previous => ({ ...previous, ...change })) }}>{children}</SelectionContext.Provider>;
}

function SolarHouse({ panels, battery, eddi, ev }: SolarSelection) {
  // Roof coordinates share one affine plane: every panel lies on the same surface.
  const roofPoint = (u: number, v: number) => `${238 + 370 * u - 123 * v},${151 + 116 * u + 123 * v}`;
  const panelPolygon = (column: number, row: number) => {
    const u = .07 + column * .174, v = .10 + row * .195;
    return [roofPoint(u, v), roofPoint(u + .154, v), roofPoint(u + .154, v + .168), roofPoint(u, v + .168)].join(' ');
  };
  return <svg className="ds-house" viewBox="0 0 800 580" role="img" aria-label={`Illustrative house with ${panels} solar panels${battery ? ', battery storage selected' : ''}${eddi ? ', hot-water diversion selected' : ''}${ev ? ', EV charger selected' : ''}`}>
    <defs>
      <linearGradient id="ds-roof" x2=".8" y2="1"><stop stopColor="#56636b" /><stop offset="1" stopColor="#273b48" /></linearGradient>
      <linearGradient id="ds-wall" x2="0" y2="1"><stop stopColor="#faf9f0" /><stop offset="1" stopColor="#dbdad0" /></linearGradient>
      <linearGradient id="ds-glass" x2="1" y2="1"><stop stopColor="#94acb3" /><stop offset=".45" stopColor="#dae4de" /><stop offset="1" stopColor="#6b8691" /></linearGradient>
      <linearGradient id="ds-panel" x2="1" y2="1"><stop stopColor="#41647c" /><stop offset=".45" stopColor="#223f56" /><stop offset="1" stopColor="#0f293f" /></linearGradient>
      <filter id="ds-shadow"><feGaussianBlur stdDeviation="13" /></filter>
      <pattern id="ds-paving" width="50" height="28" patternUnits="userSpaceOnUse"><rect width="50" height="28" fill="#e4e5dc" /><path d="M0 0H50V28" fill="none" stroke="#d2d6cc" strokeWidth="1" /></pattern>
    </defs>
    <ellipse cx="425" cy="448" rx="250" ry="68" fill="#9ba99b" opacity=".3" filter="url(#ds-shadow)" />
    <path d="M63 351 371 217 761 374 449 550Z" fill="#dbe2d5" />
    <path d="M82 359 381 236 737 375 440 532Z" fill="url(#ds-paving)" />
    <path d="M115 283 485 400 485 505 115 390Z" fill="url(#ds-wall)" />
    <path d="M485 400 608 274 670 373 670 429 485 505Z" fill="#c7cfc5" />
    <path d="M238 151 608 267 485 400 115 274Z" fill="url(#ds-roof)" stroke="#203341" strokeWidth="3" />
    <path d="M608 267 687 374 670 383 601 288 486 408 480 398Z" fill="#344854" />
    <path d="M115 274 485 391 485 403 115 285Z" fill="#2b414e" />
    {Array.from({ length: 20 }, (_, index) => <polygon key={index} className={`ds-roof-panel ${index < panels ? 'installed' : ''}`} points={panelPolygon(index % 5, Math.floor(index / 5))} fill={index < panels ? 'url(#ds-panel)' : '#5d6e77'} stroke={index < panels ? '#9aacb5' : '#809097'} strokeWidth=".8" opacity={index < panels ? 1 : .16} />)}
    <path d="M164 320 260 350 260 414 164 384Z" fill="url(#ds-glass)" stroke="#354b58" strokeWidth="5" />
    <path d="M212 335V399M164 354 260 385" stroke="#354b58" strokeWidth="3" />
    <path d="M307 366 373 387 373 450 307 429Z" fill="url(#ds-glass)" stroke="#354b58" strokeWidth="5" />
    <path d="M340 377V440" stroke="#354b58" strokeWidth="3" />
    <path d="M521 403 568 384 568 470 521 489Z" fill="#263e4c" /><path d="M532 414 554 405 554 442 532 451Z" fill="url(#ds-glass)" /><path d="M559 449v8" stroke="#cfaa78" strokeWidth="3" />
    <path d="M580 353 624 335 624 377 580 396Z" fill="url(#ds-glass)" stroke="#344956" strokeWidth="4" />
    <path d="M478 399V505M120 286V390" stroke="#667a7b" strokeWidth="4" />
    <g className={`ds-house-option ${battery ? 'selected' : ''}`} aria-hidden="true">
      <path d="M616 401 652 388 652 443 616 458Z" fill="#fcfdfb" stroke="#879991" strokeWidth="1.5" /><path d="M652 388 662 396V448L652 443Z" fill="#b4c3bc" />
      <path d="M625 416 643 409" stroke="#e0a675" strokeWidth="3" /><path d="M625 426 643 419M625 432 643 425" stroke="#aab8b0" />
    </g>
    <g className={`ds-house-option ${eddi ? 'selected' : ''}`} aria-hidden="true">
      <path d="M394 393 421 402 421 433 394 424Z" fill="#fafcf7" stroke="#8c9c91" strokeWidth="1.5" /><path d="M401 403 414 407 414 414 401 410Z" fill="#385469" />
      <path d="M407 429v24" stroke="#bc946b" strokeWidth="2" />
    </g>
    <g className={`ds-house-option ds-ev-charger ${ev ? 'selected' : ''}`} aria-hidden="true">
      <path d="M437 410 464 419 464 458 437 449Z" fill="#223b49" stroke="#172d38" strokeWidth="2" />
      <path d="M464 419 470 415 470 454 464 458Z" fill="#516875" />
      <path d="M441 415 460 421" stroke="#ed8736" strokeWidth="3" />
      <path d="M443 424 457 429 457 439 443 434Z" fill="#b5e3b5" />
      <path d="M449 452v17c0 21-24 17-24-1v-16" fill="none" stroke="#253f4b" strokeWidth="4" strokeLinecap="round" />
      <path d="M425 452v-11l5-3" fill="none" stroke="#ed8736" strokeWidth="5" strokeLinecap="round" />
    </g>
    <path d="M53 345 134 377 115 395 37 363Z" fill="#9bad8d" />
    <g fill="#899e7d"><ellipse cx="77" cy="342" rx="22" ry="13" /><ellipse cx="48" cy="336" rx="15" ry="17" /><ellipse cx="110" cy="351" rx="22" ry="17" /></g>
    <path d="M692 358v-84" stroke="#897e68" strokeWidth="8" /><g fill="#9aae8e"><ellipse cx="695" cy="275" rx="35" ry="42" /><ellipse cx="720" cy="292" rx="28" ry="35" /><ellipse cx="670" cy="299" rx="25" ry="32" /></g>
    <path d="M280 471 390 506" stroke="#adbaae" /><text x="260" y="527" fill="#596d62" fontSize="10" letterSpacing="2">YOUR HOME, CONSIDERED AS A WHOLE</text>
  </svg>;
}

export function DomesticExplorer() {
  const { selection, update } = useContext(SelectionContext);
  const capacity = (selection.panels * selection.watts / 1000).toFixed(2);
  return <section className="ds-explorer" id="design" aria-labelledby="ds-explorer-title">
    <div className="ds-section-top"><p className="eyebrow">01 / A HOME THAT WORKS TOGETHER</p><p>Picture the system for your home.</p></div>
    <div className="ds-explorer-heading"><h2 id="ds-explorer-title">Make it<br /><em>your own.</em></h2><p>Add panels. Explore storage, hot water and EV charging.<br />Explore your preferences here; Fennor assesses the roof and turns suitable choices into an explained proposal. This is not a finished system design.</p></div>
    <div className="ds-configurator">
      <div className="ds-house-stage"><span className="ds-scene-label"><i /> LIVE SYSTEM EXPLORER</span><SolarHouse {...selection} /><div className="ds-scene-footer"><span>Illustrative geometry · Not to scale</span><span>{['Solar', selection.battery && 'Storage', selection.eddi && 'Hot water', selection.ev && 'EV charging'].filter(Boolean).join(' / ')}</span></div></div>
      <div className="ds-config-controls">
        <div className="ds-capacity" aria-live="polite"><span>YOUR STARTING POINT</span><output>{capacity}<small> kWp</small></output><p>Nominal panel capacity, not annual generation</p></div>
        <label className="ds-slider-label" htmlFor="ds-panels">Solar panels <strong>{selection.panels}</strong></label><input id="ds-panels" type="range" min="8" max="20" value={selection.panels} onChange={event => update({ panels: Number(event.target.value) })} /><div className="ds-range-ends"><span>8 panels</span><span>20 panels</span></div>
        <label className="ds-watts-label" htmlFor="ds-watts">Assumed panel rating</label><select id="ds-watts" value={selection.watts} onChange={event => update({ watts: Number(event.target.value) })}>{[400, 420, 440, 460, 480].map(watts => <option key={watts} value={watts}>{watts} W per panel</option>)}</select>
        <div className="ds-addition"><button type="button" aria-pressed={selection.battery} onClick={() => update({ battery: !selection.battery })}><span><b>Battery storage</b><small>Consider energy for later</small></span><i aria-hidden="true">{selection.battery ? '✓' : '+'}</i></button><a href="/solar/battery-storage">Understand batteries ↗</a></div>
        <div className="ds-addition"><button type="button" aria-pressed={selection.eddi} onClick={() => update({ eddi: !selection.eddi })}><span><b>EDDI hot-water diversion</b><small>Explore another use for surplus</small></span><i aria-hidden="true">{selection.eddi ? '✓' : '+'}</i></button><a href="/solar/accessories#eddi">How EDDI works ↗</a></div>
        <div className="ds-addition"><button type="button" aria-pressed={selection.ev} onClick={() => update({ ev: !selection.ev })}><span><b>EV charger</b><small>Consider charging at home</small></span><i aria-hidden="true">{selection.ev ? '✓' : '+'}</i></button><p className="ds-ev-note">Solar-aware charging depends on compatible equipment and available surplus. Charger selection does not change the grants shown below.</p></div>
        <p className="ds-config-note">{selection.panels} × {selection.watts} W. Fennor establishes product ratings, roof fit, inverter capacity, grid connection and accessory compatibility before proposing your system. Selecting an option does not confirm suitability or grant eligibility.</p>
        <a className="ds-button ds-button-dark" href="#assessment">Discuss this system <span>↗</span></a><a className="ds-inline-link" href={`/solar/calculator?${selectionQuery(selection)}`}>Take these choices to the calculator ↗</a>
      </div>
    </div>
    <noscript><p className="ds-noscript">Enable JavaScript to adjust the visual explorer. You can still read all guidance and call 089 403 2737 to discuss a system.</p></noscript>
  </section>;
}

export function DomesticEnquiry() {
  const { selection } = useContext(SelectionContext);
  const summary = selectionSummary(selection);
  return <section className="ds-enquiry" id="assessment" aria-labelledby="ds-enquiry-title"><div><p className="eyebrow">YOUR HOME. YOUR NEXT STEP.</p><h2 id="ds-enquiry-title">Let’s put your<br /><em>roof in the picture.</em></h2><p>Based in Slane. Helping homeowners across Meath, Louth and Dublin, with enquiries across Leinster. Send your starting ideas and we’ll explain the assessment, suitable options and quote process—you do not need to know your final system size.</p><a className="ds-phone" href="tel:+353894032737">089 403 2737 ↗</a><a href="mailto:info@fennor.ie">info@fennor.ie</a></div>
    <EnquiryForm topic="Domestic solar enquiry" context={summary} buttonClassName="ds-button" buttonLabel="Send my solar enquiry">
      <p className="ds-enquiry-summary" aria-live="polite">{summary}</p>
      <label htmlFor="ds-county">Where is your home?</label><select id="ds-county" name="area" defaultValue="" required><option value="">Choose your area</option>{['Meath', 'Louth', 'Dublin', 'Elsewhere in Leinster'].map(area => <option key={area}>{area}</option>)}</select>
      <label htmlFor="ds-notes">Tell us a little about it <span>(optional)</span></label><textarea id="ds-notes" name="details" rows={3} maxLength={1800} placeholder="Roof, electricity use, battery questions, future plans…" />
    </EnquiryForm>
  </section>;
}
