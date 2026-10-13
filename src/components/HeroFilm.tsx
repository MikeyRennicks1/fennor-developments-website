'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };

export default function HeroFilm({ motion, replay, onComplete }: {
  motion: boolean;
  replay: number;
  onComplete: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const previousReplay = useRef(replay);
  const [eligible, setEligible] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [posterReady, setPosterReady] = useState(false);
  const [requested, setRequested] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const desktop = matchMedia('(min-width: 801px)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const update = () => setEligible(desktop.matches && !connection?.saveData && !['slow-2g', '2g', '3g'].includes(connection?.effectiveType || ''));
    const visibility = () => setTabVisible(!document.hidden);
    update();
    visibility();
    desktop.addEventListener('change', update);
    connection?.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    if (container.current) observer.observe(container.current);
    return () => {
      desktop.removeEventListener('change', update);
      connection?.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
      observer.disconnect();
    };
  }, []);

  // No video source exists until the poster and initial page have loaded.
  // Mobile, slow/data-saving connections and reduced-motion visits do not request the film.
  useEffect(() => {
    if (requested || !motion || !eligible || !inView || !tabVisible || !posterReady || failed) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => { timer = setTimeout(() => setRequested(true), 1400); };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => { clearTimeout(timer); window.removeEventListener('load', schedule); };
  }, [requested, motion, eligible, inView, tabVisible, posterReady, failed]);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (previousReplay.current !== replay) {
      element.currentTime = 0;
      previousReplay.current = replay;
    }
    if (!motion || !eligible || !inView || !tabVisible || failed) {
      element.pause();
      return;
    }
    // A single gentle approach, then hold the final frame. The source is not a loop.
    if (!element.ended) void element.play().catch(() => {
      // Autoplay can be blocked by browser policy; retain the still fallback.
    });
    return () => element.pause();
  }, [requested, motion, eligible, inView, tabVisible, replay, failed]);

  return <div ref={container} className="hero-visual hero-film-visual">
    <picture>
      <source media="(max-width: 800px)" type="image/avif" srcSet="/images/home-hero-poster-mobile.avif" />
      <source media="(max-width: 800px)" srcSet="/images/home-hero-poster-mobile.webp" />
      <Image className="hero-image hero-film-poster" src="/images/home-hero-poster.webp" alt="Architectural visualisation of an Irish solar home behind a stone garden wall" fill loading="eager" fetchPriority="high" sizes="100vw" quality={85} onLoad={() => setPosterReady(true)} />
    </picture>
    {requested && !failed && <video
      ref={video}
      className={`hero-film ${hasFrame ? 'has-frame' : ''}`}
      src="/films/home-hero-1080.mp4"
      muted playsInline preload="none" disablePictureInPicture
      aria-hidden="true" tabIndex={-1}
      onPlaying={() => setHasFrame(true)}
      onEnded={onComplete}
      onError={() => { setFailed(true); setHasFrame(false); }}
    />}
  </div>;
}
