"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { FennorIcfScene } from "./FennorIcfScene";

const stages = [
  {
    name: "Foundation",
    tag: "01 / A PRECISE START",
    title: "Set out. Get the base right.",
    text: "The wall begins with a carefully prepared foundation. Setting out establishes the corners, wall lines and openings, giving the first course a level, considered starting point.",
    note: "The foundation sets the geometry.",
    detail: "Foundation and starter bars follow the structural design.",
    duration: 5000,
  },
  {
    name: "Forms",
    tag: "02 / BUILDING THE FORM",
    title: "Interlock. Course by course.",
    text: "Insulated forms stack in staggered courses, turning the plan into a wall. The corner returns and window opening take shape together, while internal ties hold the two insulation faces apart.",
    note: "Insulation becomes the permanent form.",
    detail: "The wall cavity is reserved for the structural core.",
    duration: 5500,
  },
  {
    name: "Steel",
    tag: "03 / THE STRUCTURAL LAYER",
    title: "Reinforce the connections.",
    text: "Horizontal and vertical reinforcement is positioned within the forms. The bars, laps and reinforcement around openings are designed for the loads and connections of the particular building.",
    note: "The reinforcement is revealed within.",
    detail: "Toggle “Show wall core” to compare the inner layers and outer face.",
    duration: 5500,
  },
  {
    name: "Bracing",
    tag: "04 / HOLDING THE LINE",
    title: "Align. Support. Check.",
    text: "Temporary supports help keep the wall upright and aligned. The window opening is supported, and the formwork, reinforcement and access arrangements are checked before the pour.",
    note: "Temporary support holds the wall in position.",
    detail: "Alignment and the specified details are checked before pouring.",
    duration: 5000,
  },
  {
    name: "Pour",
    tag: "05 / FORMING A SOLID CORE",
    title: "The core comes together.",
    text: "Concrete is placed into the cavity in a controlled sequence. The sectional view reveals the core filling around the reinforcement, while the insulated forms and temporary supports remain in position.",
    note: "Watch the concrete rise within the forms.",
    detail: "Placement and consolidation follow the specified system.",
    duration: 8000,
  },
  {
    name: "Finished",
    tag: "06 / A COMPLETE WALL ASSEMBLY",
    title: "Structure within. Finish beyond.",
    text: "After the concrete has gained the required strength, temporary supports are removed at the appropriate stage. The insulation remains, ready for the specified window details and internal and external finishes.",
    note: "A solid core, with insulation on either side.",
    detail: "Explore the core, then return to the finished exterior.",
    duration: 5000,
  },
];

export function FennorIcfSequence() {
  const id = `fn-icf-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cutawayOverride, setCutawayOverride] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const section = useRef<HTMLElement>(null);
  const stageControls = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const manuallySelected = useRef(false);
  const elapsed = useRef(0);
  const step = stages[stage];
  const cutaway = cutawayOverride ?? (stage === 2 || stage === 4);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        setPlaying(false);
        setProgress(1);
        manuallySelected.current = true;
      }
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) {
        setPlaying(false);
      } else if (!started.current && !preference.matches && !document.hidden) {
        started.current = true;
        setPlaying(true);
      }
    }, { threshold: 0.12 });
    if (section.current) observer.observe(section.current);
    const onVisibility = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing || !visible || reducedMotion) return;
    let frame = 0;
    let previous: number | null = null;
    let lastPaint = 0;
    const advance = (now: number) => {
      if (previous !== null) elapsed.current += Math.min(now - previous, 100);
      previous = now;
      // Only the pour needs frame updates; the other layers animate with CSS.
      if (stage === 4 && now - lastPaint >= 1000 / 30) {
        setProgress(Math.min(1, elapsed.current / step.duration));
        lastPaint = now;
      }
      if (elapsed.current >= step.duration) {
        elapsed.current = 0;
        if (stage === stages.length - 1) {
          setPlaying(false);
          setProgress(1);
        } else {
          setProgress(0);
          setCutawayOverride(null);
          setStage(stage + 1);
        }
        return;
      }
      frame = window.requestAnimationFrame(advance);
    };
    frame = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frame);
  }, [stage, step.duration, playing, visible, reducedMotion]);

  const choose = (index: number) => {
    started.current = true;
    manuallySelected.current = true;
    elapsed.current = 0;
    setPlaying(false);
    setProgress(1);
    setCutawayOverride(null);
    setStage(index);
  };

  const togglePlayback = () => {
    started.current = true;
    if (playing) {
      setPlaying(false);
      return;
    }
    if (stage === stages.length - 1) {
      elapsed.current = 0;
      setCutawayOverride(null);
      setStage(0);
      setProgress(0);
    } else if (manuallySelected.current) {
      elapsed.current = 0;
      setProgress(0);
    }
    manuallySelected.current = false;
    setPlaying(true);
  };

  const replay = () => {
    started.current = true;
    manuallySelected.current = false;
    elapsed.current = 0;
    setCutawayOverride(null);
    setStage(0);
    setProgress(reducedMotion ? 1 : 0);
    setPlaying(!reducedMotion);
  };

  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % stages.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + stages.length - 1) % stages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stages.length - 1;
    else return;
    event.preventDefault();
    choose(next);
    stageControls.current?.querySelectorAll("button")[next]?.focus();
  };

  return (
    <section ref={section} className="fn-icf-build" data-stage={stage} data-playing={playing && visible} data-reduced-motion={reducedMotion} aria-label="Explore the stages of an ICF wall">
      <figure className="fn-icf-figure">
        <div className="fn-icf-toolbar">
          <span className="fn-icf-overline"><i aria-hidden="true" /> A WALL, LAYER BY LAYER</span>
          <div className="fn-icf-playback">
            <button type="button" onClick={togglePlayback} disabled={reducedMotion} aria-label={playing ? "Pause ICF construction sequence" : stage === 5 ? "Replay ICF construction sequence" : "Play ICF construction sequence"} aria-describedby={reducedMotion ? `${id}-motion-note` : undefined}>
              <svg viewBox="0 0 20 20" aria-hidden="true">{playing ? <path d="M6 4V16M14 4V16" stroke="currentColor" strokeWidth="2.3" /> : <path d="M6 4 16 10 6 16Z" fill="currentColor" />}</svg>
              <span>{playing ? "Pause" : stage === 5 ? "Replay" : "Play"}</span>
            </button>
            <button className="fn-icf-replay" type="button" onClick={replay} aria-label="Restart ICF sequence from the foundation">
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 7a6 6 0 1 1-.5 5M4 3v4h4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          </div>
        </div>
        <div className="fn-icf-view-bar">
          <span className="fn-icf-view-label">ISOMETRIC CONSTRUCTION STUDY</span>
          <button type="button" className="fn-icf-cutaway" aria-pressed={cutaway} onClick={() => setCutawayOverride(!cutaway)} aria-controls={`${id}-drawing`}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m10 2 7 4-7 4-7-4 7-4ZM3 10l7 4 7-4M3 14l7 4 7-4" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
            <span>Show wall core</span><i aria-hidden="true" />
          </button>
        </div>
        <div className="fn-icf-scene-wrap" id={`${id}-drawing`}>
          <FennorIcfScene stage={stage} cutaway={cutaway} id={id} progress={progress} playing={playing && visible && !reducedMotion} />
        </div>
        <figcaption className="fn-icf-caption">
          <span className="fn-icf-count">0{stage + 1}<small>/ 06</small></span>
          <div><strong>{step.note}</strong><span>{cutaway ? "Core view · the wall’s inner layers are exposed." : "Select any stage to inspect the construction."}</span></div>
          <span className="fn-icf-progress" aria-hidden="true">{stages.map((item, index) => <i key={item.name} className={index === stage ? "is-current" : index < stage ? "is-complete" : ""} />)}</span>
        </figcaption>
        <div className="fn-icf-legend" aria-label="Drawing materials">
          <span><i className="fn-icf-material-forms" aria-hidden="true" />Insulated form</span>
          <span><i className="fn-icf-material-steel" aria-hidden="true" />Reinforcement</span>
          <span><i className="fn-icf-material-core" aria-hidden="true" />Concrete core</span>
        </div>
        <p className="fn-icf-footnote">Illustrative sequence. Details, dimensions and construction order follow the selected system and project design.</p>
        {reducedMotion && <p className="fn-icf-motion-note" id={`${id}-motion-note`}>Reduced motion is on. Select a stage to explore at your own pace.</p>}
      </figure>
      <div className="fn-icf-content">
        <p className="fn-icf-overline">EXPLORE THE CONSTRUCTION <span>01—06</span></p>
        <div ref={stageControls} className="fn-icf-stages" role="group" aria-label="ICF construction stages">
          {stages.map((item, index) => <button key={item.name} type="button" onClick={() => choose(index)} onKeyDown={(event) => navigate(event, index)} aria-pressed={stage === index} aria-controls={`${id}-explanation`}>
            <span className="fn-icf-stage-number">0{index + 1}</span><span className="fn-icf-stage-name">{item.name}</span><span className="fn-icf-stage-symbol" aria-hidden="true">{stage === index ? "−" : "+"}</span>
          </button>)}
        </div>
        <div id={`${id}-explanation`} className="fn-icf-explanation" aria-live={playing ? "off" : "polite"} aria-atomic="true">
          <p className="fn-icf-overline">{step.tag}</p>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
          <span className="fn-icf-detail"><i aria-hidden="true" />{step.detail}</span>
        </div>
      </div>
    </section>
  );
}
