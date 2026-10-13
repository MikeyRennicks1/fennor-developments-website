'use client';

import {useId,useState} from 'react';
import {grantCatalog,grantCategories,grantsForPath,GRANTS_REVIEWED} from '@/lib/grants';
import './grant-directory.css';

type Grant = (typeof grantCatalog)[number];

const kindLabels = {
  grant: 'Grant support',
  route: 'Programme route',
  loan: 'Loan · repayable',
  'no-grant': 'Funding explained',
};

function GrantCard({grant,directory}:{grant:Grant;directory:boolean}) {
  const kind=grant.kind??'grant';
  const category=grantCategories.find(item=>item.id===grant.category)?.label??grant.category;
  return <article className={`gd-card gd-card-${kind}`} data-grant-card={grant.id}>
    <div className="gd-card-main">
      <div className="gd-card-heading"><p className="gd-category">{directory?category:kindLabels[kind]}</p><h3>{grant.title}</h3></div>
      <p className="gd-amount">{grant.amount}</p>
      <p className="gd-summary">{grant.summary}</p>
    </div>
    <details className="gd-conditions">
      <summary><span>{kind==='no-grant'?'What this means for your project':kind==='loan'?'Loan conditions & official guidance':'Conditions & official guidance'}</span><b aria-hidden="true">+</b></summary>
      <div className="gd-condition-body">
        {grant.breakdown&&grant.breakdown.length>0&&<dl className="gd-breakdown">{grant.breakdown.map(item=><div key={`${item.label}-${item.value}`}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>}
        {grant.conditions.length>0&&<ul>{grant.conditions.map(condition=><li key={condition}>{condition}</li>)}</ul>}
        <a className="gd-source" href={grant.source.url} target="_blank" rel="noopener noreferrer">{grant.source.label}<span aria-hidden="true">↗</span><span className="gd-sr-only"> (opens in a new tab)</span></a>
        {grant.additionalSources?.map(source=><a className="gd-source" key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span><span className="gd-sr-only"> (opens in a new tab)</span></a>)}
        {grant.href&&<a className="gd-service-link" href={grant.href}>Explore the related service <span aria-hidden="true">↗</span></a>}
      </div>
    </details>
  </article>;
}

/** All cards are initially server-rendered; filtering only narrows this readable catalogue. */
export default function GrantDirectory({path,directory=false}:{path:string;directory?:boolean}) {
  const [category,setCategory]=useState('all');
  const [query,setQuery]=useState('');
  const id=useId();
  const available=directory?grantCatalog:grantsForPath(path);
  const needle=query.trim().toLocaleLowerCase('en-IE');
  const visible=available.filter(grant=>(category==='all'||grant.category===category)&&(!needle||[grant.title,grant.summary,grant.amount,...grant.conditions].join(' ').toLocaleLowerCase('en-IE').includes(needle)));
  const reviewed=new Intl.DateTimeFormat('en-IE',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${GRANTS_REVIEWED}T12:00:00Z`));
  if(!available.length)return null;
  return <section className={`gd-section${directory?' gd-directory':' gd-contextual'}`} id={directory?'grant-directory':'grant-options'} aria-labelledby={`${id}-heading`} data-grant-directory={directory?'all':path}>
    <div className="gd-shell">
      <header className="gd-heading">
        <div><p className="gd-eyebrow">{directory?'YOUR GRANTS & FUNDING GUIDE':'SUPPORT FOR THE WORK YOU HAVE IN MIND'}</p><h2 id={`${id}-heading`}>{directory?'Your plans.':'A clearer budget.'}<br/><em>{directory?'The support that may fit.':'The support to explore.'}</em></h2></div>
        <div className="gd-introduction"><p>{directory?'Explore the support relevant to your home, business or farm. Each option brings the headline, key conditions and official guidance together, so you can ask Fennor about the route that fits your plans.':'These are the relevant funding options to discuss with Fennor alongside your project. We explain the full price, the support that may apply and the steps before you commit.'}</p><p className="gd-reviewed">Reviewed <time dateTime={GRANTS_REVIEWED}>{reviewed}</time> · Guidance, not an eligibility decision.</p></div>
      </header>
      {directory&&<div className="gd-controls">
        <div className="gd-search"><label htmlFor={`${id}-search`}>Find an upgrade or scheme</label><input id={`${id}-search`} type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Try solar, windows or insulation" autoComplete="off" aria-controls={`${id}-results`}/><span aria-hidden="true">⌕</span></div>
        <div className="gd-filters" role="group" aria-label="Filter grants by project type"><button type="button" aria-pressed={category==='all'} onClick={()=>setCategory('all')}>All support <span>{grantCatalog.length}</span></button>{grantCategories.map(item=><button type="button" key={item.id} aria-pressed={category===item.id} onClick={()=>setCategory(item.id)}>{item.label}<span>{grantCatalog.filter(grant=>grant.category===item.id).length}</span></button>)}</div>
        <p className="gd-result-count" role="status" aria-live="polite" aria-atomic="true">{visible.length} {visible.length===1?'funding option':'funding options'}{category!=='all'?` · ${grantCategories.find(item=>item.id===category)?.label}`:''}{needle?' matching your search':''}</p>
      </div>}
      <div className="gd-cards" id={`${id}-results`}>{visible.map(grant=><GrantCard key={grant.id} grant={grant} directory={directory}/>)}</div>
      {directory&&visible.length===0&&<div className="gd-empty"><h3>No matching options.</h3><p>Try a broader search, or clear the filters to see the full guide.</p><button type="button" onClick={()=>{setCategory('all');setQuery('');}}>Show all support <span aria-hidden="true">↗</span></button></div>}
      <div className="gd-footer"><p>Grants are conditional, and separate maximum amounts cannot automatically be added together. Loans are repayable. Current official terms and your written offer determine the support and deadlines for your project.</p><a href={directory?'/contact/assessment':'/advice/grant-updates#grant-directory'}>{directory?'Talk through your plans with Fennor':'Explore all grants & funding'} <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}
