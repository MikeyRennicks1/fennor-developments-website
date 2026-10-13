'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';

// Explicit delivery allowlist: product photography and wide overview posters
// are never cropped, and metadata can continue to reference the original image.
const portraitDelivery:Record<string,string>={
 'full-home-editorial.webp':'full-home-editorial-portrait.webp',
 'kitchen-detail-editorial.webp':'kitchen-detail-editorial-portrait.webp',
 'heritage-home-editorial.webp':'heritage-home-editorial-portrait.webp',
 'bathroom-material-editorial.webp':'bathroom-material-editorial-portrait.webp',
 'extension-concept.webp':'extension-concept-hero-crop.webp',
 'new-build-concept.webp':'new-build-concept-hero-crop.webp',
 'attic-concept.webp':'attic-concept-hero-crop.webp',
 'bathroom-concept.webp':'bathroom-concept-hero-crop.webp',
 'heat-pump-concept.webp':'heat-pump-concept-hero-crop.webp',
 'retrofit-detail-concept.webp':'retrofit-detail-concept-hero-crop.webp',
 'window-reveal-editorial.webp':'window-reveal-editorial-hero-crop.webp',
};

/** Poster first. Architectural motion is downloaded only after an explicit click. */
export default function EditorialHeroVisual({image,alt,sizes,caption,film,portrait=false}:{image:string;alt:string;sizes:string;caption:string;film?:string;portrait?:boolean}){
 const deliveryImage=portrait&&!film?(portraitDelivery[image]??image):image;
 const[started,setStarted]=useState(false);const video=useRef<HTMLVideoElement>(null);
 useEffect(()=>{if(started&&video.current){video.current.focus({preventScroll:true});void video.current.play().catch(()=>{});}},[started]);
 useEffect(()=>{const element=video.current;if(!started||!element)return;const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)element.pause()},{threshold:.1});observer.observe(element);const visibility=()=>{if(document.hidden)element.pause()};document.addEventListener('visibilitychange',visibility);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility)}},[started]);
 return <figure className={`ep-hero-image${film?' ep-hero-motion':''}${started?' ep-hero-motion-started':''}`}>
 <Image src={`/images/${deliveryImage}`} alt={alt} fill loading="eager" fetchPriority="high" sizes={sizes}/>
 {film&&!started&&<a href={film} className="ep-play-study" onClick={event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();setStarted(true)}}><span aria-hidden="true">▷</span> Play the motion study <small>8 seconds</small></a>}
 {film&&started&&<video ref={video} controls muted playsInline preload="none" tabIndex={0} aria-label="Architectural motion study — silent design concept" onError={()=>setStarted(false)}><source src={film} type="video/mp4"/>Your browser cannot play this film. <a href={film}>Open the motion study</a>.</video>}
 <figcaption>{caption}</figcaption>
 </figure>;
}
