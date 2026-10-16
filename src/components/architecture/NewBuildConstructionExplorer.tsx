"use client";

import {useId, useRef, useState, type KeyboardEvent} from "react";
import {FennorBlockworkSequence} from "./FennorBlockworkSequence";
import {FennorIcfSequence} from "./FennorIcfBuild";
import "./fennor-build-sequence.css";

type BuildMethod = "blockwork" | "icf";

const methods: {id: BuildMethod; label: string}[] = [
  {id: "blockwork", label: "Traditional blockwork"},
  {id: "icf", label: "Insulated concrete formwork"},
];

export function NewBuildConstructionExplorer() {
  const [method, setMethod] = useState<BuildMethod>("blockwork");
  const tabs = useRef<HTMLDivElement>(null);
  const baseId = `fn-construction-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const changeMethod = (next: BuildMethod) => setMethod(next);

  const navigateTabs = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % methods.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + methods.length - 1) % methods.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = methods.length - 1;
    else return;
    event.preventDefault();
    changeMethod(methods[next].id);
    tabs.current?.querySelectorAll("button")[next]?.focus();
  };

  return (
    <section className="rb-shell fn-build-explorer" aria-labelledby={`${baseId}-title`}>
      <div className="fn-build-explorer__heading">
        <div>
          <p className="rb-overline">SEE HOW THE STRUCTURE COMES TOGETHER</p>
          <h2 id={`${baseId}-title`}>From the first line on site<br/><em>to a finished home.</em></h2>
        </div>
        <p>Explore two common construction approaches stage by stage. The drawings help you understand the questions, checks and hand-offs behind the visible work; the method and details for your home are established by its appointed design team and project specification.</p>
      </div>

      <div ref={tabs} className="fn-build-explorer__switcher" role="tablist" aria-label="Choose a construction method">
        {methods.map((item, index) => (
          <button
            key={item.id}
            id={`${baseId}-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={method === item.id}
            aria-controls={`${baseId}-panel`}
            tabIndex={method === item.id ? 0 : -1}
            onClick={() => changeMethod(item.id)}
            onKeyDown={(event) => navigateTabs(event, index)}
          >
            {String(index + 1).padStart(2, "0")} / {item.label}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        className="fn-build-explorer__panel"
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${method}`}
      >
        {method === "blockwork" ? <FennorBlockworkSequence/> : <FennorIcfSequence/>}
      </div>

      <p className="fn-build-explorer__note">Conceptual learning tool only. It does not replace the drawings, specifications, structural design, safety planning, inspections or competent professional advice required for an individual project.</p>
    </section>
  );
}
