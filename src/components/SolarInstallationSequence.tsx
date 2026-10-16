'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import './solar-installation-sequence.css';

type RoofPoint = [number, number];

const stages = [
  {
    name: 'Assess & lay out',
    title: 'Start with the roof you have.',
    text: 'Fennor brings the roof condition, usable faces, shade, access and your electricity routine into one assessment. You see the proposed panel area and any questions that need resolving before installation is agreed.',
    detail: 'Roof condition · daylight · access · proposed layout',
    tag: '01 / ROOF ASSESSMENT',
    note: 'The roof and your energy use shape the plan',
    callout: 'SURVEY & LAYOUT',
    marker: [280, 194] as RoofPoint,
  },
  {
    name: 'Fixings',
    title: 'A secure start sits beneath the panels.',
    text: 'The mounting approach is selected for the assessed roof covering and structure. The installation team sets out the approved fixing positions and manages the roof interfaces before the mounting system is built up.',
    detail: 'Roof-specific mounting · setting out · weathering details',
    tag: '02 / ROOF FIXINGS',
    note: 'The agreed mounting points are set out',
    callout: 'FIXINGS & HOOKS',
    marker: [389, 286] as RoofPoint,
  },
  {
    name: 'Rails & route',
    title: 'Plan the route before the roof fills up.',
    text: 'Rails are aligned to support the agreed array. At the same time, the cable route and equipment location are coordinated around the home, so the visible finish and the work behind it have been considered together.',
    detail: 'Mounting rails · cable route · equipment position',
    tag: '03 / SUPPORT & ROUTE',
    note: 'The supporting frame and route come together',
    callout: 'RAILS & CABLE ROUTE',
    marker: [493, 350] as RoofPoint,
  },
  {
    name: 'Panels',
    title: 'Build the layout that was agreed.',
    text: 'Panels are placed to the assessed layout, with roof edges, obstructions and access kept in view. The result is an organised array designed for this roof—not a panel count copied from another home.',
    detail: 'Agreed array · considered spacing · careful finish',
    tag: '04 / PANEL ARRAY',
    note: 'The proposed solar array takes its final form',
    callout: 'PANELS INSTALLED',
    marker: [372, 242] as RoofPoint,
  },
  {
    name: 'Connect',
    title: 'Bring generation safely into the home.',
    text: 'The inverter, protection, metering and network requirements are completed as part of the agreed electrical scope. Fennor explains where the equipment will sit and what will happen before any planned interruption to your supply.',
    detail: 'Inverter · protection · metering · grid process',
    tag: '05 / CONNECTION',
    note: 'The roof array and home electrical system connect',
    callout: 'CONVERT & CONNECT',
    marker: [641, 403] as RoofPoint,
  },
  {
    name: 'Test & hand over',
    title: 'Know what your system is doing.',
    text: 'Testing, commissioning and handover turn an installation into a system you can understand. You are shown the monitoring, normal operation and support route, and receive the relevant records for the work completed.',
    detail: 'Testing · monitoring · records · aftercare',
    tag: '06 / HANDOVER',
    note: 'A tested system, explained clearly',
    callout: 'MONITOR & HAND OVER',
    marker: [708, 155] as RoofPoint,
  },
];

function roofPoint(u: number, v: number): RoofPoint {
  return [280 + 400 * u - 165 * v, 110 + 125 * u + 190 * v];
}

function roofPolygon(u: number, v: number, width: number, height: number) {
  return [roofPoint(u, v), roofPoint(u + width, v), roofPoint(u + width, v + height), roofPoint(u, v + height)]
    .map(point => point.join(','))
    .join(' ');
}

function Layer({ visible, className = '', children }: { visible: boolean; className?: string; children: ReactNode }) {
  return <g className={`fsq-layer ${className}`} data-visible={visible} aria-hidden={!visible}>{children}</g>;
}

function SolarDrawing({ stage, id }: { stage: number; id: string }) {
  const current = stages[stage];
  const fill = (name: string) => `url(#${id}-${name})`;
  const panelPositions = Array.from({ length: 12 }, (_, index) => ({ column: index % 4, row: Math.floor(index / 4) }));
  const hookPositions = Array.from({ length: 24 }, (_, index) => ({ column: index % 6, row: Math.floor(index / 6) }));

  return <svg className="fsq-drawing" viewBox="0 0 920 600" role="img" aria-labelledby={`${id}-drawing-title ${id}-drawing-description`}>
    <title id={`${id}-drawing-title`}>{`${current.name}: conceptual domestic solar installation stage`}</title>
    <desc id={`${id}-drawing-description`}>{`${current.detail}. Explore six stages from roof assessment to monitoring and handover. This illustration is conceptual and is not a technical or electrical design.`}</desc>
    <defs>
      <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f7f7ef"/><stop offset="1" stopColor="#e9f1e7"/></linearGradient>
      <linearGradient id={`${id}-roof`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#52636a"/><stop offset=".55" stopColor="#344a55"/><stop offset="1" stopColor="#203846"/></linearGradient>
      <linearGradient id={`${id}-roof-back`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#69797c"/><stop offset="1" stopColor="#344b52"/></linearGradient>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f6f4e9"/><stop offset="1" stopColor="#d8dfd4"/></linearGradient>
      <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d5ddd2"/><stop offset="1" stopColor="#aebdb5"/></linearGradient>
      <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#315a73"/><stop offset=".45" stopColor="#173c57"/><stop offset="1" stopColor="#0b263d"/></linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7da2aa"/><stop offset=".5" stopColor="#dce9e3"/><stop offset="1" stopColor="#62828c"/></linearGradient>
      <pattern id={`${id}-grid`} width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#59756a" strokeWidth=".65" opacity=".13"/></pattern>
      <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="11"/></filter>
      <filter id={`${id}-glow`} x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="7"/></filter>
      <marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 6 3 0 6" fill="none" stroke="#ee8a45" strokeWidth="1.2"/></marker>
    </defs>

    <rect width="920" height="600" fill={fill('paper')}/>
    <rect width="920" height="600" fill={fill('grid')}/>
    <g className="fsq-drawing-meta" aria-hidden="true">
      <path d="M28 28H61M28 28V61M892 28H859M892 28V61M28 572H61M28 572V539M892 572H859M892 572V539" fill="none" stroke="#789085" strokeWidth=".7"/>
      <text x="45" y="52">FENNOR / SOLAR STUDY 01</text><text x="875" y="52" textAnchor="end">CONCEPTUAL AXONOMETRIC VIEW</text>
    </g>

    <ellipse cx="467" cy="493" rx="343" ry="72" fill="#325340" opacity=".13" filter={`url(#${id}-shadow)`}/>
    <path d="M52 429 403 574 864 378 501 242Z" fill="#dbe6d7" stroke="#b9cabd" strokeWidth="1"/>
    <path d="M80 432 405 555 835 377 505 260Z" fill="none" stroke="#95ad9d" strokeWidth=".8" strokeDasharray="4 7"/>

    <g className="fsq-house-shell">
      <path d="M115 300 515 425 515 535 115 410Z" fill={fill('wall')} stroke="#80918a" strokeWidth="1.1"/>
      <path d="M515 425 680 235 790 195 790 305 515 535Z" fill={fill('side')} stroke="#71867e" strokeWidth="1.1"/>
      <path d="M390 70 790 195 680 235 280 110Z" fill={fill('roof-back')} stroke="#29444e" strokeWidth="1.2"/>
      <path d="M280 110 680 235 515 425 115 300Z" fill={fill('roof')} stroke="#183746" strokeWidth="2"/>
      <path d="M280 110 680 235" stroke="#8ba09e" strokeWidth="4"/>
      <path d="M113 300 516 426" stroke="#1c3946" strokeWidth="5"/>
      {Array.from({ length: 17 }, (_, index) => {
        const from = roofPoint(index / 16, 0);
        const to = roofPoint(index / 16, 1);
        return <line key={`tile-column-${index}`} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke="#9aabb0" strokeWidth=".55" opacity=".42"/>;
      })}
      {Array.from({ length: 10 }, (_, index) => {
        const from = roofPoint(0, index / 10);
        const to = roofPoint(1, index / 10);
        return <line key={`tile-row-${index}`} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke="#9aabb0" strokeWidth=".55" opacity=".35"/>;
      })}
      <path d="M161 351 248 378 248 436 161 409Z" fill={fill('glass')} stroke="#344f59" strokeWidth="4"/>
      <path d="M204 365V422M161 379 248 406" stroke="#3d5861" strokeWidth="2.5"/>
      <path d="M310 397 382 419 382 478 310 456Z" fill={fill('glass')} stroke="#344f59" strokeWidth="4"/>
      <path d="M346 408V467" stroke="#3d5861" strokeWidth="2.5"/>
      <path d="M441 438 487 452 487 526 441 512Z" fill="#294554"/>
      <path d="M451 451 477 459 477 484 451 476Z" fill={fill('glass')}/>
      <path d="M475 497v7" stroke="#ed8a45" strokeWidth="3"/>
      <path d="M602 399 646 368 646 427 602 459Z" fill={fill('glass')} stroke="#425f66" strokeWidth="3"/>
      <path d="M691 330V233" stroke="#7a7765" strokeWidth="7"/>
      <g fill="#7f9a77"><ellipse cx="694" cy="222" rx="30" ry="37"/><ellipse cx="718" cy="237" rx="25" ry="29"/><ellipse cx="671" cy="241" rx="24" ry="30"/></g>
      <g fill="#8ea983"><ellipse cx="100" cy="405" rx="33" ry="18"/><ellipse cx="73" cy="400" rx="22" ry="24"/><ellipse cx="126" cy="412" rx="27" ry="21"/></g>
    </g>

    <Layer visible={stage === 0} className="fsq-survey">
      <polygon points={roofPolygon(.075, .12, .85, .73)} fill="#d5f3bf" fillOpacity=".08" stroke="#d8f2c4" strokeWidth="2" strokeDasharray="7 6"/>
      {[[.075,.12],[.925,.12],[.925,.85],[.075,.85]].map(([u,v], index) => {
        const [x,y] = roofPoint(u,v);
        return <g key={`survey-corner-${index}`} transform={`translate(${x} ${y})`}><circle r="7" fill="#f3a064"/><circle r="2.4" fill="#fff7eb"/></g>;
      })}
      <path d="M120 98C199 31 313 26 397 72" fill="none" stroke="#ef985b" strokeWidth="1.4" strokeDasharray="5 7" markerEnd={`url(#${id}-arrow)`}/>
      <circle cx="119" cy="98" r="13" fill="#f6b171" opacity=".2"/><circle cx="119" cy="98" r="5" fill="#ed8a45"/>
      <g className="fsq-survey-label"><path d="M178 164h52l24 14"/><text x="178" y="153">USABLE ROOF AREA</text></g>
      <g className="fsq-survey-label"><path d="M609 104h72l15 30"/><text x="609" y="93">SHADE & ORIENTATION</text></g>
    </Layer>

    <Layer visible={stage === 1 || stage === 2} className="fsq-hooks">
      {hookPositions.map(({ column, row }, index) => {
        const [x,y] = roofPoint(.105 + column * .16, .20 + row * .20);
        return <g key={`hook-${index}`} className="fsq-hook" style={{ '--fsq-delay': `${(row * 6 + column) * 36}ms` } as CSSProperties} transform={`translate(${x} ${y}) rotate(17)`}>
          <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#f4b27a" stroke="#f7ddc5" strokeWidth="1"/><path d="M0-9V9" stroke="#f7eee5" strokeWidth="1.4"/>
        </g>;
      })}
    </Layer>

    <Layer visible={stage >= 2} className="fsq-rails">
      {[.25,.43,.63,.81].map((v,index) => {
        const from = roofPoint(.06,v), to = roofPoint(.94,v);
        return <g key={`rail-${v}`} className="fsq-rail" style={{ '--fsq-delay': `${index * 120}ms` } as CSSProperties}>
          <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke="#dbe4df" strokeWidth="6"/><line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke="#879ba0" strokeWidth="2"/>
        </g>;
      })}
      <path className="fsq-cable-route" d="M581 370C590 390 590 414 607 431S631 442 638 459" fill="none" stroke="#ee8a45" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5" markerEnd={`url(#${id}-arrow)`}/>
    </Layer>

    <Layer visible={stage >= 3} className="fsq-panels">
      {panelPositions.map(({ column,row },index) => <g key={`panel-${index}`} className="fsq-panel" style={{ '--fsq-delay': `${index * 65}ms` } as CSSProperties}>
        <polygon points={roofPolygon(.08 + column * .215, .15 + row * .245, .19, .205)} fill={fill('panel')} stroke="#aac3ca" strokeWidth="1.3"/>
        <polygon points={roofPolygon(.092 + column * .215, .162 + row * .245, .166, .181)} fill="none" stroke="#6f98aa" strokeWidth=".55" opacity=".8"/>
        {(() => { const a=roofPoint(.175 + column*.215,.155 + row*.245); const b=roofPoint(.175 + column*.215,.345 + row*.245); return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#86a9b8" strokeWidth=".55" opacity=".8"/>; })()}
      </g>)}
    </Layer>

    <Layer visible={stage >= 4} className="fsq-connection">
      <path className="fsq-power-route" d="M579 370C598 400 608 420 627 445" fill="none" stroke="#ef8b45" strokeWidth="3.5" strokeLinecap="round" markerEnd={`url(#${id}-arrow)`}/>
      <g className="fsq-equipment" transform="translate(620 422)">
        <path d="M0 15 43 0 43 67 0 83Z" fill="#f9fbf7" stroke="#6f837c" strokeWidth="1.4"/><path d="M43 0 51 6V73L43 67Z" fill="#aebdb7"/>
        <path d="M9 28 34 19" stroke="#ee8a45" strokeWidth="3"/><path d="M10 39 32 31M10 49 32 41" stroke="#a7b6b0" strokeWidth="1"/>
        <text x="20" y="68" textAnchor="middle">DC / AC</text>
      </g>
      <g className="fsq-protection" transform="translate(681 414)"><path d="M0 12 28 2 28 43 0 53Z" fill="#eef2ec" stroke="#758880"/><path d="M28 2 34 7V48L28 43Z" fill="#aebbb5"/><circle cx="14" cy="27" r="4" fill="#ed8a45"/></g>
      <path d="M716 450C753 446 771 428 797 415" fill="none" stroke="#7a9388" strokeWidth="1.5" strokeDasharray="4 5" markerEnd={`url(#${id}-arrow)`}/>
      <g className="fsq-grid-mark" transform="translate(810 354)"><path d="M0 58V0M-22 20H22M-16 39H16M-20 20 0 0 20 20M-16 39 0 20 16 39M-12 58 0 39 12 58" fill="none" stroke="#587469" strokeWidth="2"/><text x="0" y="76" textAnchor="middle">GRID</text></g>
    </Layer>

    <Layer visible={stage === 5} className="fsq-handover">
      <g className="fsq-monitor" transform="translate(57 96)">
        <rect width="162" height="99" rx="4" fill="#ffffff" stroke="#96aa9e"/>
        <text x="17" y="23">SYSTEM OVERVIEW</text>
        <path d="M17 71C36 67 40 45 58 49S77 75 94 60 110 32 145 35" fill="none" stroke="#2c8052" strokeWidth="2.5"/>
        <path d="M17 79H145M17 35V79" fill="none" stroke="#cad7ce" strokeWidth="1"/>
        <circle cx="145" cy="35" r="4" fill="#ef8b45"/><circle className="fsq-data-pulse" cx="145" cy="35" r="10" fill="#ef8b45" opacity=".13"/>
        <text x="17" y="92">GENERATION / USE / EXPORT</text>
      </g>
      <g className="fsq-complete-badge" transform="translate(744 104)"><circle r="34" fill="#e1f3d5" stroke="#4c8761"/><path d="m-13 1 9 10 19-23" fill="none" stroke="#267047" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><text x="0" y="54" textAnchor="middle">TESTED</text></g>
      <path className="fsq-handover-route" d="M661 455C667 385 697 305 734 232S778 164 786 139" fill="none" stroke="#ef8b45" strokeWidth="2" strokeDasharray="4 7" markerEnd={`url(#${id}-arrow)`}/>
    </Layer>

    <g className="fsq-marker" transform={`translate(${current.marker[0]} ${current.marker[1]})`} aria-hidden="true"><circle className="fsq-marker-ring" r="18"/><circle r="5" fill="#ef8a45"/><circle r="2" fill="#fff8ef"/></g>
    <g className="fsq-drawing-meta fsq-callout" aria-hidden="true"><path d="M52 522H99M52 522V542" fill="none" stroke="#718a7f" strokeWidth=".8"/><text x="52" y="510">{current.callout}</text><text x="52" y="557">0{stage + 1} / 06</text></g>
    <g className="fsq-north" aria-hidden="true"><path d="M856 518V482M849 491 856 478 863 491"/><text x="856" y="535" textAnchor="middle">N</text></g>
  </svg>;
}

export default function SolarInstallationSequence() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const id = `fennor-solar-sequence-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const current = stages[stage];
  const activePlayback = playing && inViewport && pageVisible && !reducedMotion;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    updateMotion();
    preference.addEventListener('change', updateMotion);

    const section = sectionRef.current;
    const observer = section ? new IntersectionObserver(([entry]) => {
      setInViewport(entry.isIntersecting);
      if (entry.isIntersecting && !startedRef.current && !preference.matches) {
        startedRef.current = true;
        setPlaying(true);
      }
    }, { threshold: 0.16 }) : null;
    if (section && observer) observer.observe(section);

    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      preference.removeEventListener('change', updateMotion);
      observer?.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!activePlayback) return;
    const timer = window.setTimeout(() => {
      if (stage < stages.length - 1) setStage(value => value + 1);
      else setPlaying(false);
    }, 4400);
    return () => window.clearTimeout(timer);
  }, [activePlayback, stage]);

  const chooseStage = (index: number) => {
    startedRef.current = true;
    setStage(index);
    setPlaying(false);
  };

  const togglePlayback = () => {
    startedRef.current = true;
    if (playing) {
      setPlaying(false);
      return;
    }
    if (stage === stages.length - 1) setStage(0);
    setPlaying(true);
  };

  const replay = () => {
    startedRef.current = true;
    setStage(0);
    setPlaying(!reducedMotion);
  };

  const onStageKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % stages.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + stages.length - 1) % stages.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = stages.length - 1;
    else return;
    event.preventDefault();
    chooseStage(next);
    controlsRef.current?.querySelectorAll('button')[next]?.focus();
  };

  return <section ref={sectionRef} className="fennor-solar-sequence" id="installation" data-stage={stage} data-playing={activePlayback} data-reduced-motion={reducedMotion} aria-labelledby={`${id}-heading`}>
    <div className="fsq-intro">
      <p className="fsq-overline"><i aria-hidden="true"/> FROM ROOF TO HANDOVER</p>
      <h2 id={`${id}-heading`}>See how your solar<br/><em>system takes shape.</em></h2>
      <p>Move through a clear, illustrative installation journey. Your roof, electrical system and agreed design determine the actual details and order.</p>
    </div>
    <div className="fsq-layout">
      <div className="fsq-scene">
        <div className="fsq-toolbar">
          <span className="fsq-overline"><i aria-hidden="true"/> A SOLAR SYSTEM, LAYER BY LAYER</span>
          <div className="fsq-playback">
            <button type="button" onClick={togglePlayback} disabled={reducedMotion} aria-label={playing ? 'Pause solar installation sequence' : stage === stages.length - 1 ? 'Replay solar installation sequence' : 'Play solar installation sequence'} aria-describedby={reducedMotion ? `${id}-motion-note` : undefined}>
              <svg viewBox="0 0 20 20" aria-hidden="true">{playing ? <path d="M6 4V16M14 4V16" stroke="currentColor" strokeWidth="2.3"/> : <path d="M6 4 16 10 6 16Z" fill="currentColor"/>}</svg><span>{playing ? 'Pause' : stage === stages.length - 1 ? 'Replay' : 'Play'}</span>
            </button>
            <button type="button" onClick={replay} aria-label="Restart solar installation sequence from the roof assessment"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 7a6 6 0 1 1-.5 5M4 3v4h4" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></button>
          </div>
        </div>
        <SolarDrawing stage={stage} id={id}/>
        <div className="fsq-caption"><span className="fsq-count">0{stage + 1}<small>/ 06</small></span><div><strong>{current.note}</strong><span>{current.detail}</span></div><span className="fsq-progress" aria-hidden="true">{stages.map((item,index) => <i key={item.name} className={index === stage ? 'is-current' : index < stage ? 'is-complete' : ''}/>)}</span></div>
        <p className="fsq-footnote">Conceptual customer guide · Not a roof, structural or electrical design · Installation details are confirmed for your home</p>
        {reducedMotion && <p className="fsq-motion-note" id={`${id}-motion-note`}>Reduced motion is on. Select any stage to explore at your own pace.</p>}
      </div>
      <div className="fsq-content">
        <p className="fsq-overline">EXPLORE THE INSTALLATION</p>
        <div ref={controlsRef} className="fsq-stages" role="group" aria-label="Solar installation stages">{stages.map((item,index) => <button key={item.name} type="button" onClick={() => chooseStage(index)} onKeyDown={event => onStageKeyDown(event,index)} aria-pressed={stage === index} aria-controls={`${id}-explanation`}><span className="fsq-stage-number">0{index + 1}</span><span>{item.name}</span><span className="fsq-stage-symbol" aria-hidden="true">{stage === index ? '−' : '+'}</span></button>)}</div>
        <div id={`${id}-explanation`} className="fsq-explanation" aria-live={playing ? 'off' : 'polite'} aria-atomic="true"><p className="fsq-overline">{current.tag}</p><h3>{current.title}</h3><p>{current.text}</p><span className="fsq-detail"><i aria-hidden="true"/>{current.detail}</span></div>
        {stage === stages.length - 1 && <div className="fsq-finish"><span>THE SYSTEM IS READY TO MAKE YOUR OWN</span><p>Now explore a starting panel count and see where a battery, EDDI or EV charger could fit into the conversation.</p><a href="#design">Build your starting system <b aria-hidden="true">↓</b></a></div>}
      </div>
    </div>
  </section>;
}
