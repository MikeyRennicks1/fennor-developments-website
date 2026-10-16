"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

type Point = [number, number, number];
type Palette = { top: string; front: string; side: string };

const stages = [
  { name: "Groundwork", title: "A good home starts below ground.", text: "Setting out, foundations and the ground floor establish the footprint of your home. Levels, drainage routes and service entries are considered before the structure rises.", detail: "Setting out · foundations · floor slab", tag: "THE FOUNDATION", note: "Levels, layout and service routes", marker: [198, 402], callout: "FOUNDATION & FLOOR" },
  { name: "Structure", title: "Give the plan its shape.", text: "The walls rise, openings take their place and the rooms become real. Structural details and the interfaces between materials guide each stage of the build.", detail: "Wall construction · openings · lintels", tag: "THE STRUCTURE", note: "Structure and openings take shape", marker: [390, 343], callout: "WALLS & OPENINGS" },
  { name: "Roof", title: "Every connection counts.", text: "Roof framing connects the structure above. The roof form, supports and junctions are coordinated before the external finishes complete the enclosure.", detail: "Roof structure · bracing · junctions", tag: "THE ROOFLINE", note: "A coordinated roof structure", marker: [490, 158], callout: "ROOF STRUCTURE" },
  { name: "Envelope", title: "Bring every layer together.", text: "Roof coverings, external finishes, windows and doors create the building’s envelope. Care at the junctions brings the design together from the outside in.", detail: "Roof finish · glazing · exterior", tag: "THE ENVELOPE", note: "The shell becomes a home", marker: [607, 289], callout: "GLAZING & EXTERIOR" },
  { name: "Finished", title: "The details make it yours.", text: "From the entrance to the final finishes, the last stage gives the home its character. The agreed inspections, completion details and handover bring the project to a close.", detail: "Finishing details · inspection · handover", tag: "THE FINISH", note: "Considered, down to the last detail", marker: [391, 409], callout: "FINISHES & HANDOVER" },
];

const W = 350;
const D = 184;
const H = 118;
const R = 64;
const bronze = "#96754c";
const p = ([x, y, z]: Point) => [365 + (x - z) * 0.866, 426 - y - (x + z) * 0.42];
const points = (value: Point[]) => value.map((point) => p(point).map((n) => n.toFixed(2)).join(",")).join(" ");

function Face({ at, fill, stroke = "#696357", width = 0.65, opacity = 1 }: { at: Point[]; fill: string; stroke?: string; width?: number; opacity?: number }) {
  return <polygon points={points(at)} fill={fill} stroke={stroke} strokeWidth={width} strokeLinejoin="round" opacity={opacity} />;
}

function Line({ from, to, color = bronze, width = 1, dash }: { from: Point; to: Point; color?: string; width?: number; dash?: string }) {
  const [x1, y1] = p(from), [x2, y2] = p(to);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round" />;
}

function Box({ x, y, z, w, h, d, fill, stroke = "#746d5f" }: { x: number; y: number; z: number; w: number; h: number; d: number; fill: Palette; stroke?: string }) {
  return <g>
    <Face fill={fill.side} stroke={stroke} at={[[x, y, z], [x, y, z + d], [x, y + h, z + d], [x, y + h, z]]} />
    <Face fill={fill.front} stroke={stroke} at={[[x, y, z], [x + w, y, z], [x + w, y + h, z], [x, y + h, z]]} />
    <Face fill={fill.top} stroke={stroke} at={[[x, y + h, z], [x + w, y + h, z], [x + w, y + h, z + d], [x, y + h, z + d]]} />
  </g>;
}

function Layer({ visible, className = "", children }: { visible: boolean; className?: string; children: ReactNode }) {
  return <g className={`fn-build-layer ${className}`} data-visible={visible} aria-hidden={!visible}>{children}</g>;
}

const wall = { top: "#d9d0be", front: "#b5aa94", side: "#a79b85" };
const slab = { top: "#ddd7c9", front: "#b7ae9c", side: "#9d9380" };
const timber = { top: "#d2b183", front: "#b59162", side: "#927143" };
const opening = [{ x: 65, w: 44, y: 0, h: 96 }, { x: 176, w: 138, y: 15, h: 78 }];
type Opening = { x: number; w: number; y: number; h: number };
function makeBlocks(length: number, blockWidth: number, openings: Opening[]) {
  return Array.from({ length: 8 }, (_, row) => {
    const blocks: { x: number; w: number; y: number; h: number; row: number }[] = [];
    for (let x = row % 2 ? -blockWidth / 2 : 0; x < length; x += blockWidth) {
      const left = Math.max(0, x), right = Math.min(length, x + blockWidth - 1.1);
      let parts = [{ x: left, w: right - left, y: row * 14.8, h: 13.6, row }];
      for (const opening of openings) {
        parts = parts.flatMap((block) => {
          const bx = block.x + block.w, by = block.y + block.h;
          const ox = opening.x + opening.w, oy = opening.y + opening.h;
          if (bx <= opening.x || block.x >= ox || by <= opening.y || block.y >= oy) return [block];
          const overlapLeft = Math.max(block.x, opening.x), overlapRight = Math.min(bx, ox);
          return [
            { ...block, w: Math.max(0, opening.x - block.x) },
            { ...block, x: ox, w: Math.max(0, bx - ox) },
            { ...block, x: overlapLeft, w: overlapRight - overlapLeft, h: Math.max(0, opening.y - block.y) },
            { ...block, x: overlapLeft, w: overlapRight - overlapLeft, y: oy, h: Math.max(0, by - oy) },
          ].filter((piece) => piece.w > .6 && piece.h > .6);
        });
      }
      blocks.push(...parts);
    }
    return blocks;
  }).flat();
}
const courses = makeBlocks(W, 43.8, opening);
const sideCourses = makeBlocks(D, 36.8, [{ x: 52, w: 89, y: 24, h: 70 }]);

function WallSkin({ glass }: { glass: string }) {
  return <>
    <Face fill="#eee9df" at={[[0, 0, -0.8], [65, 0, -0.8], [65, H, -0.8], [0, H, -0.8]]} />
    <Face fill="#eee9df" at={[[109, 0, -0.8], [176, 0, -0.8], [176, H, -0.8], [109, H, -0.8]]} />
    <Face fill="#eee9df" at={[[314, 0, -0.8], [W, 0, -0.8], [W, H, -0.8], [314, H, -0.8]]} />
    <Face fill="#e7e1d5" at={[[65, 96, -0.8], [109, 96, -0.8], [109, H, -0.8], [65, H, -0.8]]} />
    <Face fill="#eee9df" at={[[176, 0, -0.8], [314, 0, -0.8], [314, 15, -0.8], [176, 15, -0.8]]} />
    <Face fill="#eee9df" at={[[176, 93, -0.8], [314, 93, -0.8], [314, H, -0.8], [176, H, -0.8]]} />
    <Face fill="#d4cdc0" at={[[-0.8, 0, 0], [-0.8, 0, D], [-0.8, H, D], [-0.8, H, 0]]} />
    <Face fill="#d4cdc0" at={[[-0.8, H, 0], [-0.8, H + R, D / 2], [-0.8, H, D]]} />
    <Face fill="#353b38" at={[[64, 0, -1.8], [110, 0, -1.8], [110, 97, -1.8], [64, 97, -1.8]]} />
    <Face fill="#55564c" at={[[69, 3, -2], [105, 3, -2], [105, 92, -2], [69, 92, -2]]} />
    <Line from={[100, 40, -3]} to={[100, 56, -3]} color="#d0b38b" width={2} />
    <Face fill="#343e3c" at={[[174, 13, -1.8], [316, 13, -1.8], [316, 95, -1.8], [174, 95, -1.8]]} />
    <Face fill={glass} at={[[179, 18, -2], [311, 18, -2], [311, 90, -2], [179, 90, -2]]} />
    <Line from={[223, 15, -3]} to={[223, 94, -3]} color="#404a46" width={3} />
    <Line from={[267, 15, -3]} to={[267, 94, -3]} color="#404a46" width={3} />
    <Line from={[181, 78, -3]} to={[211, 78, -3]} color="#ffffff" width={1.1} />
    <Line from={[273, 34, -3]} to={[304, 34, -3]} color="#ffffff" width={1.1} />
    <Face fill="#3f4842" at={[[-1.8, 24, 52], [-1.8, 24, 141], [-1.8, 94, 141], [-1.8, 94, 52]]} />
    <Face fill={glass} at={[[-2, 29, 57], [-2, 29, 136], [-2, 89, 136], [-2, 89, 57]]} />
    <Line from={[-3, 26, 97]} to={[-3, 93, 97]} color="#404a46" width={3} />
    <Line from={[-3, 38, 62]} to={[-3, 38, 91]} color="#fff" width={1} />
    <Box x={-6} y={20} z={49} w={6} h={4} d={97} fill={{ top: "#f1ece2", front: "#bfb7a7", side: "#beb8a9" }} />
    <Box x={172} y={10} z={-6} w={147} h={3} d={7} fill={{ top: "#f1ece2", front: "#bfb7a7", side: "#beb8a9" }} />
  </>;
}

function Tree({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  const [cx, cy] = p([x, -17, z]);
  return <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
    <ellipse cy="3" rx="29" ry="11" fill="#7f876b" opacity=".15" />
    <path d="M0 0V-58M0-22 13-42M0-31-12-49" fill="none" stroke="#74654f" strokeWidth="2.5" />
    <ellipse cx="-10" cy="-61" rx="19" ry="25" fill="#858b6d" />
    <ellipse cx="10" cy="-66" rx="20" ry="28" fill="#8d9374" />
    <ellipse cx="0" cy="-81" rx="17" ry="21" fill="#a0a387" />
    <path d="M0-29V-79M0-47 13-65M0-58-11-73" fill="none" stroke="#6c735b" strokeWidth="1" opacity=".6" />
  </g>;
}

function Architecture({ stage, id }: { stage: number; id: string }) {
  const fill = (name: string) => `url(#${id}-${name})`;
  const step = stages[stage];
  return <svg className="fn-build-drawing" viewBox="0 0 860 560" role="img" aria-labelledby={`${id}-drawing-title ${id}-drawing-description`}>
    <title id={`${id}-drawing-title`}>{`${step.name}: an illustrative house under construction`}</title>
    <desc id={`${id}-drawing-description`}>{`${step.detail}. Explore five stages from the foundations to the finished home. This conceptual illustration is not a construction drawing.`}</desc>
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9da99f" /><stop offset=".5" stopColor="#d7dbcc" /><stop offset="1" stopColor="#adb7a7" /></linearGradient>
      <linearGradient id={`${id}-roof`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#545851" /><stop offset="1" stopColor="#292f2c" /></linearGradient>
      <linearGradient id={`${id}-glow`}><stop stopColor="#dbb77b" stopOpacity=".13" /><stop offset="1" stopColor="#f4e0ad" stopOpacity=".6" /></linearGradient>
      <pattern id={`${id}-grid`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#8e8674" strokeWidth=".65" opacity=".12" /></pattern>
      <pattern id={`${id}-soil`} width="9" height="7" patternUnits="userSpaceOnUse"><rect width="9" height="7" fill="#b7aa8e" /><path d="M1 3H3M6 6H8" stroke="#8d8068" strokeWidth=".7" /></pattern>
    </defs>
    <rect width="860" height="560" fill={fill("grid")} />
    <g className="fn-build-drawing-meta" aria-hidden="true"><path d="M28 28H58M28 28V58M832 28H802M832 28V58M28 532H58M28 532V502M832 532H802M832 532V502" fill="none" stroke="#b1a590" strokeWidth=".7" /><text x="45" y="53">FENNOR / BUILD STUDY 01</text><text x="815" y="53" textAnchor="end">AXONOMETRIC VIEW</text></g>
    <ellipse cx="439" cy="409" rx="253" ry="61" fill="#857b65" opacity=".1" />
    <Face fill="#e3e0d1" stroke="#b9b3a2" at={[[-68, -22, -65], [W + 67, -22, -65], [W + 67, -22, D + 52], [-68, -22, D + 52]]} />
    <Face fill={fill("soil")} at={[[-68, -22, -65], [W + 67, -22, -65], [W + 67, -29, -65], [-68, -29, -65]]} />
    <Face fill="#a99e86" at={[[-68, -22, -65], [-68, -22, D + 52], [-68, -29, D + 52], [-68, -29, -65]]} />
    <g className="fn-build-site-lines" opacity={stage === 4 ? 0.15 : 0.65}>
      {[-35, D + 20].map((z) => <Line key={`set-z-${z}`} from={[-45, -20, z]} to={[W + 40, -20, z]} color="#9c8a6b" width={0.8} dash="4 5" />)}
      {[-22, W + 22].map((x) => <Line key={`set-x-${x}`} from={[x, -20, -48]} to={[x, -20, D + 35]} color="#9c8a6b" width={0.8} dash="4 5" />)}
    </g>
    <Layer visible={stage === 4} className="fn-build-landscape-back">
      <Tree x={-37} z={D + 24} scale={1.05} />
      <Tree x={W + 33} z={D - 2} scale={1.18} />
      <Tree x={W + 58} z={110} scale={0.75} />
    </Layer>
    <Box x={-10} y={-18} z={-10} w={W + 20} h={12} d={D + 20} fill={{ top: "#ac9e82", front: "#9a8b70", side: "#8b7d63" }} />
    <Box x={-5} y={-6} z={-5} w={W + 10} h={6} d={D + 10} fill={slab} />
    <g className="fn-build-slab-detail" opacity={stage === 0 ? 1 : 0.15}>
      {Array.from({ length: 10 }, (_, i) => <Line key={`slab-x-${i}`} from={[12 + i * 35, 0.4, 10]} to={[12 + i * 35, 0.4, D - 10]} color="#a79b83" width={0.6} />)}
      {Array.from({ length: 6 }, (_, i) => <Line key={`slab-z-${i}`} from={[10, 0.4, 12 + i * 30]} to={[W - 10, 0.4, 12 + i * 30]} color="#a79b83" width={0.6} />)}
      <Line from={[140, 0.5, 10]} to={[140, 0.5, D - 10]} color="#6d786f" width={2} />
      <Line from={[140, 0.5, 114]} to={[W - 10, 0.5, 114]} color="#6d786f" width={2} />
      <Box x={29} y={0} z={149} w={9} h={17} d={9} fill={{ top: "#5c6559", front: "#737e6b", side: "#5b6554" }} />
      <Box x={310} y={0} z={150} w={8} h={11} d={8} fill={{ top: "#9a7d51", front: "#b29870", side: "#92754c" }} />
    </g>
    <Layer visible={stage >= 1}>
      <Box x={0} y={0} z={D - 12} w={W} h={H} d={12} fill={{ top: "#d8d0bd", front: "#ccc4b1", side: "#a79b85" }} />
      <Box x={W - 12} y={0} z={12} w={12} h={H} d={D - 24} fill={{ top: "#d8d0bd", front: "#b6ad99", side: "#ccc4b1" }} />
      <Face fill="#e3dbcb" at={[[13, 0.5, 13], [W - 13, 0.5, 13], [W - 13, 0.5, D - 13], [13, 0.5, D - 13]]} />
      <Box x={139} y={0} z={14} w={8} h={72} d={D - 28} fill={{ top: "#e2dac8", front: "#c8bdab", side: "#c2b7a2" }} />
      <Box x={147} y={0} z={111} w={W - 160} h={72} d={8} fill={{ top: "#e2dac8", front: "#c8bdab", side: "#c2b7a2" }} />
      {sideCourses.map((block, i) => <g key={`side-block-${i}`} className="fn-build-course" style={{ "--course-delay": `${block.row * 65}ms` } as CSSProperties}><Box x={0} y={block.y} z={block.x} w={12} h={block.h} d={block.w} fill={wall} /></g>)}
      {courses.map((block, i) => <g key={`block-${i}`} className="fn-build-course" style={{ "--course-delay": `${block.row * 65}ms` } as CSSProperties}><Box x={block.x} y={block.y} z={0} w={block.w} h={block.h} d={12} fill={wall} /></g>)}
      <Box x={-0.3} y={94} z={45} w={13} h={7} d={103} fill={{ top: "#d2cdbf", front: "#8e9185", side: "#73786e" }} />
      {opening.map((o) => <Box key={`lintel-${o.x}`} x={o.x - 7} y={o.y + o.h} z={-0.3} w={o.w + 14} h={7} d={13} fill={{ top: "#d2cdbf", front: "#8e9185", side: "#73786e" }} />)}
      <Box x={0} y={H} z={0} w={W} h={4} d={12} fill={timber} />
      <Box x={0} y={H} z={D - 12} w={W} h={4} d={12} fill={timber} />
    </Layer>
    <Layer visible={stage === 2} className="fn-build-roof-frame">
      {Array.from({ length: 10 }, (_, i) => {
        const x = i * W / 9;
        return <g key={`truss-${i}`} className="fn-build-truss" style={{ "--truss-delay": `${i * 65}ms` } as CSSProperties}>
          <Line from={[x, H + 4, 0]} to={[x, H + 4, D]} color="#a78659" width={3.5} />
          <Line from={[x, H + 4, -7]} to={[x, H + R + 4, D / 2]} color="#b38d5c" width={4.6} />
          <Line from={[x, H + R + 4, D / 2]} to={[x, H + 4, D + 7]} color="#b38d5c" width={4.6} />
          <Line from={[x, H + 4, D / 2]} to={[x, H + R + 4, D / 2]} color="#c5a475" width={2.3} />
          <Line from={[x, H + 4, D * .25]} to={[x, H + R / 2 + 4, D * .75]} color="#bfa071" width={2} />
          <Line from={[x, H + 4, D * .75]} to={[x, H + R / 2 + 4, D * .25]} color="#bfa071" width={2} />
        </g>;
      })}
      <Line from={[-6, H + R + 4, D / 2]} to={[W + 6, H + R + 4, D / 2]} color="#8c704b" width={3.5} />
      {[D * .25, D * .75].map((z) => <Line key={z} from={[-5, H + R / 2 + 5, z]} to={[W + 5, H + R / 2 + 5, z]} color="#c8aa7b" width={2.5} />)}
    </Layer>
    <Layer visible={stage >= 3} className="fn-build-envelope">
      <WallSkin glass={fill("glass")} />
      <Face fill="#434a43" at={[[-9, H + 2, D + 9], [W + 9, H + 2, D + 9], [W + 9, H + R + 8, D / 2], [-9, H + R + 8, D / 2]]} />
      <Face fill={fill("roof")} at={[[-9, H + 2, -9], [W + 9, H + 2, -9], [W + 9, H + R + 8, D / 2], [-9, H + R + 8, D / 2]]} />
      {Array.from({ length: 19 }, (_, i) => <Line key={`seam-${i}`} from={[i * 19.3 - 9, H + 3, -9]} to={[i * 19.3 - 9, H + R + 9, D / 2]} color="#777970" width={0.85} />)}
      <Line from={[-10, H + R + 8, D / 2]} to={[W + 10, H + R + 8, D / 2]} color="#6e7167" width={3.5} />
      <Line from={[-10, H + 1, -9]} to={[W + 10, H + 1, -9]} color="#2e3630" width={4} />
      <Line from={[-10, H + 1, -9]} to={[-10, H + R + 8, D / 2]} color="#394138" width={3.5} />
      <Line from={[W - 5, H, -5]} to={[W - 5, 3, -5]} color="#515a4d" width={2.6} />
    </Layer>
    <Layer visible={stage === 4} className="fn-build-finish">
      <Face fill={fill("glow")} stroke="none" at={[[179, 18, -3.5], [311, 18, -3.5], [311, 90, -3.5], [179, 90, -3.5]]} />
      <Box x={45} y={-17} z={-51} w={86} h={7} d={42} fill={{ top: "#cbc1ad", front: "#ada18a", side: "#b8ad97" }} />
      <Box x={52} y={-10} z={-33} w={72} h={6} d={25} fill={{ top: "#e1d7c3", front: "#b6a78e", side: "#c0b299" }} />
      <Box x={59} y={-4} z={-17} w={59} h={4} d={18} fill={{ top: "#e8dfcd", front: "#c1b297", side: "#cbbba1" }} />
      {Array.from({ length: 11 }, (_, i) => <Box key={`slat-${i}`} x={117 + i * 4.1} y={4} z={-3} w={2.4} h={105} d={2} fill={{ top: "#c0a17a", front: "#9c7b52", side: "#846442" }} />)}
      <Box x={60} y={99} z={-19} w={108} h={4} d={23} fill={{ top: "#595e51", front: "#41483c", side: "#424a3d" }} />
      <Box x={189} y={-17} z={-37} w={134} h={7} d={22} fill={{ top: "#9c9e7d", front: "#838765", side: "#6f7658" }} />
      {Array.from({ length: 14 }, (_, i) => {
        const [cx, cy] = p([195 + i * 9.3, -8, -25]);
        return <g key={`grass-${i}`} stroke={i % 2 ? "#838866" : "#9c9b75"} strokeWidth="1.3" fill="none"><path d={`M${cx} ${cy}q-7-9-6-18M${cx} ${cy}q0-13 3-21M${cx} ${cy}q7-6 8-14`} /></g>;
      })}
      <Tree x={-39} z={-26} scale={0.73} />
      <Box x={-41} y={-15} z={82} w={22} h={11} d={54} fill={{ top: "#b59b71", front: "#8b7654", side: "#9a825c" }} />
      {[0, 1, 2, 3].map((i) => <Line key={`bench-${i}`} from={[-40 + i * 5, -3.5, 84]} to={[-40 + i * 5, -3.5, 134]} color="#8e7653" width={1} />)}
    </Layer>
    <g className="fn-build-dimensions" aria-hidden="true">
      <Line from={[0, -24, -76]} to={[W, -24, -76]} color="#9a8c72" width={.75} />
      <Line from={[0, -20, -71]} to={[0, -27, -81]} color="#9a8c72" width={.75} />
      <Line from={[W, -20, -71]} to={[W, -27, -81]} color="#9a8c72" width={.75} />
      <Line from={[-83, -24, 0]} to={[-83, -24, D]} color="#9a8c72" width={.75} />
      <Line from={[-78, -20, 0]} to={[-88, -27, 0]} color="#9a8c72" width={.75} />
      <Line from={[-78, -20, D]} to={[-88, -27, D]} color="#9a8c72" width={.75} />
      <text x="530" y="497" textAnchor="middle" transform="rotate(-25 530 497)">FORM FOLLOWS A CONSIDERED PLAN</text>
      <path d="M773 439V405M766 413 773 401 780 413" fill="none" stroke="#93846a" strokeWidth="1" /><text x="773" y="454" textAnchor="middle">N</text>
    </g>
    <g className="fn-build-marker" transform={`translate(${step.marker[0]} ${step.marker[1]})`} aria-hidden="true"><circle className="fn-build-marker-ring" r="17" /><circle r="5" fill="#9b7850" /><circle r="2" fill="#eee8dc" /></g>
    <g className="fn-build-drawing-meta fn-build-callout" aria-hidden="true"><path d="M48 109H89M48 109V129" fill="none" stroke="#a58c65" strokeWidth=".7" /><text x="48" y="99">{step.callout}</text><text x="48" y="143">0{stage + 1} / 05</text></g>
  </svg>;
}

export function FennorBlockworkSequence() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const id = `fn-build-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const step = stages[stage];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReducedMotion(preference.matches); if (preference.matches) setPlaying(false); };
    update();
    preference.addEventListener("change", update);
    const element = section.current;
    if (!element) return () => preference.removeEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting && !started.current && !preference.matches) { started.current = true; setPlaying(true); }
    }, { threshold: 0.12 });
    observer.observe(element);
    const onVisibility = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { preference.removeEventListener("change", update); observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion || !visible) return;
    const timer = window.setTimeout(() => {
      if (stage < stages.length - 1) setStage((value) => value + 1);
      else setPlaying(false);
    }, 4800);
    return () => window.clearTimeout(timer);
  }, [stage, playing, reducedMotion, visible]);

  const choose = (index: number) => { started.current = true; setStage(index); setPlaying(false); };
  const togglePlayback = () => {
    started.current = true;
    if (playing) { setPlaying(false); return; }
    if (stage === stages.length - 1) setStage(0);
    setPlaying(true);
  };
  const replay = () => { started.current = true; setStage(0); setPlaying(!reducedMotion); };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % stages.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + stages.length - 1) % stages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stages.length - 1;
    else return;
    event.preventDefault(); choose(next); controls.current?.querySelectorAll("button")[next]?.focus();
  };

  return <section ref={section} className="fn-build" data-stage={stage} data-playing={playing && visible} data-reduced-motion={reducedMotion} aria-label="Explore the stages of a Fennor blockwork build">
    <div className="fn-build-scene">
      <div className="fn-build-toolbar"><span className="fn-build-overline"><i aria-hidden="true" /> A HOME, LAYER BY LAYER</span><div className="fn-build-playback">
        <button type="button" onClick={togglePlayback} disabled={reducedMotion} aria-label={playing ? "Pause build sequence" : stage === 4 ? "Replay build sequence" : "Play build sequence"} aria-describedby={reducedMotion ? `${id}-motion-note` : undefined}><svg viewBox="0 0 20 20" aria-hidden="true">{playing ? <path d="M6 4V16M14 4V16" stroke="currentColor" strokeWidth="2.3" /> : <path d="M6 4 16 10 6 16Z" fill="currentColor" />}</svg><span>{playing ? "Pause" : stage === 4 ? "Replay" : "Play"}</span></button>
        <button type="button" onClick={replay} aria-label="Restart build sequence from groundwork"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 7a6 6 0 1 1-.5 5M4 3v4h4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></button>
      </div></div>
      <Architecture stage={stage} id={id} />
      <div className="fn-build-caption"><span className="fn-build-count">0{stage + 1}<small>/ 05</small></span><div><strong>{step.note}</strong><span>{step.detail}</span></div><span className="fn-build-progress" aria-hidden="true">{stages.map((item, index) => <i key={item.name} className={index === stage ? "is-current" : index < stage ? "is-complete" : ""} />)}</span></div>
      <p className="fn-build-footnote">An illustrative build sequence. Details and order depend on your project.</p>
      {reducedMotion && <p className="fn-build-motion-note" id={`${id}-motion-note`}>Reduced motion is on. Select a stage to explore at your own pace.</p>}
    </div>
    <div className="fn-build-content">
      <p className="fn-build-overline">EXPLORE THE BUILD</p>
      <div ref={controls} className="fn-build-stages" role="group" aria-label="Blockwork construction stages">{stages.map((item, index) => <button key={item.name} type="button" onClick={() => choose(index)} onKeyDown={(event) => onKeyDown(event, index)} aria-pressed={stage === index} aria-controls={`${id}-explanation`}><span className="fn-build-stage-number">0{index + 1}</span><span>{item.name}</span><span className="fn-build-stage-symbol" aria-hidden="true">{stage === index ? "−" : "+"}</span></button>)}</div>
      <div id={`${id}-explanation`} className="fn-build-explanation" aria-live={playing ? "off" : "polite"} aria-atomic="true"><p className="fn-build-overline">{step.tag}</p><h3>{step.title}</h3><p>{step.text}</p><span className="fn-build-detail"><i aria-hidden="true" />{step.detail}</span></div>
    </div>
  </section>;
}
