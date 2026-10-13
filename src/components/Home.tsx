'use client';
import HomeServiceLinks from './HomeServiceLinks';
import SiteHeader from './SiteHeader';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { solarLinks } from '@/config/solar-pages';
import HeroFilm from '@/components/HeroFilm';
import EnquiryForm from '@/components/EnquiryForm';
import { enquiryEmailHref } from '@/config/contact';

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-7-7 7 7-7 7'} stroke="currentColor" strokeWidth="1.5" /></svg>;
}
function Sun() { return <svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><circle cx="18" cy="18" r="6" stroke="currentColor" /><path d="M18 1v7m0 20v7M1 18h7m20 0h7M6 6l5 5m14 14 5 5M6 30l5-5M25 11l5-5" stroke="currentColor" /></svg>; }

const services = [
  { id: 'solar', label: 'Solar', number: '01', heading: 'Let your roof\ndo more.', description: 'Use more of your own electricity, with solar designed around your roof and daily routine. Fennor takes you from an initial assessment to an explained proposal, installation and handover.', image: 'home-detail.webp', alt: 'Slate roof and solar panels on a traditional Irish stone home', links: ['Domestic solar', 'Commercial & farm', 'Batteries & accessories'], note: 'Panels. Storage. A system that fits.', question: 'I’m interested in solar for my property.' },
  { id: 'renovations', label: 'Renovations', number: '02', heading: 'The home you love.\nReimagined.', description: 'Rethink the spaces you use every day. Start with what isn’t working, then shape a renovation around how you want your home to feel.', image: 'renovations-02.webp', alt: 'Stone walls and oak beams frame a contemporary kitchen and living space', links: ['Whole-home renovation', 'Layout & living spaces', 'Older homes'], note: 'Keep the character. Create the possibilities.', question: 'I’d like to discuss renovating my home.' },
  { id: 'retrofit', label: 'Retrofit', number: '03', heading: 'More comfort.\nFrom the inside out.', description: 'A warmer home starts with the whole picture. Consider insulation, ventilation and heating together, with a plan suited to the building.', image: 'retrofit-03.webp', alt: 'Glazed doors open onto a warm living room, with a heat pump beside the house', links: ['Whole-home approach', 'Insulation & ventilation', 'Heat-pump planning'], note: 'Understand the house before choosing the upgrade.', question: 'I’d like advice on a home retrofit.' },
  { id: 'building', label: 'Building', number: '04', heading: 'Room for\nwhat comes next.', description: 'From a thoughtful extension to a new beginning. Let’s define the brief, understand the site and talk through the practical next steps.', image: 'building-04.webp', alt: 'Wide glazed doors connect an inviting living space with a garden terrace', links: ['Extensions', 'New-build enquiries', 'Planning your project'], note: 'Good projects begin with a clear conversation.', question: 'I’d like to discuss a building project.' },
  { id: 'electrical', label: 'Electrical', number: '05', heading: 'The power behind\nyour everyday.', description: 'A better-lit home, a working business or a planned maintenance visit. Tell Fennor what you need from your electrical installation. We explain the assessment, the work and any disruption before you decide.', image: 'kitchen-detail-editorial.webp', alt: 'Carefully positioned pendant and concealed lighting in a contemporary kitchen', links: ['Domestic electrical', 'Commercial electrical', 'Industrial maintenance'], note: 'Homes. Workplaces. A clearer plan for both.', question: 'I’d like to discuss electrical work or maintenance.' },
];

const systems = [
  { title: 'Generate', label: 'Solar panels', text: 'Daylight becomes electricity for your home. Fennor assesses your roof, shade and electricity use to recommend a panel layout with a clear purpose: useful generation for the way you live.', x: '46%', y: '35%', line: '01 / START WITH THE ROOF' },
  { title: 'Store', label: 'Battery storage', text: 'An optional battery can keep some spare solar for your evenings. We compare your evening use, tariffs and available surplus so you can see whether storage adds enough value to justify its cost.', x: '68%', y: '68%', line: '02 / THINK BEYOND DAYLIGHT' },
  { title: 'Use', label: 'Hot-water diversion', text: 'A compatible EDDI can turn spare solar into hot water in your cylinder. We establish whether it suits your hot-water needs and existing equipment; it is not a promise of free hot water in every season.', x: '79%', y: '52%', line: '03 / MAKE SURPLUS USEFUL' },
];

const faqs = [
  ['Where should I start if I’m considering solar?', 'Start with your location, an electricity bill and what you would like solar to achieve. Fennor uses those details to plan the roof and electrical assessment, then explains a design and quote specific to your home. We assess roof condition, orientation, shading and daytime use for you.'],
  ['Do I need a battery with solar panels?', 'No. We start with the value of solar on its own, then show what a battery would add to the price and how it could serve your evening use. Available surplus, tariffs and storage cost determine whether that extra investment makes sense.'],
  ['Can I plan solar alongside a renovation or retrofit?', 'Yes. Fennor brings the solar, roof, electrical and home-upgrade requirements into one planning conversation, so work is sequenced around your building. Before you agree the proposal, we explain the specialist work involved, who delivers it and what is included.'],
  ['What about grants and financial support?', 'Fennor explains the funding route relevant to your property, the application steps and who supplies the information needed. Eligibility and approval come from the scheme, not a quotation. We keep the full project price separate from possible support, including the different farm and commercial routes.'],
  ['Will a battery keep my home running in a power cut?', 'Not automatically. Backup requires compatible equipment, appropriate changeover or isolation arrangements and a suitable electrical design. The circuits supported and duration depend on the installed system and available battery charge.'],
  ['Can I request electrical work without a solar or building project?', 'Yes. You can contact Fennor about domestic electrical work, commercial premises or industrial electrical maintenance as a standalone enquiry. Tell us the location, what needs attention and any access or operating-hour requirements. We confirm the scope, availability and next step with you before a visit is booked.'],
];

export default function Home() {
  const [service, setService] = useState(0);
  const [system, setSystem] = useState(0);
  const [motion, setMotion] = useState(false);
  const [heroEnded, setHeroEnded] = useState(false);
  const [heroReplay, setHeroReplay] = useState(0);
  const [selectedInterest, setSelectedInterest] = useState('Solar');
  const [message, setMessage] = useState('');
  const [filmStarted, setFilmStarted] = useState(false);
  const film = useRef<HTMLVideoElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const active = services[service];

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    setMotion(!preference.matches);
    const update = () => setMotion(!preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const nodes = root.current?.querySelectorAll('[data-reveal]');
    if (!nodes) return;
    if (!motion) { nodes.forEach(node => node.classList.add('visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    nodes.forEach(node => { node.classList.add('will-reveal'); observer.observe(node); });
    return () => observer.disconnect();
  }, [motion]);

  useEffect(() => {
    const video = film.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) video.pause(); }, { threshold: 0.15 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [filmStarted]);

  function enquire(interest: string, text = '') { setSelectedInterest(interest); setMessage(text); }

  return <div ref={root} className={`site ${motion ? 'motion-on' : 'motion-off'}`}>
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader home/>

    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <HeroFilm motion={motion} replay={heroReplay} onComplete={() => setHeroEnded(true)} />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="orange-dot" /> BUILT AROUND YOUR TOMORROW</p>
          <h1 id="hero-title">A better home.<br />A <em>brighter</em> future.</h1>
          <p className="hero-description">Solar PV, electrical services, renovations and retrofits.<br />Meath, Louth and Dublin. Based in Slane.</p>
          <div className="hero-actions"><a className="button button-light" href="#energy">Explore your possibilities <Arrow diagonal /></a><a className="hero-text-link" href="#contact">Tell us about your home <Arrow /></a></div>
        </div>
        <div className="hero-bottom"><a href="#intro" className="scroll-cue"><span>↓</span> A NEW PERSPECTIVE ON HOME</a><div className="hero-caption"><button onClick={() => { if (heroEnded) { setHeroReplay(value => value + 1); setHeroEnded(false); setMotion(true); } else setMotion(!motion); }}>{heroEnded ? '↻ Replay motion' : motion ? 'Ⅱ Pause motion' : '▷ Enable motion'}</button></div></div>
        <div className="hero-index" aria-hidden="true"><span>01</span><i />04</div>
      </section>

      <section className="intro section-shell" id="intro">
        <div className="section-kicker" data-reveal><span className="tiny-cross">+</span> A MORE CONSIDERED HOME</div>
        <div className="intro-body" data-reveal><h2>Good for your home.<br /><span>Better for how you live.</span></h2><div className="intro-bottom"><p>More than panels on a roof or another room. It’s about making your home work better for you—today, and for the years ahead.</p><a href="#services" className="circle-link" aria-label="Explore Fennor services"><Arrow diagonal /></a></div></div>
        <div className="intro-foot"><span>SOLAR & ELECTRICAL</span><span>RENOVATION & RETROFIT</span><span>BUILDING & POSSIBILITY</span></div>
        <div className="coverage-note"><h3>Solar panels, renovations and home retrofits in Meath, Louth and Dublin.</h3><p>From our base in Slane, Co. Meath, we focus on homes in Meath and Louth, with Dublin enquiries welcome. For projects elsewhere in Leinster or larger commercial solar projects across Ireland, we will confirm whether we can help. <a href="/about/areas">Explore our services in your area ↗</a></p></div>
      </section>

      <section className="energy-section" id="energy" aria-labelledby="energy-title">
        <div className="energy-heading section-shell" data-reveal><p className="eyebrow">01 / REIMAGINE YOUR ENERGY</p><div><h2 id="energy-title">One home.<br /><em>Connected possibilities.</em></h2><p>See how the parts fit together.<br />Start with what matters to you.</p></div></div>
        <div className="energy-layout">
          <div className={`energy-scene system-${system}`}>
            <Image src="/images/energy-home.webp" alt="AI home-energy illustration; equipment positions are conceptual, not an installation design" fill sizes="(max-width: 800px) 100vw, 65vw" quality={85} />
            <div className="scene-grid" aria-hidden="true" />
            {systems.map((item, index) => <button key={item.label} className={`hotspot hotspot-${index} ${system === index ? 'active' : ''}`} style={{ left: item.x, top: item.y }} aria-pressed={system === index} onClick={() => setSystem(index)}><span>{String(index + 1).padStart(2, '0')}</span>{' '}<b>{item.label}</b></button>)}
            <span className="scene-caption">ILLUSTRATIVE HOME · NOT A TECHNICAL DESIGN</span>
          </div>
          <div className="energy-panel">
            <div className="energy-tabs" role="group" aria-label="Explore home energy">{systems.map((item, index) => <button key={item.title} aria-pressed={system === index} onClick={() => setSystem(index)}>{item.title}<span>0{index + 1}</span></button>)}</div>
            <div className="system-copy" key={system} aria-live="polite"><span className="system-icon"><Sun /></span><p className="eyebrow">{systems[system].line}</p><h3>{systems[system].label}</h3><p>{systems[system].text}</p>{system === 2 ? <a href="/solar/accessories#eddi" className="text-link">Explore EDDI & hot-water diversion <Arrow diagonal /></a> : system === 1 ? <a href="/solar/battery-storage" className="text-link">Explore battery storage <Arrow diagonal /></a> : <a href="/solar/domestic" className="text-link">Explore domestic solar panels <Arrow diagonal /></a>}</div>
            <div className="system-foot"><span className="orange-dot" /><p>Your home. Your usage.<br />Never a one-size-fits-all system.</p></div>
          </div>
        </div>
      </section>

      <section className="everyday section-shell" aria-labelledby="everyday-title">
        <div className="everyday-copy" data-reveal><p className="eyebrow">A LITTLE ENERGY. A REAL-LIFE DIFFERENCE.</p><h2 id="everyday-title">From the roof.<br /><em>To the everyday.</em></h2><p>The morning routine. The washing on. The kettle boiling. Solar becomes meaningful when you can see where it fits into your life.</p><p className="everyday-detail">Using appliances while your panels are generating can help you use more of your own electricity. Actual output varies with the weather, season and system.</p><div className="energy-journey" aria-label="Daylight to solar electricity to home"><span>Daylight</span><Arrow /><span>Your roof</span><Arrow /><span>Your home</span></div><a href="#contact" onClick={() => enquire('Solar', 'I’d like to understand how solar could fit my electricity use.')} className="text-link">Make it personal to your home <Arrow diagonal /></a></div>
        <div className="film-column"><div className="film-frame">{filmStarted ? <video ref={film} src="/films/solar-kettle-edited-v2.mp4" poster="/images/kettle-poster.jpg" controls autoPlay muted playsInline preload="none" aria-label="Fennor solar-to-kettle energy journey" onError={() => setFilmStarted(false)} /> : <button className="film-play" onClick={() => setFilmStarted(true)} aria-describedby="kettle-film-description"><Image src="/images/kettle-poster.jpg" alt="" fill sizes="(max-width: 800px) 85vw, 400px" /><span className="film-overlay"><span className="play-circle" aria-hidden="true">▷</span><span>WATCH THE ENERGY JOURNEY{' '}<small>00:17 / FENNOR FILM</small></span></span></button>}</div><p className="film-caption" id="kettle-film-description">Illustrative energy journey, not a performance demonstration.<br />Starts muted. Playback is your choice.</p></div>
      </section>

      <section className="services-section section-shell" id="services" aria-labelledby="services-title">
        <div className="services-heading" data-reveal><p className="eyebrow">02 / THE POSSIBILITIES</p><h2 id="services-title">Different ambitions.<br /><em>The same care.</em></h2></div>
        <div className="service-tabs" role="tablist" aria-label="Fennor services">{services.map((item, index) => <button role="tab" id={`tab-${item.id}`} aria-controls={`panel-${item.id}`} aria-selected={service === index} tabIndex={service === index ? 0 : -1} key={item.id} onClick={() => setService(index)} onKeyDown={event => { let next = index; if (event.key === 'ArrowRight') next = (index + 1) % services.length; else if (event.key === 'ArrowLeft') next = (index + services.length - 1) % services.length; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = services.length - 1; else return; event.preventDefault(); setService(next); document.getElementById(`tab-${services[next].id}`)?.focus(); }}><span>{item.number}</span>{item.label}<Arrow diagonal /></button>)}</div>
        <div className="service-content" role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`}>
          <div className="service-photo" key={active.image}><Image src={`/images/${active.image}`} alt={active.alt} fill sizes="(max-width: 800px) 100vw, 56vw" /></div>
          <div className="service-copy" key={active.id}><p className="eyebrow">FENNOR / {active.label.toUpperCase()}</p><h3>{active.heading}</h3><p>{active.description}</p>{active.id === 'solar' ? <div className="solar-service-list">{solarLinks.map(item => <details name="solar-service" key={item.slug}><summary>{item.label}<span aria-hidden="true">+</span></summary><div><p>{item.summary}</p><a className="text-link" href={`/solar/${item.slug}`}>Explore {item.label.toLowerCase()} <Arrow diagonal /></a></div></details>)}</div> : <HomeServiceLinks service={active.id} />}<a className="text-link" href="#contact" onClick={() => enquire(active.label, active.question)}>Let’s explore {active.label.toLowerCase()} <Arrow diagonal /></a><span className="service-note">{active.note}</span></div>
        </div>
      </section>

      <section className="manifesto" id="approach">
        <div className="manifesto-top section-shell"><p className="eyebrow">03 / THE FENNOR APPROACH</p><span className="manifesto-mark" aria-hidden="true"><Sun /></span></div>
        <h2 data-reveal>Before we talk about<br /><em>what we can build.</em><br />Let’s talk about <span>you.</span></h2>
        <div className="process section-shell">{[
          ['01', 'Understand first.', 'Your priorities, your property, your budget. A good conversation comes before a recommendation.'],
          ['02', 'Make it clear.', 'We explain the recommended option, full price, likely disruption and any specialist work. You can see what is included and ask questions before deciding.'],
          ['03', 'Plan it properly.', 'Before work is booked, we agree the practical sequence and access with you, explain any approvals needed, and set out the testing, handover and support included.'],
        ].map(([number, title, text]) => <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="advice section-shell" id="answers">
        <div className="advice-heading" data-reveal><p className="eyebrow">04 / GOOD QUESTIONS. CLEAR ANSWERS.</p><h2>A little clarity.<br /><em>A better starting point.</em></h2><p>No pressure to have it all figured out.<br />That’s what the conversation is for.</p><a href="https://www.seai.ie/grants" target="_blank" rel="noopener noreferrer" className="text-link">Check official SEAI grant guidance <Arrow diagonal /></a></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span className="faq-number">0{index + 1}</span><span>{question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-copy" data-reveal><p className="eyebrow"><span className="orange-dot" /> YOUR NEXT CHAPTER</p><h2>What could your<br />home <em>become?</em></h2><p>Tell us what you’re thinking.<br />We’ll start with a conversation.</p><a className="contact-phone" href="tel:+353894032737">089 403 2737 <Arrow diagonal /></a><div><a className="contact-email" href={enquiryEmailHref({primary:'info@fennor.ie'})}>info@fennor.ie</a></div><div><a className="contact-email" href={enquiryEmailHref({primary:'mikey@fennor.ie'})}>mikey@fennor.ie</a></div></div>
        <EnquiryForm topic="Website project enquiry" context={`Interest: ${selectedInterest}`} className="contact-form" buttonClassName="button button-light">
          <label htmlFor="interest">I’m thinking about</label><select id="interest" value={selectedInterest} onChange={event => setSelectedInterest(event.target.value)}><option>Solar</option><option>Electrical</option><option>Renovations</option><option>Retrofit</option><option>Building</option><option>Heat pumps</option><option>Not sure yet</option></select>
          <label htmlFor="home-area">Town or county <span>(optional)</span></label><input id="home-area" name="area" autoComplete="address-level2" maxLength={120} />
          <label htmlFor="message">A little about your plans</label><textarea id="message" name="details" required rows={3} placeholder="Your property, your ideas, your questions…" value={message} onChange={event => setMessage(event.target.value)} maxLength={2000} />
        </EnquiryForm>
      </section>
    </main>
  </div>;
}
