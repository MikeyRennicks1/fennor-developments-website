import type {ReactNode} from 'react';
import { enquiryEmailHref } from '@/config/contact';
import SiteHeader from './SiteHeader';
import styles from './legal-page.module.css';

type LegalSection = {id:string; title:string; content:ReactNode};

export default function LegalPage({title, intro, updated, sections, notice}: {
  title:string; intro:string; updated?:string; sections:LegalSection[]; notice?:ReactNode;
}) {
  return <div className={styles.page}>
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader/>
    <main id="main" className={styles.shell}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>FENNOR / OPEN & STRAIGHTFORWARD</p>
        <h1>{title}<span aria-hidden="true">.</span></h1>
        <p className={styles.lead}>{intro}</p>
        {updated&&<p className={styles.updated}>Last updated <time dateTime="2026-10-13">{updated}</time></p>}
      </header>
      {notice&&<aside className={styles.notice}>{notice}</aside>}
      <div className={styles.layout}>
        <nav aria-label="On this page" className={styles.contents}>
          <p className={styles.eyebrow}>IN THIS PAGE</p>
          {sections.map(({id,title},index)=><a href={`#${id}`} key={id}><span>{String(index+1).padStart(2,'0')}</span>{title}</a>)}
        </nav>
        <div className={styles.sections}>{sections.map(({id,title,content},index)=><section id={id} key={id} aria-labelledby={`${id}-title`}>
          <p className={styles.eyebrow}>0{index+1}</p><h2 id={`${id}-title`}>{title}</h2><div className={styles.copy}>{content}</div>
        </section>)}</div>
      </div>
      <aside className={styles.help}><div><p className={styles.eyebrow}>A DIRECT CONVERSATION</p><h2>Something you want to ask?</h2><p>Get in touch with our team in Slane.</p></div><div><a href={enquiryEmailHref({ primary: 'info@fennor.ie' })}>info@fennor.ie ↗</a><a href="tel:+353894032737">089 403 2737 ↗</a></div></aside>
    </main>
  </div>;
}
