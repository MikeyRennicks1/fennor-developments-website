import Image from 'next/image';
import SiteHeader from './SiteHeader';
import { ENQUIRY_RECIPIENTS, enquiryEmailHref } from '@/config/contact';

export function SolarHeader(_props:{label:string;anchor:string}){return <><a className="skip-link" href="#main">Skip to content</a><SiteHeader/></>;}
export function SolarFooter(){return <footer className="footer section-shell"><div className="footer-bottom"><span>Fennor Developments Ltd · Slane, Co. Meath</span><a href="tel:+353894032737">089 403 2737</a>{ENQUIRY_RECIPIENTS.map(email=><a key={email} href={enquiryEmailHref({primary:email})}>{email}</a>)}</div></footer>;}
export function SolarBreadcrumb({label}:{label:string}){return <nav className="sp-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/solar">Solar</a><span>/</span><span aria-current="page">{label}</span></nav>;}
export function SolarFAQ({questions,id}:{questions:{q:string;a:string}[];id:string}){return <section className="sp-shell sp-faq" id={id}><div><p className="sp-kicker">ANSWERS WORTH HAVING</p><h2>Good questions.<br/><em>Clearer choices.</em></h2><p>The questions we help you work through before choosing a system for your property.</p></div><div>{questions.map(({q,a},i)=><details key={q}><summary><span>{String(i+1).padStart(2,'0')}</span><h3>{q}</h3><b aria-hidden="true">+</b></summary><p>{a}</p></details>)}</div></section>;}
export function SolarSchema({slug,title,description,questions}:{slug:string;title:string;description:string;questions:{q:string;a:string}[]}){
  const url=`https://fennor.ie/solar/${slug}`;
  const graph={'@context':'https://schema.org','@graph':[
    {'@type':'WebPage','@id':`${url}#webpage`,url,name:title,description,inLanguage:'en-IE',isPartOf:{'@id':'https://fennor.ie/#website'},publisher:{'@id':'https://fennor.ie/#organization'},breadcrumb:{'@id':`${url}#breadcrumb`}},
    {'@type':'BreadcrumbList','@id':`${url}#breadcrumb`,itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://fennor.ie/'},{'@type':'ListItem',position:2,name:'Solar',item:'https://fennor.ie/solar'},{'@type':'ListItem',position:3,name:title,item:url}]},
    ...(questions.length?[{'@type':'FAQPage','@id':`${url}#faq`,isPartOf:{'@id':`${url}#webpage`},mainEntity:questions.map(({q,a})=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}]:[]),
  ]};
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,'\\u003c')}}/>;
}
