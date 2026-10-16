'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import './domestic-electrical-sequence.css';

type Point = [number, number, number];

const stages = [
  {
    name: 'Survey & plan',
    tag: 'UNDERSTAND THE HOME',
    title: 'Begin with the way you live.',
    text: 'We walk through the rooms, discuss what is changing and review the existing installation. Furniture, appliances, lighting and future plans all help shape a useful electrical brief.',
    detail: 'Rooms · existing installation · everyday needs',
    note: 'The home and your priorities come first',
    callout: 'ROOMS & REQUIREMENTS',
    marker: [277, 438],
  },
  {
    name: 'First fix',
    tag: 'ROUTES BEHIND THE FINISH',
    title: 'Put the important decisions in place early.',
    text: 'Agreed routes and back-box positions are coordinated before walls and ceilings are closed. On a wider renovation, this stage is planned with the other trades and the finishes you want to protect.',
    detail: 'Agreed routes · back boxes · trade coordination',
    note: 'Positions and routes before the finish closes in',
    callout: 'FIRST-FIX ROUTES',
    marker: [307, 300],
  },
  {
    name: 'Distribution & protection',
    tag: 'PROTECTION & CAPACITY',
    title: 'Bring the installation together.',
    text: 'The proposed circuits, consumer unit and protective equipment are considered as one installation. Existing conditions and any planned high-demand equipment can be addressed in the agreed scope.',
    detail: 'Consumer unit · protective equipment · planned loads',
    note: 'A coordinated centre for the installation',
    callout: 'DISTRIBUTION & PROTECTION',
    marker: [533, 277],
  },
  {
    name: 'Second fix',
    tag: 'THE PARTS YOU USE',
    title: 'Complete the rooms around real life.',
    text: 'Switches, sockets, luminaires and agreed accessories are fitted in the positions you approved. The final choices connect the earlier plan with how each room should feel and function.',
    detail: 'Switches · sockets · lighting · accessories',
    note: 'The visible details meet the work behind them',
    callout: 'FITTINGS & LIGHTING',
    marker: [412, 244],
  },
  {
    name: 'Test & certify',
    tag: 'CHECK BEFORE HANDOVER',
    title: 'Verify the work before you rely on it.',
    text: 'The completed electrical work is inspected and tested as required. We explain the relevant certification and records for the agreed work, with any outstanding items made clear.',
    detail: 'Inspection · testing · relevant certification',
    note: 'Checks and records before completion',
    callout: 'INSPECTION & TESTING',
    marker: [581, 334],
  },
  {
    name: 'Demonstration & handover',
    tag: 'YOUR FINISHED HOME',
    title: 'Know what was completed—and how to use it.',
    text: 'At handover, we bring together the relevant records and practical guidance for the installed equipment. You can see how the agreed work fits your home and who to contact if a question follows.',
    detail: 'Records · equipment guidance · follow-up contact',
    note: 'A finished room with the information kept together',
    callout: 'DEMONSTRATION & HANDOVER',
    marker: [655, 420],
  },
] as const;

const project = ([x, y, z]: Point): [number, number] => [420 + (x - z) * .88, 330 - y * 1.03 + (x + z) * .29];
const points = (values: Point[]) => values.map((value) => project(value).join(',')).join(' ');
const line = (values: Point[]) => values.map((value, index) => `${index ? 'L' : 'M'}${project(value).join(' ')}`).join(' ');

function Face({ at, fill, stroke = 'none', className }: { at: Point[]; fill: string; stroke?: string; className?: string }) {
  return <polygon points={points(at)} fill={fill} stroke={stroke} className={className} />;
}

function Layer({ visible, className = '', children }: { visible: boolean; className?: string; children: ReactNode }) {
  return <g className={`fed-layer ${className}`} data-visible={visible}>{children}</g>;
}

function WallPoint({ point, kind = 'box' }: { point: Point; kind?: 'box' | 'socket' | 'switch' }) {
  const [cx, cy] = project(point);
  return <g className={`fed-wall-point fed-wall-point-${kind}`} transform={`translate(${cx} ${cy})`}>
    <rect x={kind === 'switch' ? -4 : -6} y={kind === 'switch' ? -6 : -5} width={kind === 'switch' ? 8 : 12} height={kind === 'switch' ? 12 : 10} rx="1.5" />
    {kind === 'socket' && <><circle cx="-2.5" cy="0" r="1" /><circle cx="2.5" cy="0" r="1" /></>}
  </g>;
}

function RoomDrawing({ stage, id }: { stage: number; id: string }) {
  const step = stages[stage];
  const showRoutes = stage >= 1 && stage <= 4;
  const showDistribution = stage >= 2;
  const showSecondFix = stage >= 3;
  const finished = stage === 5;
  const lightPoints: Point[] = [[92, 177, 62], [205, 177, 62], [285, 177, 147]];
  return <svg className="fed-drawing" viewBox="0 0 860 560" role="img" aria-labelledby={`${id}-title ${id}-description`}>
    <title id={`${id}-title`}>{`${step.name}: an illustrative domestic electrical project stage`}</title>
    <desc id={`${id}-description`}>{`${step.text} This is a conceptual customer journey, not a wiring diagram.`}</desc>
    <defs>
      <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e6dfd2" /><stop offset="1" stopColor="#c7bba8" /></linearGradient>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fbfaf3" /><stop offset="1" stopColor="#dce4de" /></linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9fbac1" /><stop offset=".52" stopColor="#e4eee8" /><stop offset="1" stopColor="#afc8bd" /></linearGradient>
      <radialGradient id={`${id}-light`}><stop stopColor="#ffe9aa" stopOpacity=".9" /><stop offset="1" stopColor="#f3b35f" stopOpacity="0" /></radialGradient>
      <pattern id={`${id}-grid`} width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#78908c" strokeWidth=".55" opacity=".13" /></pattern>
      <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="190%"><feGaussianBlur stdDeviation="11" /></filter>
    </defs>
    <rect width="860" height="560" fill={`url(#${id}-grid)`} />
    <g className="fed-drawing-meta" aria-hidden="true"><path d="M27 27H58M27 27V58M833 27H802M833 27V58M27 533H58M27 533V502M833 533H802M833 533V502" /><text x="44" y="51">FENNOR / DOMESTIC ELECTRICAL</text><text x="816" y="51" textAnchor="end">CONCEPT STUDY</text></g>
    <ellipse cx="438" cy="454" rx="278" ry="66" fill="#435b5e" opacity=".12" filter={`url(#${id}-shadow)`} />

    <Face at={[[-35, -8, -30], [375, -8, -30], [375, -8, 270], [-35, -8, 270]]} fill="#e8e9e1" stroke="#b9c5be" />
    <Face at={[[0, 0, 0], [340, 0, 0], [340, 0, 235], [0, 0, 235]]} fill={`url(#${id}-floor)`} stroke="#aab5ae" />
    {Array.from({ length: 12 }, (_, index) => <path key={`floor-${index}`} d={line([[index * 29, .5, 0], [index * 29, .5, 235]])} className="fed-floor-line" />)}

    <Face at={[[0, 0, 235], [340, 0, 235], [340, 165, 235], [0, 165, 235]]} fill={`url(#${id}-wall)`} stroke="#b9c6bf" className="fed-room-wall" />
    <Face at={[[0, 0, 0], [0, 0, 235], [0, 165, 235], [0, 165, 0]]} fill="#e2e8e1" stroke="#b5c1ba" className="fed-room-wall fed-room-wall-side" />

    <Face at={[[28, 40, 235.8], [124, 40, 235.8], [124, 130, 235.8], [28, 130, 235.8]]} fill="#465e65" />
    <Face at={[[34, 46, 236], [118, 46, 236], [118, 124, 236], [34, 124, 236]]} fill={`url(#${id}-glass)`} />
    <path d={line([[76, 45, 236.3], [76, 125, 236.3]])} className="fed-window-line" />
    <Face at={[[.2, 25, 54], [.2, 25, 155], [.2, 132, 155], [.2, 132, 54]]} fill="#465d62" />
    <Face at={[[.4, 31, 60], [.4, 31, 149], [.4, 126, 149], [.4, 126, 60]]} fill={`url(#${id}-glass)`} />
    <path d={line([[.7, 29, 104], [.7, 129, 104]])} className="fed-window-line" />

    <Layer visible={stage === 0} className="fed-plan-layer">
      <path d={line([[18, 2, 18], [322, 2, 18], [322, 2, 217], [18, 2, 217], [18, 2, 18]])} />
      <path d={line([[152, 2, 18], [152, 2, 217]])} />
      <path d={line([[18, 2, 124], [152, 2, 124]])} />
      {[[72, 2, 74], [216, 2, 80], [269, 2, 174]].map((point, index) => { const [cx, cy] = project(point as Point); return <g key={index} transform={`translate(${cx} ${cy})`}><circle r="18" /><path d="M-7 0H7M0-7V7" /></g>; })}
      <path d="M213 465H123V485M615 471H706V450" className="fed-callout-line" />
      <text x="117" y="500">ROOM USE</text><text x="711" y="445">EXISTING INSTALLATION</text>
    </Layer>

    <Layer visible={showRoutes} className="fed-route-layer">
      <path d={line([[302, 88, 234], [302, 22, 234], [154, 22, 234], [154, 98, 234], [154, 98, 187]])} />
      <path d={line([[302, 72, 234], [218, 72, 234], [218, 35, 234]])} />
      <path d={line([[302, 58, 234], [302, 58, 145], [302, 42, 58]])} />
      <path d={line([[154, 98, 187], [154, 150, 128], [154, 178, 62]])} />
      <path d={line([[218, 35, 234], [205, 177, 62]])} />
      <path d={line([[302, 42, 58], [285, 177, 147]])} />
      <WallPoint point={[154, 43, 234]} />
      <WallPoint point={[217, 42, 234]} />
      <WallPoint point={[286, 42, 234]} />
      <WallPoint point={[.5, 44, 185]} />
      <WallPoint point={[.5, 91, 175]} kind="switch" />
    </Layer>

    <Layer visible={showDistribution} className="fed-distribution-layer">
      <Face at={[[284, 54, 233], [330, 54, 233], [330, 121, 233], [284, 121, 233]]} fill="#eff2ec" stroke="#667b78" />
      <Face at={[[290, 63, 232.5], [324, 63, 232.5], [324, 111, 232.5], [290, 111, 232.5]]} fill="#d8e0da" />
      {[0, 1, 2, 3].map((row) => <path key={row} d={line([[294, 72 + row * 10, 232], [320, 72 + row * 10, 232]])} className="fed-board-row" />)}
      <path d={line([[306, 53, 234], [306, 18, 234]])} className="fed-board-entry" />
      <g className="fed-protection-symbol" transform="translate(569 250)"><circle r="20" /><path d="M-7 0-1 6 10-8" /></g>
    </Layer>

    <Layer visible={showSecondFix} className="fed-second-fix-layer">
      <WallPoint point={[154, 43, 234]} kind="socket" />
      <WallPoint point={[217, 42, 234]} kind="socket" />
      <WallPoint point={[286, 42, 234]} kind="socket" />
      <WallPoint point={[.5, 44, 185]} kind="socket" />
      <WallPoint point={[.5, 91, 175]} kind="switch" />
      {lightPoints.map((point, index) => { const [cx, cy] = project(point); const [gx, gy] = project([point[0], 3, point[2]]); return <g key={index} className="fed-light"><ellipse cx={gx} cy={gy} rx="72" ry="31" fill={`url(#${id}-light)`} /><path d={`M${cx} ${cy - 27}V${cy - 4}`} /><path d={`M${cx - 13} ${cy + 1}Q${cx - 10} ${cy - 14} ${cx} ${cy - 14}Q${cx + 10} ${cy - 14} ${cx + 13} ${cy + 1}Z`} /><ellipse cx={cx} cy={cy + 1} rx="13" ry="4" /></g>; })}
    </Layer>

    <Layer visible={stage >= 3} className="fed-furniture-layer">
      <Face at={[[20, 0, 201], [142, 0, 201], [142, 48, 201], [20, 48, 201]]} fill="#b1a48f" stroke="#918570" />
      <Face at={[[20, 48, 201], [142, 48, 201], [142, 48, 232], [20, 48, 232]]} fill="#e8e4d9" stroke="#c8c2b5" />
      <Face at={[[177, 0, 126], [282, 0, 126], [282, 0, 175], [177, 0, 175]]} fill="#c3b49b" stroke="#95876e" />
      <Face at={[[177, 36, 126], [282, 36, 126], [282, 36, 175], [177, 36, 175]]} fill="#ece8df" stroke="#c5beb0" />
      <Face at={[[177, 0, 175], [282, 0, 175], [282, 36, 175], [177, 36, 175]]} fill="#b09f83" />
      <Face at={[[222, 0, 21], [324, 0, 21], [324, 27, 21], [222, 27, 21]]} fill="#82918c" stroke="#62746f" />
      <Face at={[[222, 27, 21], [324, 27, 21], [324, 27, 91], [222, 27, 91]]} fill="#afb8ae" />
    </Layer>

    <Layer visible={stage === 4} className="fed-test-layer">
      <g transform="translate(621 372)"><rect x="-48" y="-62" width="96" height="124" rx="7" /><rect x="-35" y="-47" width="70" height="31" rx="3" /><path d="M-22 9H22M-22 22H22M-22 35H8" /><circle cx="26" cy="35" r="6" /><path className="fed-test-tick" d="M-17-31-5-20 18-42" /></g>
      <path d="M596 415C544 438 496 438 449 404" className="fed-test-lead" />
      <circle cx="446" cy="402" r="7" />
    </Layer>

    <Layer visible={finished} className="fed-handover-layer">
      <g transform="translate(654 428)"><rect x="-55" y="-42" width="110" height="84" rx="4" /><path d="M-32-18H31M-32-4H18M-32 10H25" /><circle cx="33" cy="20" r="18" /><path d="M24 20 31 27 43 12" /></g>
      <path d="M188 197C245 168 327 165 389 199" className="fed-finish-spark" />
      <circle cx="188" cy="197" r="4" /><circle cx="389" cy="199" r="4" />
    </Layer>

    <g className="fed-dimensions" aria-hidden="true"><path d="M130 500H694M124 494V506M700 494V506" /><text x="412" y="519" textAnchor="middle">A CONSIDERED SEQUENCE, SHAPED AROUND YOUR HOME</text><path d="M773 453V417M766 425 773 413 780 425" /><text x="773" y="469" textAnchor="middle">N</text></g>
    <g className="fed-stage-marker" transform={`translate(${step.marker[0]} ${step.marker[1]})`} aria-hidden="true"><circle className="fed-marker-ring" r="18" /><circle r="5" /><circle r="2" /></g>
    <g className="fed-stage-callout" aria-hidden="true"><path d="M48 109H91M48 109V130" /><text x="48" y="98">{step.callout}</text><text x="48" y="145">0{stage + 1} / 06</text></g>
  </svg>;
}

export default function DomesticElectricalSequence() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const id = `fed-sequence-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const step = stages[stage];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    updatePreference();
    preference.addEventListener('change', updatePreference);
    const element = section.current;
    if (!element) return () => preference.removeEventListener('change', updatePreference);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting && !started.current && !preference.matches) {
        started.current = true;
        setPlaying(true);
      }
    }, { threshold: .12 });
    observer.observe(element);
    const pauseWhenHidden = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      preference.removeEventListener('change', updatePreference);
      observer.disconnect();
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion || !visible) return;
    const timer = window.setTimeout(() => {
      if (stage < stages.length - 1) setStage((value) => value + 1);
      else setPlaying(false);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [stage, playing, reducedMotion, visible]);

  const choose = (index: number) => {
    started.current = true;
    setStage(index);
    setPlaying(false);
  };

  const togglePlayback = () => {
    started.current = true;
    if (playing) { setPlaying(false); return; }
    if (stage === stages.length - 1) setStage(0);
    setPlaying(true);
  };

  const replay = () => {
    started.current = true;
    setStage(0);
    setPlaying(!reducedMotion);
  };

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % stages.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + stages.length - 1) % stages.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = stages.length - 1;
    else return;
    event.preventDefault();
    choose(next);
    controls.current?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus();
  };

  return <section ref={section} className="fed-section fe-shell" id="domestic-electrical-sequence" aria-labelledby="fed-sequence-heading">
    <div className="fe-section-top"><p className="fe-kicker">YOUR HOME, LAYER BY LAYER</p><span>Explore the journey from first conversation to handover.</span></div>
    <div className="fed-heading"><h2 id="fed-sequence-heading">See what happens.<br /><em>Before the finish goes on.</em></h2><p>Choose a stage or let the sequence play. It shows how the decisions connect—not how to carry out electrical work.</p></div>
    <div className="fed-sequence" data-stage={stage} data-playing={playing && visible} data-reduced-motion={reducedMotion}>
      <div className="fed-scene">
        <div className="fed-toolbar"><span className="fed-overline"><i aria-hidden="true" /> DOMESTIC ELECTRICAL JOURNEY</span><div className="fed-playback">
          <button type="button" onClick={togglePlayback} disabled={reducedMotion} aria-label={playing ? 'Pause electrical sequence' : stage === stages.length - 1 ? 'Replay electrical sequence' : 'Play electrical sequence'} aria-describedby={reducedMotion ? `${id}-motion-note` : undefined}><svg viewBox="0 0 20 20" aria-hidden="true">{playing ? <path d="M6 4V16M14 4V16" stroke="currentColor" strokeWidth="2.3" /> : <path d="M6 4 16 10 6 16Z" fill="currentColor" />}</svg><span>{playing ? 'Pause' : stage === stages.length - 1 ? 'Replay' : 'Play'}</span></button>
          <button type="button" onClick={replay} aria-label="Restart electrical sequence from survey and planning"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 7a6 6 0 1 1-.5 5M4 3v4h4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></button>
        </div></div>
        <RoomDrawing stage={stage} id={id} />
        <div className="fed-caption"><span className="fed-count">0{stage + 1}<small>/ 06</small></span><div><strong>{step.note}</strong><span>{step.detail}</span></div><span className="fed-progress" aria-hidden="true">{stages.map((item, index) => <i key={item.name} className={index === stage ? 'is-current' : index < stage ? 'is-complete' : ''} />)}</span></div>
        <p className="fed-footnote">Illustrative customer journey only · not a wiring or installation diagram · scope and sequence depend on your home.</p>
        {reducedMotion && <p className="fed-motion-note" id={`${id}-motion-note`}>Reduced motion is on. Select a stage to explore at your own pace.</p>}
      </div>
      <div className="fed-content">
        <p className="fed-overline">EXPLORE THE WORK</p>
        <div ref={controls} className="fed-stages" role="group" aria-label="Domestic electrical project stages">{stages.map((item, index) => <button key={item.name} type="button" onClick={() => choose(index)} onKeyDown={(event) => moveFocus(event, index)} aria-pressed={stage === index} aria-controls={`${id}-explanation`}><span className="fed-stage-number">0{index + 1}</span><span>{item.name}</span><span className="fed-stage-symbol" aria-hidden="true">{stage === index ? '−' : '+'}</span></button>)}</div>
        <div id={`${id}-explanation`} className="fed-explanation" aria-live={playing ? 'off' : 'polite'} aria-atomic="true"><p className="fed-overline">{step.tag}</p><h3>{step.title}</h3><p>{step.text}</p><span className="fed-detail"><i aria-hidden="true" />{step.detail}</span></div>
      </div>
    </div>
  </section>;
}
