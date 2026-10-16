'use client';

import BrandLogo from './BrandLogo';
import {useEffect, useRef} from 'react';
import {usePathname} from 'next/navigation';
import {pageGroups} from '@/config/page-map';
import './site-header.css';

const primaryPaths = ['/solar','/electrical','/building','/renovations','/retrofitting','/about'];

// Keep the header useful rather than turning it into a 50-link mega menu. Deeper
// guidance remains available from each overview page and the footer directory.
const featuredSlugs:Record<string,readonly string[]>={
  '/solar':['domestic','commercial','farm','ground-mounted','battery-storage','accessories','calculator','cost','grants-funding'],
  '/renovations':['full-home','kitchens','bathrooms','older-homes','projects-case-studies'],
  '/retrofitting':['whole-home','insulation','windows-doors','ventilation','grants-funding','projects-case-studies'],
  '/electrical':['domestic','commercial','industrial-maintenance'],
  '/building':['extensions','new-builds','attic-conversions'],
  '/about':['your-project','reviews','areas'],
  '/advice':['grant-updates','news'],
  '/contact':['assessment'],
};

type HeaderDestination={href:string;label:string};

function featuredPages(groupPath:string):HeaderDestination[]{
  const group=pageGroups.find(item=>item.path===groupPath);
  if(!group)return [];
  const allowed=featuredSlugs[groupPath]??[];
  const pages:HeaderDestination[]=group.pages
    .filter(([slug])=>Boolean(slug)&&allowed.includes(slug))
    .map(([slug,label])=>({href:`${group.path}/${slug}`,label}));
  if(groupPath==='/retrofitting')pages.push({href:'/heat-pumps',label:'Heat pumps'});
  return pages;
}

/** One crawlable, keyboard-operable directory across every service. */
export default function SiteHeader({home=false, editorial=false}:{home?:boolean;editorial?:boolean}) {
  const path=usePathname();
  const header=useRef<HTMLElement>(null);
  const menu=useRef<HTMLDetailsElement>(null);
  const primaryGroups=primaryPaths.map(groupPath=>pageGroups.find(group=>group.path===groupPath)).filter((group):group is (typeof pageGroups)[number]=>Boolean(group));
  const directoryGroups=[...primaryGroups,...pageGroups.filter(group=>group.path==='/advice'||group.path==='/contact')];
  const isGroupCurrent=(groupPath:string)=>path.startsWith(groupPath)||(groupPath==='/retrofitting'&&path.startsWith('/heat-pumps'));
  const closeTopLevelMenus=(except?:HTMLDetailsElement)=>{
    header.current?.querySelectorAll<HTMLDetailsElement>(':scope > .fn-primary details[open], :scope > .fn-header-actions > details[open]').forEach(details=>{
      if(details!==except)details.open=false;
    });
  };
  const openOne=(event:React.SyntheticEvent<HTMLDetailsElement>)=>{
    if(event.currentTarget.open)closeTopLevelMenus(event.currentTarget);
  };
  useEffect(()=>{
    const close=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){
        const open=header.current?.querySelector<HTMLDetailsElement>(':scope > .fn-primary details[open], :scope > .fn-header-actions > details[open]');
        if(open){
          open.open=false;
          open.querySelector<HTMLElement>(':scope > summary')?.focus();
        }
      }
    };
    const outside=(event:PointerEvent)=>{
      if(header.current&&!header.current.contains(event.target as Node))closeTopLevelMenus();
    };
    document.addEventListener('keydown',close);
    document.addEventListener('pointerdown',outside);
    return()=>{document.removeEventListener('keydown',close);document.removeEventListener('pointerdown',outside)};
  },[]);
  return <header ref={header} className={`fn-header${home?' fn-header-home':''}${editorial?' ep-header':''}`}>
    <a className="fn-brand" href="/" aria-label="Fennor homepage"><BrandLogo loading="eager"/></a>
    <nav className="fn-primary" aria-label="Main navigation">{primaryGroups.map(group=><details key={group.path} className={`fn-primary-group${isGroupCurrent(group.path)?' fn-current':''}`} onToggle={openOne}>
      <summary role="button" aria-haspopup="true">{group.label}<span aria-hidden="true">⌄</span></summary>
      <nav className="fn-primary-submenu" aria-label={`${group.label} pages`} onClick={event=>{if((event.target as Element).closest('a'))(event.currentTarget.closest('details') as HTMLDetailsElement).open=false}}>
        {featuredPages(group.path).map(item=><a key={item.href} href={item.href} aria-current={path===item.href?'page':undefined}>{item.label}<span aria-hidden="true">↗</span></a>)}
      </nav>
    </details>)}</nav>
    <div className="fn-header-actions"><a href="/contact" className="fn-contact">Let’s talk <span aria-hidden="true">↗</span></a>
      <details className="fn-directory" ref={menu} onToggle={openOne}>
        <summary aria-label="Explore all pages">Explore <span aria-hidden="true">+</span></summary>
        <nav className="fn-menu" aria-label="Explore all pages" onClick={event=>{if((event.target as Element).closest('a')&&menu.current)menu.current.open=false}}>
          <div className="fn-menu-intro"><p>HOMES. ENERGY. POSSIBILITY.</p><a href="/">A brighter starting point. <span aria-hidden="true">↗</span></a><span>Choose a subject. Find the detail that matters to you.</span></div>
          <div className="fn-menu-grid">{directoryGroups.map(group=><details key={group.path} className="fn-menu-group" open={isGroupCurrent(group.path)}>
            <summary>{group.label}<span aria-hidden="true">+</span></summary>
            <div className="fn-menu-links"><a className="fn-menu-title" href={group.path}>{group.label} overview <span aria-hidden="true">↗</span></a>{featuredPages(group.path).map(item=><a key={item.href} href={item.href} aria-current={path===item.href?'page':undefined}>{item.label}</a>)}</div>
          </details>)}</div>
          <div className="fn-menu-bottom"><span>Slane, Co. Meath · Meath, Louth & Dublin</span><a href="tel:+353894032737">089 403 2737 ↗</a></div>
        </nav>
      </details>
    </div>
  </header>;
}
