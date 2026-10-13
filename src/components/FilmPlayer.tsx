'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import './film-player.css';

/** The film is requested only after a click; the still uses responsive, lazy-loaded images. */
export default function FilmPlayer({ src, poster, label, descriptionId }: {
  src: string;
  poster: string;
  label: string;
  descriptionId: string;
}) {
  const [started, setStarted] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!started || !video.current) return;
    video.current.focus({ preventScroll: true });
    void video.current.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
  }, [started]);

  return <div className="film-player">
    {started ? <video ref={video} controls playsInline preload="metadata" width={1920} height={1080}
      tabIndex={0} aria-label={label} aria-describedby={descriptionId}>
      <source src={src} type="video/mp4" />
      Your browser does not support video. <a href={src}>Open the commercial solar film</a>.
    </video> : <a href={src} className="film-player-launch" aria-describedby={descriptionId}
      onClick={event => {
        // Retain ordinary open-in-new-tab behaviour and a working no-JavaScript link.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); setStarted(true);
      }}>
      <Image src={poster} alt="" fill sizes="(max-width: 1800px) 88vw, 1584px" />
      <span className="film-player-cta"><span aria-hidden="true">▶</span><span>{label}</span></span>
    </a>}
  </div>;
}
