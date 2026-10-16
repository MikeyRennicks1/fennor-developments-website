"use client";

import { type CSSProperties, type ReactNode } from "react";

type Point = [number, number, number];
type Palette = { top: string; front: string; side: string };
type Block = { x: number; y: number; w: number; h: number; row: number };
const W = 420;
const D = 205;
const H = 210;
const T = 36;
const E = 8;
const OPEN = { x: 176, w: 150, y: 60, h: 90 };
const BUCK = 8;
const CLEAR = {
  x: OPEN.x + BUCK,
  w: OPEN.w - BUCK * 2,
  y: OPEN.y + BUCK,
  h: OPEN.h - BUCK * 2,
};
const FINISH_PLANE = -1.5;
const FRAME_Z = 2.5;
const project = ([x, y, z]: Point) => [380 + (x - z) * .88, 548 - y - (x + z) * .37];
const points = (values: Point[]) => values.map(point => project(point).map(value => value.toFixed(2)).join(",")).join(" ");
const foam = { top: "#f6f1e4", front: "#e7e1d1", side: "#cec7b5" };
const foamBack = { top: "#eae5d8", front: "#d7d2c3", side: "#beb8a7" };
const steel = "#7b6954";
const timber = { top: "#d4b48b", front: "#b49368", side: "#96764f" };
const concrete = { top: "#a2a596", front: "#7f8479", side: "#666e64" };
const metal = { top: "#758073", front: "#535f53", side: "#3c4a3e" };

function Face({ at, fill, stroke = "#9b9585", width = .6, opacity = 1 }: { at: Point[]; fill: string; stroke?: string; width?: number; opacity?: number }) {
  return <polygon points={points(at)} fill={fill} stroke={stroke} strokeWidth={width} strokeLinejoin="round" opacity={opacity} />;
}
function Line({ from, to, color = steel, width = 1, dash, opacity }: { from: Point; to: Point; color?: string; width?: number; dash?: string; opacity?: number }) {
  const [x1, y1] = project(from), [x2, y2] = project(to);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round" opacity={opacity} />;
}
function Box({ x, y, z, w, h, d, fill, stroke }: { x: number; y: number; z: number; w: number; h: number; d: number; fill: Palette; stroke?: string }) {
  return <g>
    <Face fill={fill.side} stroke={stroke} at={[[x, y, z], [x, y, z + d], [x, y + h, z + d], [x, y + h, z]]} />
    <Face fill={fill.front} stroke={stroke} at={[[x, y, z], [x + w, y, z], [x + w, y + h, z], [x, y + h, z]]} />
    <Face fill={fill.top} stroke={stroke} at={[[x, y + h, z], [x + w, y + h, z], [x + w, y + h, z + d], [x, y + h, z + d]]} />
  </g>;
}
function Layer({ visible, children, className = "" }: { visible: boolean; children: ReactNode; className?: string }) {
  return <g className={`fn-icf-layer ${className}`} data-visible={visible}>{children}</g>;
}
function splitOpening(block: Block): Block[] {
  const right = block.x + block.w, top = block.y + block.h;
  const ox = OPEN.x, or = OPEN.x + OPEN.w, oy = OPEN.y, ot = OPEN.y + OPEN.h;
  if (right <= ox || block.x >= or || top <= oy || block.y >= ot) return [block];
  const left = Math.max(block.x, ox), end = Math.min(right, or);
  return [
    { ...block, w: ox - block.x },
    { ...block, x: or, w: right - or },
    { ...block, x: left, w: end - left, h: oy - block.y },
    { ...block, x: left, w: end - left, y: ot, h: top - ot },
  ].filter(piece => piece.w > .5 && piece.h > .5);
}
function makeCourses(length: number, opening: boolean) {
  const blocks: Block[] = [];
  for (let row = 0; row < 7; row++) {
    for (let x = row % 2 ? -35 : 0; x < length; x += 70) {
      const left = Math.max(0, x), right = Math.min(length, x + 69.3);
      const block = { x: left, y: row * 30, w: right - left, h: 29.3, row };
      blocks.push(...(opening ? splitOpening(block) : [block]));
    }
  }
  return blocks;
}
const frontCourses = makeCourses(W, true);
const returnCourses = makeCourses(D - T, false);
function FrontLeaf({ back = false, texture }: { back?: boolean; texture: string }) {
  const z = back ? T - E : 0;
  const palette = back ? foamBack : foam;
  return <g>
    {frontCourses.map((block, i) => <g key={i} className="fn-icf-module" style={{ "--module-delay": `${block.row * 65 + i % 6 * 12}ms` } as CSSProperties}>
      <Box x={block.x} y={block.y} z={z} w={block.w} h={block.h} d={E} fill={{ ...palette, front: texture }} />
      {!back && block.w > 30 && block.h > 15 && <Line from={[block.x + 16, block.y + 7, z - .3]} to={[block.x + 16, block.y + Math.min(23, block.h - 4), z - .3]} color="#c4bfaf" width={2} />}
    </g>)}
    {Array.from({ length: 34 }, (_, i) => <Box key={`tooth-${i}`} x={5 + i * 12.1} y={H-.7} z={z + 1.3} w={5.4} h={3} d={5.5} fill={palette} />)}
  </g>;
}
function ReturnLeaf({ back = false, texture }: { back?: boolean; texture: string }) {
  const x = back ? T - E : 0;
  const palette = back ? foamBack : foam;
  return <g>
    {returnCourses.map((block, i) => <g key={i} className="fn-icf-module" style={{ "--module-delay": `${block.row * 65 + i % 3 * 15}ms` } as CSSProperties}>
      <Box x={x} y={block.y} z={T + block.x} w={E} h={block.h} d={block.w} fill={{ ...palette, side: texture }} />
      {!back && block.w > 30 && <Line from={[x - .3, block.y + 7, T + block.x + 17]} to={[x - .3, block.y + 23, T + block.x + 17]} color="#bcb5a4" width={1.6} />}
    </g>)}
    {Array.from({ length: 14 }, (_, i) => <Box key={i} x={x + 1.3} y={H-.7} z={T + 4 + i * 12} w={5.5} h={3} d={5.4} fill={palette} />)}
  </g>;
}
function Core({ height, pattern }: { height: number; pattern: string }) {
  const regions = [{ x: 0, w: OPEN.x, y: 0, h: H }, { x: OPEN.x, w: OPEN.w, y: 0, h: OPEN.y }, { x: OPEN.x, w: OPEN.w, y: OPEN.y + OPEN.h, h: H - OPEN.y - OPEN.h }, { x: OPEN.x + OPEN.w, w: W - OPEN.x - OPEN.w, y: 0, h: H }];
  return <g>
    <Box x={E} y={0} z={T} w={T - E * 2} h={Math.max(0, height)} d={D - T} fill={{...concrete, side: pattern}} />
    {regions.filter(region => height > region.y).map((region, i) => <Box key={i} x={region.x} y={region.y} z={E} w={region.w} h={Math.min(region.h, height - region.y)} d={T - E * 2} fill={{...concrete, front: pattern}} />)}
  </g>;
}
function Webs() {
  return <g>
    {Array.from({ length: 7 }, (_, row) => Array.from({ length: 12 }, (_, col) => {
      const x = 17 + col * 35, y = row * 30 + 15;
      if (x > OPEN.x && x < OPEN.x + OPEN.w && y > OPEN.y && y < OPEN.y + OPEN.h) return null;
      return <g key={`${row}-${col}`}>
        <Box x={x} y={y} z={E} w={3} h={3} d={T - E * 2} fill={{top:"#8b8c7d",front:"#6f7568",side:"#596154"}} />
        <Line from={[x + 1.5, y - 5, E + 2]} to={[x + 1.5, y + 5, T - E - 2]} color="#77806f" width={1} />
      </g>;
    }))}
    {Array.from({ length: 7 }, (_, row) => Array.from({ length: 5 }, (_, col) => <Box key={`${row}-${col}`} x={E} y={row * 30 + 15} z={T + 17 + col * 33} w={T - E * 2} h={3} d={3} fill={{top:"#8b8c7d",front:"#6f7568",side:"#596154"}} />))}
  </g>;
}
function RibbedBar({ from, to, width = 2.5 }: { from: Point; to: Point; width?: number }) {
  return <g><Line from={from} to={to} color="#6e685b" width={width} /><Line from={from} to={to} color="#c4ac83" width={width * .47} dash="1 4" /></g>;
}
function Reinforcement({ height = H + 9, starters = false }: { height?: number; starters?: boolean }) {
  return <g>
    {[22, 68, 116, 161, 340, 386, 407].map(x => <RibbedBar key={x} from={[x, -3, T / 2]} to={[x, height, T / 2]} />)}
    {[210, 255, 300].map(x => <g key={x}><RibbedBar from={[x, -3, T / 2]} to={[x, Math.min(height, OPEN.y - 5), T / 2]} />{!starters && <RibbedBar from={[x, OPEN.y + OPEN.h + 5, T / 2]} to={[x, height, T / 2]} />}</g>)}
    {[65, 110, 155, 192].map(z => <RibbedBar key={z} from={[T / 2, -3, z]} to={[T / 2, height, z]} />)}
    {!starters && <>
      {[20, 50, 80, 110, 140, 170, 200].map(y => <g key={y}>
        <RibbedBar from={[T / 2, y, D - 6]} to={[T / 2, y, T / 2]} width={2.2} />
        {y > OPEN.y && y < OPEN.y + OPEN.h ? <><RibbedBar from={[T / 2, y, T / 2]} to={[OPEN.x - 7, y, T / 2]} width={2.2} /><RibbedBar from={[OPEN.x + OPEN.w + 7, y, T / 2]} to={[W - 6, y, T / 2]} width={2.2} /></> : <RibbedBar from={[T / 2, y, T / 2]} to={[W - 6, y, T / 2]} width={2.2} />}
      </g>)}
      {[OPEN.y - 10, OPEN.y + OPEN.h + 10].map(y => <RibbedBar key={y} from={[OPEN.x - 26, y, T / 2 + 4]} to={[OPEN.x + OPEN.w + 26, y, T / 2 + 4]} width={3} />)}
      {[OPEN.x - 10, OPEN.x + OPEN.w + 10].map(x => <RibbedBar key={x} from={[x, OPEN.y - 15, T / 2 + 4]} to={[x, OPEN.y + OPEN.h + 20, T / 2 + 4]} width={3} />)}
    </>}
  </g>;
}
function WindowBuck() {
  const clearRight = CLEAR.x + CLEAR.w;
  const clearTop = CLEAR.y + CLEAR.h;
  return <g>
    <Box x={OPEN.x} y={OPEN.y} z={0} w={BUCK} h={OPEN.h} d={T} fill={timber} />
    <Box x={OPEN.x + OPEN.w - BUCK} y={OPEN.y} z={0} w={BUCK} h={OPEN.h} d={T} fill={timber} />
    <Box x={CLEAR.x} y={OPEN.y} z={0} w={CLEAR.w} h={BUCK} d={T} fill={timber} />
    <Box x={CLEAR.x} y={OPEN.y + OPEN.h - BUCK} z={0} w={CLEAR.w} h={BUCK} d={T} fill={timber} />
    {/* Box only paints one side and the top. These four faces make every inner
        edge read as a continuous, full-depth timber reveal. */}
    <Face fill={timber.side} at={[[CLEAR.x,CLEAR.y,0],[CLEAR.x,CLEAR.y,T],[CLEAR.x,clearTop,T],[CLEAR.x,clearTop,0]]} />
    <Face fill={timber.side} at={[[clearRight,CLEAR.y,0],[clearRight,clearTop,0],[clearRight,clearTop,T],[clearRight,CLEAR.y,T]]} />
    <Face fill={timber.top} at={[[CLEAR.x,CLEAR.y,0],[clearRight,CLEAR.y,0],[clearRight,CLEAR.y,T],[CLEAR.x,CLEAR.y,T]]} />
    <Face fill={timber.front} at={[[CLEAR.x,clearTop,0],[CLEAR.x,clearTop,T],[clearRight,clearTop,T],[clearRight,clearTop,0]]} />
    {[OPEN.x+BUCK/2,OPEN.x+OPEN.w-BUCK/2].map(x => [OPEN.y+17,OPEN.y+OPEN.h-17].map(y => { const [cx,cy]=project([x,y,-.25]);return <circle key={`${x}-${y}`} cx={cx} cy={cy} r={1.1} fill="#6f604a"/>; }))}
  </g>;
}
function Bracing({ showOpeningBrace }: { showOpeningBrace: boolean }) {
  return <g>
    {[62, 144, 370].map(x => {
      const [cx,cy] = project([x, 72, -42]);
      return <g key={x}>
        <Box x={x-7} y={-1} z={-85} w={16} h={3} d={17} fill={metal} />
        <Box x={x-3} y={0} z={-8} w={6} h={H+4} d={6} fill={metal} />
        {[38,88,138,188].map(y => <Box key={y} x={x-8} y={y} z={-5} w={16} h={4} d={6} fill={metal} />)}
        <Line from={[x, 5, -77]} to={[x, 155, -5]} color="#465747" width={5.7} />
        <Line from={[x, 58, -51]} to={[x, 98, -32]} color="#a5aa97" width={5.7} />
        <Line from={[x, 61, -49]} to={[x, 94, -34]} color="#5c6a57" width={1.2} dash="1 3" />
        <circle cx={cx} cy={cy} r={5} fill="none" stroke="#8b7958" strokeWidth={2} />
        <Line from={[x, 118, -8]} to={[x, 118, -66]} color="#5a6b58" width={4} />
        <Line from={[x, 65, -8]} to={[x, 118, -66]} color="#5a6b58" width={3} />
        <Box x={x-2} y={116} z={-66} w={4} h={70} d={4} fill={metal} />
      </g>;
    })}
    {[0,1,2].map(i => <Box key={i} x={35} y={118} z={-65+i*16} w={370} h={3.5} d={15} fill={timber} />)}
    <Box x={35} y={123} z={-66} w={370} h={10} d={2} fill={{top:"#c9af84",front:"#b39970",side:"#8b7352"}} />
    <Line from={[58,185,-64]} to={[374,185,-64]} color="#66775f" width={3.2} />
    <Line from={[58,153,-64]} to={[374,153,-64]} color="#66775f" width={2.5} />
    {showOpeningBrace && <>
      <Box x={OPEN.x+OPEN.w/2-3} y={OPEN.y+5} z={-12} w={6} h={OPEN.h-10} d={4} fill={timber} />
      <Line from={[OPEN.x+7,OPEN.y+6,-12.5]} to={[OPEN.x+OPEN.w-7,OPEN.y+OPEN.h-6,-12.5]} color="#a88d63" width={4} />
    </>}
  </g>;
}
function FinishedWindow({ glass }: { glass: string }) {
  const clearRight = CLEAR.x + CLEAR.w;
  const clearTop = CLEAR.y + CLEAR.h;
  const frameInset = 2;
  const rail = 6;
  const frameDepth = 5.5;
  const frame = {
    x: CLEAR.x + frameInset,
    y: CLEAR.y + frameInset,
    w: CLEAR.w - frameInset * 2,
    h: CLEAR.h - frameInset * 2,
  };
  const frameRight = frame.x + frame.w;
  const frameTop = frame.y + frame.h;
  const glassZ = FRAME_Z + 1.7;
  const windowFrame = { top:"#59645a", front:"#39473c", side:"#28362e" };
  const revealLight = "#ded7c9";
  const revealShade = "#c6bdad";

  return <g className="fn-icf-finished-window">
    {/* Rendered returns lead from the facade back to the installed frame. */}
    <Face fill={revealShade} at={[[CLEAR.x,CLEAR.y,FINISH_PLANE],[CLEAR.x,CLEAR.y,FRAME_Z],[CLEAR.x,clearTop,FRAME_Z],[CLEAR.x,clearTop,FINISH_PLANE]]} />
    <Face fill={revealLight} at={[[clearRight,CLEAR.y,FINISH_PLANE],[clearRight,clearTop,FINISH_PLANE],[clearRight,clearTop,FRAME_Z],[clearRight,CLEAR.y,FRAME_Z]]} />
    <Face fill={revealLight} at={[[CLEAR.x,CLEAR.y,FINISH_PLANE],[clearRight,CLEAR.y,FINISH_PLANE],[clearRight,CLEAR.y,FRAME_Z],[CLEAR.x,CLEAR.y,FRAME_Z]]} />
    <Face fill={revealShade} at={[[CLEAR.x,clearTop,FINISH_PLANE],[CLEAR.x,clearTop,FRAME_Z],[clearRight,clearTop,FRAME_Z],[clearRight,clearTop,FINISH_PLANE]]} />
    <Face fill="#28362e" opacity={.28} at={[[CLEAR.x,CLEAR.y,FRAME_Z+.25],[clearRight,CLEAR.y,FRAME_Z+.25],[clearRight,clearTop,FRAME_Z+.25],[CLEAR.x,clearTop,FRAME_Z+.25]]} />

    {/* Glazing is painted before the rails and sits behind their front plane. */}
    <Face fill={glass} stroke="#8e9b8b" at={[[frame.x+rail,frame.y+rail,glassZ],[frameRight-rail,frame.y+rail,glassZ],[frameRight-rail,frameTop-rail,glassZ],[frame.x+rail,frameTop-rail,glassZ]]} />
    <Line from={[frame.x+rail+5,frameTop-16,glassZ-.15]} to={[frame.x+frame.w/2-7,frameTop-16,glassZ-.15]} color="#f1f0d8" width={1.1} />
    <Line from={[frame.x+frame.w/2+8,frame.y+17,glassZ-.15]} to={[frameRight-rail-5,frame.y+17,glassZ-.15]} color="#dce4d4" width={1.1} />
    <Box x={frame.x} y={frame.y} z={FRAME_Z} w={rail} h={frame.h} d={frameDepth} fill={windowFrame} />
    <Box x={frameRight-rail} y={frame.y} z={FRAME_Z} w={rail} h={frame.h} d={frameDepth} fill={windowFrame} />
    <Box x={frame.x+rail} y={frame.y} z={FRAME_Z} w={frame.w-rail*2} h={rail} d={frameDepth} fill={windowFrame} />
    <Box x={frame.x+rail} y={frameTop-rail} z={FRAME_Z} w={frame.w-rail*2} h={rail} d={frameDepth} fill={windowFrame} />
    <Box x={frame.x+frame.w/2-2} y={frame.y+rail} z={FRAME_Z-.15} w={4} h={frame.h-rail*2} d={frameDepth+.15} fill={windowFrame} />

    {/* A shallow exterior sill replaces the former member that ran through the wall. */}
    <Box x={frame.x-2} y={CLEAR.y-3} z={-2.25} w={frame.w+4} h={3} d={5.5} fill={{top:"#ede7d9",front:"#c5bdab",side:"#b0a58e"}} />
  </g>;
}
function Finished({ glass, render, cutaway }: { glass: string; render: string; cutaway: boolean }) {
  const finishW = cutaway ? 140 : 355;
  const clearRight = CLEAR.x + CLEAR.w;
  const clearTop = CLEAR.y + CLEAR.h;
  return <g>
    <Face fill={render} stroke="#c7c1b2" at={[[0,0,FINISH_PLANE],[Math.min(CLEAR.x,finishW),0,FINISH_PLANE],[Math.min(CLEAR.x,finishW),H,FINISH_PLANE],[0,H,FINISH_PLANE]]} />
    {!cutaway && <>
      <Face fill={render} at={[[CLEAR.x,0,FINISH_PLANE],[clearRight,0,FINISH_PLANE],[clearRight,CLEAR.y,FINISH_PLANE],[CLEAR.x,CLEAR.y,FINISH_PLANE]]} />
      <Face fill={render} at={[[CLEAR.x,clearTop,FINISH_PLANE],[clearRight,clearTop,FINISH_PLANE],[clearRight,H,FINISH_PLANE],[CLEAR.x,H,FINISH_PLANE]]} />
      <Face fill={render} at={[[clearRight,0,FINISH_PLANE],[355,0,FINISH_PLANE],[355,H,FINISH_PLANE],[clearRight,H,FINISH_PLANE]]} />
      <FinishedWindow glass={glass} />
    </>}
    <Face fill="#d4cdbe" at={[[-1.5,0,T],[-1.5,0,D],[-1.5,H,D],[-1.5,H,T]]} />
    <Box x={-2} y={H} z={-3} w={357} h={5} d={T+6} fill={{top:"#868b7c",front:"#5c6558",side:"#485445"}} />
    <Box x={-3} y={H} z={T} w={T+6} h={5} d={D-T+2} fill={{top:"#868b7c",front:"#5c6558",side:"#485445"}} />
    <Box x={-1} y={0} z={-2} w={356} h={11} d={3} fill={{top:"#ccc3b1",front:"#b3a893",side:"#978c75"}} />
    <Box x={86} y={-15} z={-94} w={110} h={12} d={30} fill={{top:"#959b79",front:"#7c8360",side:"#697654"}} />
    {Array.from({length:13},(_,i)=>{const [cx,cy]=project([92+i*8,-3,-78]);return <path key={i} d={`M${cx} ${cy}q-7-10-5-23M${cx} ${cy}q0-16 6-26M${cx} ${cy}q8-7 11-17`} fill="none" stroke={i%2?"#8b9272":"#a3a685"} strokeWidth={1.4}/>;})}
  </g>;
}
const annotations = [
  { label:"SET OUT · STARTER BARS", point:[155,0,18] as Point, x:100, y:600 },
  { label:"INTERLOCKING INSULATED FORMS", point:[85,145,0] as Point, x:86, y:160 },
  { label:"REINFORCED CORE", point:[350,165,18] as Point, x:795, y:170 },
  { label:"ALIGNMENT · SAFE ACCESS", point:[62,125,-60] as Point, x:80, y:210 },
  { label:"CONTROLLED CONCRETE PLACEMENT", point:[385,190,18] as Point, x:724, y:98 },
  { label:"FINISHED FACE · CORE REVEALED", point:[382,146,18] as Point, x:738, y:150 },
];

export function FennorIcfScene({ stage, cutaway, id, progress, playing }: { stage:number; cutaway:boolean; id:string; progress:number; playing:boolean }) {
  const fill = (name:string) => `url(#${id}-${name})`;
  const reveal = cutaway;
  const coreHeight = stage === 4 ? Math.max(3, Math.min(1,progress) * H) : H;
  const [hoseX,hoseY] = project([386,H+7,18]);
  const annotation = annotations[stage];
  const [ax,ay] = project(annotation.point);
  return <svg className="fn-icf-drawing" viewBox="0 0 1000 680" role="img" aria-labelledby={`${id}-scene-title ${id}-scene-desc`} data-stage={stage} data-playing={playing} data-core-visible={reveal}>
    <title id={`${id}-scene-title`}>{`${["Foundation","Insulated forms","Reinforcement","Bracing and access","Concrete placement","Finished wall"][stage]}: detailed ICF construction study`}</title>
    <desc id={`${id}-scene-desc`}>An architectural model of an L-shaped ICF wall with a window opening. The drawing shows paired insulation leaves, permanent webs, reinforcement, temporary bracing and a concrete core. It is an illustrative study, not a construction specification.</desc>
    <defs>
      <pattern id={`${id}-grid`} width="35" height="35" patternUnits="userSpaceOnUse"><path d="M35 0H0V35" fill="none" stroke="#aaa18c" strokeWidth=".6" opacity=".18" /></pattern>
      <pattern id={`${id}-foam`} width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#e8e2d4"/><circle cx="2" cy="3" r=".6" fill="#cbc3b1"/><circle cx="7" cy="7" r=".5" fill="#d0c9b9"/><path d="M4 0 5 1" stroke="#f7f1e5" strokeWidth=".7"/></pattern>
      <pattern id={`${id}-foam-side`} width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#cfc8b8"/><circle cx="3" cy="5" r=".6" fill="#b1ab9b"/><circle cx="6" cy="2" r=".5" fill="#eee7d9"/></pattern>
      <pattern id={`${id}-concrete`} width="13" height="11" patternUnits="userSpaceOnUse"><rect width="13" height="11" fill="#838a7e"/><circle cx="3" cy="4" r=".7" fill="#b1b3a4"/><circle cx="10" cy="8" r=".5" fill="#5d675b"/><path d="M7 2h2" stroke="#9ba18f" strokeWidth=".7"/></pattern>
      <pattern id={`${id}-render`} width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#eee9de"/><path d="M2 3h1M7 8h1" stroke="#c9c1af" strokeWidth=".5"/></pattern>
      <pattern id={`${id}-soil`} width="11" height="8" patternUnits="userSpaceOnUse"><rect width="11" height="8" fill="#b8ab91"/><path d="M1 3h3M7 6h2" stroke="#91846e" strokeWidth=".7"/></pattern>
      <linearGradient id={`${id}-glass`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#c4cbb9"/><stop offset=".45" stopColor="#e4e3c9"/><stop offset="1" stopColor="#92a08c"/></linearGradient>
      <radialGradient id={`${id}-shadow`}><stop stopColor="#665e4b" stopOpacity=".18"/><stop offset="1" stopColor="#665e4b" stopOpacity="0"/></radialGradient>
    </defs>
    <rect width="1000" height="680" fill={fill("grid")} />
    <g className="fn-icf-drawing-meta" aria-hidden="true"><path d="M30 30h30M30 30v30M970 30h-30M970 30v30M30 650h30M30 650v-30M970 650h-30M970 650v-30" fill="none" stroke="#b0a28a" strokeWidth=".8"/><text x="48" y="54">FENNOR / BUILD STUDY 02</text><text x="952" y="54" textAnchor="end">ICF · AXONOMETRIC SECTION</text></g>
    <ellipse cx="488" cy="498" rx="365" ry="120" fill={fill("shadow")} />
    <Box x={-48} y={-35} z={-115} w={W+96} h={12} d={D+155} fill={{top:"#ded9ca",front:fill("soil"),side:"#a99d83"}} />
    <Box x={-23} y={-23} z={-94} w={W+46} h={8} d={D+115} fill={{top:"#c6bda9",front:"#aea28c",side:"#968b74"}} />
    <Box x={-14} y={-15} z={-86} w={W+28} h={15} d={D+100} fill={{top:"#e3ddd0",front:"#bfb5a1",side:"#a89e88"}} />
    <g className="fn-icf-foundation-detail" opacity={stage===0?1:.25}>
      {Array.from({length:12},(_,i)=><Line key={`floor-x-${i}`} from={[i*38, .4, -74]} to={[i*38,.4,D+6]} width={.55} color="#b2a68e"/>)}
      {Array.from({length:8},(_,i)=><Line key={`floor-z-${i}`} from={[-8,.4,-72+i*37]} to={[W+7,.4,-72+i*37]} width={.55} color="#b2a68e"/>)}
      <Face fill="#868776" stroke="#9b8c71" at={[[0,.8,0],[W,.8,0],[W,.8,T],[T,.8,T],[T,.8,D],[0,.8,D]]} opacity={.33}/>
      <Line from={[-28,1,-2]} to={[W+25,1,-2]} color="#9b7a4a" width={1.1} dash="5 5"/><Line from={[-2,1,-40]} to={[-2,1,D+18]} color="#9b7a4a" width={1.1} dash="5 5"/>
      <Line from={[270,.6,80]} to={[270,.6,D+8]} color="#818d78" width={2}/><Box x={265} y={0} z={D-10} w={10} h={17} d={10} fill={{top:"#75826c",front:"#9ba38a",side:"#6c7a60"}}/>
    </g>
    <Layer visible={stage===0}><Reinforcement height={44} starters /></Layer>
    <Layer visible={stage>=1} className="fn-icf-forms-back"><ReturnLeaf back texture={fill("foam-side")} /><FrontLeaf back texture={fill("foam")} /></Layer>
    <Layer visible={stage>=4}><Core height={coreHeight} pattern={fill("concrete")}/></Layer>
    <Layer visible={stage>=1}><Webs/></Layer>
    <Layer visible={stage>=2}><g opacity={stage>=4?.38:1}><Reinforcement height={stage===5?H-5:H+9}/></g></Layer>
    <Layer visible={stage>=1} className="fn-icf-forms-front">
      {(stage<=4 || cutaway) && <WindowBuck/>}
      <g className="fn-icf-insulation-reveal" opacity={reveal?.18:1}><ReturnLeaf texture={fill("foam-side")}/><FrontLeaf texture={fill("foam")}/></g>
    </Layer>
    <Layer visible={stage>=3&&stage<=4}><Bracing showOpeningBrace={stage===3}/></Layer>
    <Layer visible={stage===4} className="fn-icf-pour-equipment">
      <path d={`M${hoseX+125} 88 C${hoseX+90} 60 ${hoseX+20} 80 ${hoseX+12} 124 S${hoseX} ${hoseY-40} ${hoseX} ${hoseY}`} fill="none" stroke="#3c463c" strokeWidth="12" strokeLinecap="round"/>
      <path d={`M${hoseX+125} 85 C${hoseX+90} 57 ${hoseX+20} 77 ${hoseX+12} 121 S${hoseX-1} ${hoseY-40} ${hoseX-1} ${hoseY-3}`} fill="none" stroke="#707a67" strokeWidth="2.2" strokeLinecap="round"/>
      <path d={`M${hoseX-5} ${hoseY-14}h10M${hoseX-5} ${hoseY-22}h10`} stroke="#b09b74" strokeWidth="2.5"/>
      {playing&&progress<.99&&<Line from={[386,H+2,18]} to={[386,coreHeight,18]} color="#9b9d8d" width={5}/>}
    </Layer>
    <Layer visible={stage===5}><Finished glass={fill("glass")} render={fill("render")} cutaway={cutaway}/></Layer>
    {stage===5 && <g className="fn-icf-end-section">
      <Face fill={fill("concrete")} at={[[W+.3,0,E],[W+.3,0,T-E],[W+.3,H,T-E],[W+.3,H,E]]}/>
      <Face fill={fill("foam")} at={[[W+.3,0,0],[W+.3,0,E],[W+.3,H,E],[W+.3,H,0]]}/>
      <Face fill={fill("foam-side")} at={[[W+.3,0,T-E],[W+.3,0,T],[W+.3,H,T],[W+.3,H,T-E]]}/>
    </g>}
    <g className="fn-icf-dimensions" aria-hidden="true"><Line from={[-46,-26,-110]} to={[W+46,-26,-110]} color="#a39275" width={.7}/><Line from={[-46,-20,-105]} to={[-46,-31,-115]} color="#a39275" width={.7}/><Line from={[W+46,-20,-105]} to={[W+46,-31,-115]} color="#a39275" width={.7}/><text x="515" y="628">FORM · REINFORCEMENT · CONCRETE · FINISH</text></g>
    <g className="fn-icf-callout-v2" aria-hidden="true"><path d={`M${ax} ${ay} L${annotation.x+(annotation.x<300?190:-16)} ${annotation.y+20} H${annotation.x}`} fill="none" stroke="#a28257" strokeWidth=".8"/><circle cx={ax} cy={ay} r={3} fill="#a28257"/><circle cx={ax} cy={ay} r={8} fill="none" stroke="#a28257" strokeWidth=".7" opacity=".45"/><text x={annotation.x} y={annotation.y+10}>{annotation.label}</text></g>
  </svg>;
}
