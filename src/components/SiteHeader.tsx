'use client';

import BrandLogo from './BrandLogo';
import {useEffect, useRef} from 'react';
import {usePathname} from 'next/navigation';
import {pageGroups} from '@/config/page-map';
import './site-header.css';

/** One crawlable, keyboard-operable directory across every service. */
export default function SiteHeader({home=false, editorial=false}:{home?:boolean;editorial?:boolean}) {
  const path=usePathname();
  const menu=useRef<HTMLDetailsElement>(null);
  useEffect(()=>{
    const close=(event:KeyboardEvent)=>{
      if(event.key==='Escape' && menu.current?.open){
        menu.current.open=false;
        menu.current.querySelector('summary')?.focus();
      }
    };
    const outside=(event:PointerEvent)=>{
      if(menu.current?.open && !menu.current.contains(event.target as Node))menu.current.open=false;
    };
    document.addEventListener('keydown',close);
    document.addEventListener('pointerdown',outside);
    return()=>{document.removeEventListener('keydown',close);document.removeEventListener('pointerdown',outside)};
  },[]);
  return <header className={`fn-header${home?' fn-header-home':''}${editorial?' ep-header':''}`}>
    <a className="fn-brand" href="/" aria-label="Fennor homepage"><BrandLogo loading="eager"/></a>
    <nav className="fn-primary" aria-label="Main navigation">{pageGroups.slice(0,5).map(group=><a key={group.path} href={group.path} aria-current={path===group.path?'page':undefined} className={path.startsWith(group.path)?'fn-current':''}>{group.label}</a>)}</nav>
    <div className="fn-header-actions"><a href="/contact" className="fn-contact">Let’s talk <span aria-hidden="true">↗</span></a>
      <details className="fn-directory" ref={menu}>
        <summary aria-label="Explore all pages">Explore <span aria-hidden="true">+</span></summary>
        <nav className="fn-menu" aria-label="Explore all pages" onClick={event=>{if((event.target as Element).closest('a')&&menu.current)menu.current.open=false}}>
          <div className="fn-menu-intro"><p>HOMES. ENERGY. POSSIBILITY.</p><a href="/">A brighter starting point. <span aria-hidden="true">↗</span></a><span>Choose a subject. Find the detail that matters to you.</span></div>
          <div className="fn-menu-grid">{pageGroups.map(group=><div key={group.path} className="fn-menu-group"><a className="fn-menu-title" href={group.path}>{group.label} <span aria-hidden="true">↗</span></a>{group.pages.filter(([slug])=>slug).map(([slug,label])=><a key={slug} href={`${group.path}/${slug}`} aria-current={path===`${group.path}/${slug}`?'page':undefined}>{label}</a>)}</div>)}</div>
          <div className="fn-menu-bottom"><span>Slane, Co. Meath · Meath, Louth & Dublin</span><a href="tel:+353894032737">089 403 2737 ↗</a></div>
        </nav>
      </details>
    </div>
  </header>;
}
