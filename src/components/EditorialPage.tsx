import Image from 'next/image';
import { enquiryEmailHref } from '@/config/contact';
import type {Metadata} from 'next';
import {allPages,pageGroups} from '@/config/page-map';
import {editorialPages,type EditorialPage as PageData} from '@/config/editorial-pages';
import {EnergyValue,ProjectEnquiry,ProjectJourney,ReadinessChecklist} from './ProjectTools';
import {SurplusExplorer} from './AccessoryTools';
import PanelSizer from './PanelSizer';
import SolarRelated from './SolarRelated';
import HomeUpgradeExplorer from './HomeUpgradeExplorer';
import SiteHeader from './SiteHeader';
import EditorialHeroVisual from './EditorialHeroVisual';
import GrantDirectory from './GrantDirectory';
import {grantsForPath} from '@/lib/grants';
import RenovationBuildingExperience from './architecture/RenovationBuildingExperience';
import CompanyAdviceExperience from './architecture/CompanyAdviceExperience';
import SolarSupportingExperience from './architecture/SolarSupportingExperience';
import RetrofitHeatingExperience from './architecture/RetrofitHeatingExperience';
import '@/app/solar/solar-detail.css';
import './editorial.css';

// Search snippets describe the actual page, rather than repeating a decorative
// hero line. Grant amounts stay in the source-reviewed content, not stale metadata.
const searchDescriptions:Record<string,string>={
 '/solar':'Explore solar PV for homes, farms and businesses in Slane, Navan and across Meath and Louth. Compare panels, batteries, grants and the next steps with Fennor.',
 '/solar/accessories/eddi':'Explore EDDI hot-water diversion with Fennor. Discuss your cylinder, solar surplus and battery priorities to understand whether a diverter suits your home.',
 '/solar/accessories/backup-power':'Discuss solar backup power with Fennor: the circuits you need, equipment compatibility, safe isolation and the practical limits of stored energy.',
 '/solar/accessories/ev-charging':'Plan home EV charging with Fennor around your parking, driving routine and solar. Explore zappi modes, electrical requirements and available grant support.',
 '/solar/calculator':'Calculate solar panel capacity and explore electricity-value scenarios. Adjust panel size, self-use and tariffs, with assumptions and limitations explained.',
 '/solar/cost':'Understand solar-panel costs in Ireland in 2026. See what shapes the installed price, how grants fit and what to compare in a complete quotation.',
 '/solar/grants-funding':'Talk to Fennor about solar and battery support for your home, business or farm. Understand the relevant route, eligibility and steps for your project.',
 '/solar/faq-advice':'Your solar questions, answered by topic. Explore roofs, electricity bills, batteries and export, then talk to Fennor about the options for your property.',
 '/solar/projects-case-studies':'Explore solar installation photographs with Fennor. See how roof space and daily electricity use shape the possibilities for your own property.',
 '/renovations':'Plan home renovations in Slane, Navan and across Meath and Louth with Fennor. Explore kitchens, bathrooms and connected full-home projects.',
 '/renovations/full-home':'Rethink your home with Fennor. Plan the layout, essential repairs and order of work, with the price, disruption and handover explained before you decide.',
 '/renovations/kitchens':'Plan a kitchen that works for your daily routine with Fennor. Bring together layout, storage, lighting, appliances and the work behind the finishes.',
 '/renovations/bathrooms':'Discuss your bathroom renovation with Fennor. Plan the layout, water supply, ventilation and finishes around a calmer, more practical everyday routine.',
 '/renovations/older-homes':'Bring your older-home renovation plans to Fennor. Discuss character, comfort, repairs and the specialist assessment your building may need.',
 '/renovations/projects-case-studies':'Explore renovation design ideas with Fennor, from connected kitchens to calmer bathrooms. Use these concepts to start a conversation about your own home.',
 '/retrofitting':'Plan home energy upgrades in Slane, Navan and across Meath and Louth. Bring insulation, ventilation and heating together around your comfort and budget.',
 '/retrofitting/whole-home':'Plan a warmer, more comfortable home with Fennor. Bring insulation, windows, ventilation and heating together, with costs and next steps explained.',
 '/retrofitting/insulation':'Explore attic, wall and floor insulation in Meath with Fennor, planned around cold rooms, your home’s construction, moisture and future renovations.',
 '/retrofitting/windows-doors':'Understand the 2026 windows and doors grant and plan energy-efficient replacements in Meath with Fennor, including fitting, making good and ventilation.',
 '/retrofitting/ventilation':'Explore home ventilation and MVHR in Meath with Fennor. Start with condensation or stuffy rooms, then assess suitable fresh-air options and maintenance.',
 '/retrofitting/grants-funding':'Make sense of individual retrofit grants with Fennor. Understand eligible measures, approval steps and how supported work can fit into a connected plan for your home.',
 '/retrofitting/projects-case-studies':'Explore retrofit design concepts with Fennor. Discuss how insulation, windows, ventilation and heating could improve the comfort of your own home.',
 '/heat-pumps':'Explore heat pumps in Slane, Navan and across Meath and Louth with Fennor. Understand suitability, assessment, heating changes, grants and next steps.',
 '/heat-pumps/air-to-water':'Explore air-to-water heating with Fennor. Understand what changes for your radiators, hot water and home, from assessment to using the new controls.',
 '/heat-pumps/suitability':'Unsure whether your home suits a heat pump? Start with Fennor, your current heating and comfort concerns, then discuss the assessment and any upgrades needed.',
 '/heat-pumps/with-solar':'Bring solar and heat-pump plans together with Fennor. Discuss your seasonal electricity use, hot-water routine, battery options and realistic energy expectations.',
 '/heat-pumps/grants':'Talk to Fennor about heat-pump grant support, your existing system and the proposed work. Understand the funding components, evidence and next steps.',
 '/heat-pumps/faq':'Radiators, hot water, controls and running costs: explore practical heat-pump answers, then talk to Fennor about what the changes would mean for your home.',
 '/building':'Planning building work in Meath? Slane-based Fennor helps with house extensions, new builds and attic conversions in Navan and across Meath and Louth.',
 '/building/extensions':'Plan a house extension in Slane, Navan or across Meath with Fennor, around useful space, light, garden connection, costs and everyday disruption.',
 '/building/new-builds':'Plan a new build in Slane, Navan or across Meath with Fennor. Turn the site, layout and energy ideas into clear design, cost and construction decisions.',
 '/building/attic-conversions':'Explore an attic conversion in Slane, Navan or across Meath. Understand space, stairs, structure, fire safety, comfort and the work involved.',
 '/about':'Meet family-run Fennor Developments, rooted in Slane, Co. Meath. Approachable, professional help with solar, renovations and a more comfortable home.',
 '/about/your-project':'See what happens when you bring a project to Fennor, from your first call to a clear proposal, the work on site, handover and help afterwards.',
 '/about/reviews':'Your experience matters to Fennor. Share feedback, ask about relevant work or talk directly to our team about what matters to you before choosing us.',
 '/about/areas':'Based in Slane, Fennor serves Navan and communities across Meath and Louth, with Dublin enquiries welcome. Explore local services and check project coverage.',
 '/advice':'Explore Fennor’s practical homeowner guides to solar, renovations, retrofitting and heat pumps. Find a useful starting point and discuss your own project.',
 '/advice/grant-updates':'Browse Irish solar, electrical, energy-efficiency, heat-pump, retrofit and renovation grants with Fennor. Compare amounts, eligibility and official sources.',
 '/advice/news':'Read Fennor’s practical ideas for a more comfortable, useful home. Explore energy and renovation topics and bring your questions into a project conversation.',
 '/contact':'Contact Fennor Developments in Slane about solar or a home-improvement project. Call 089 403 2737 or send an enquiry for our team to review.',
 '/contact/assessment':'Tell Fennor what you want to improve. We explain the assessment your project needs, what it covers and any cost before a visit is agreed.',
};
export function editorialMetadata(path:string):Metadata{
 const page=editorialPages[path];if(!page)return{};
 const title=`${page.title} | Fennor`,url=`https://fennor.ie${path}`,description=searchDescriptions[path]??page.intro;
 return{title,description,alternates:{canonical:url},openGraph:{title,description,url,type:'website',locale:'en_IE',siteName:'Fennor Developments',images:[{url:`https://fennor.ie/images/${page.image}`,alt:page.alt}]},twitter:{card:'summary_large_image',title,description,images:[`https://fennor.ie/images/${page.image}`]}};
}
function PageSchema({page,path}:{page:PageData;path:string}){
 const url=`https://fennor.ie${path}`,segments=path.split('/').filter(Boolean),crumbs=[{name:'Home',item:'https://fennor.ie/'}];
 for(let i=1;i<=segments.length;i++){const part='/'+segments.slice(0,i).join('/');crumbs.push({name:allPages.find(p=>p.path===part)?.label??segments[i-1],item:'https://fennor.ie'+part});}
 const pageType=path==='/about'?'AboutPage':page.kind==='contact'?'ContactPage':page.kind==='overview'||page.kind==='project'?'CollectionPage':'WebPage';
 const graph={'@context':'https://schema.org','@graph':[
  {'@type':pageType,'@id':url+'#webpage',url,name:page.title,description:searchDescriptions[path]??page.intro,inLanguage:'en-IE',isPartOf:{'@id':'https://fennor.ie/#website'},publisher:{'@id':'https://fennor.ie/#organization'},breadcrumb:{'@id':url+'#breadcrumb'},primaryImageOfPage:{'@type':'ImageObject',contentUrl:`https://fennor.ie/images/${page.image}`,caption:page.alt}},
  {'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))},
  // Accurate FAQ markup remains useful structured content, not a promise of
  // Google FAQ rich results (retired in May 2026) or a ranking improvement.
  ...(page.questions.length?[{'@type':'FAQPage','@id':url+'#questions',isPartOf:{'@id':url+'#webpage'},mainEntity:page.questions.map(({q,a})=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}]:[]),
 ]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,'\\u003c')}}/>;
}
function ProjectGallery({path}:{path:string}){
 const family=path.split('/')[1],real=family==='solar';
 const galleries:Record<string,[string,string,string][]>= {
 solar:[['domestic-white-outbuilding.webp','A smaller roof, carefully considered.','A solar installation on an outbuilding. Show us your roof and we will explore how its space could work for you.'],['domestic-inverter.webp','The system behind the panels.','The inverter needs a suitable, accessible location too. We consider the complete installation, not only what fits on the roof.']],
 renovations:[['renovations-02.webp','Natural materials. A connected layout.','Retaining character while improving light, storage and movement.'],['bathroom-concept.webp','A calmer daily routine.','A compact bathroom with considered wet areas, storage and finishes.']],
 retrofitting:[['retrofit-03.webp','Comfort beyond the surface.','A warmer home, with windows, insulation and heating considered together.'],['retrofit-detail-concept.webp','The edges deserve attention.','Showing how a window meets the surrounding wall. The right detail for your home follows its assessment.']],
 building:[['extension-concept.webp','Old and new, in conversation.','Connecting an existing home to a garden-facing living space.'],['new-build-concept.webp','A home shaped by its setting.','A countryside home with a simple form and generous light.']],
 };
 return <section className="ep-gallery ep-shell" id="gallery"><div className="ep-section-heading"><div><p className="ep-kicker">{real?'SUPPLIED PHOTOGRAPHY':'DESIGN STUDIES / NOT COMPLETED PROJECTS'}</p><h2>{real?'Look closer.':'Explore the possibilities.'}</h2></div><p>{real?'Solar installation photographs to help you explore what may suit your own property.':'Ideas for your own home. These are design concepts, not photographs of completed customer projects.'}</p></div><div className="ep-gallery-grid">{galleries[family].map(([image,title,description])=><figure key={image}><div><Image src={`/images/${image}`} alt={title+(real?' — supplied photograph':' — design concept')} fill sizes="(max-width: 750px) 90vw, 44vw"/></div><figcaption><h3>{title}</h3><p>{description}</p></figcaption></figure>)}</div></section>;
}
// Give each subject a clear editorial identity while retaining the shared layout.
// These headings describe the adjacent content, rather than repeating keywords.
const sectionHeadings:Record<string,{detail:[string,string];prep:[string,string];questions:[string,string]}>= {
 '/solar':{detail:['How you use electricity.','How solar could help.'],prep:['Your property. Your routine.','A useful place to start.'],questions:['Choosing solar.','Where to begin.']},
 '/solar/accessories/eddi':{detail:['Hot water from surplus solar.','Does it suit your home?'],prep:['Tell us about your hot water.','We will look at the options.'],questions:['EDDI, explained.','Before you add it.']},
 '/solar/accessories/backup-power':{detail:['Know the essentials.','Design what stays on.'],prep:['A power-cut plan.','Not just a switch.'],questions:['Backup power.','The important limits.']},
 '/solar/accessories/ev-charging':{detail:['Charge around your life.','Not just the sunshine.'],prep:['Your car. Your driveway.','Your charging routine.'],questions:['Solar and your EV.','Make the connection.']},
 '/solar/calculator':{detail:['See what changes the result.','Then apply it to your home.'],prep:['Your bills make','the picture clearer.'],questions:['Your calculator results.','What do they mean?']},
 '/solar/cost':{detail:['The price is more than a panel count.','Compare the complete scope.'],prep:['Bring the quotations.','And the questions behind them.'],questions:['Solar costs in 2026.','What should you compare?']},
 '/solar/grants-funding':{detail:['Solar support, explained.','For the project you have in mind.'],prep:['Tell us about your property.','We will explain the route.'],questions:['Solar funding.','Which support applies?']},
 '/solar/faq-advice':{detail:['Your roof. Your electricity.','Your solar questions.'],prep:['What would you like to know?','Ask Fennor.'],questions:['The questions behind','a better solar decision.']},
 '/solar/projects-case-studies':{detail:['A roof with potential.','A system with a purpose.'],prep:['Your roof. Your routine.','Tell us about both.'],questions:['From these examples','to your own property.']},
 '/renovations':{detail:['A better brief.','A more useful renovation.'],prep:['What works today?','What needs to change?'],questions:['Before the renovation.','A clearer conversation.']},
 '/renovations/full-home':{detail:['Rethink the whole home.','We plan beyond the finishes.'],prep:['The home you have.','The home you need.'],questions:['A full-home renovation.','What can you expect?']},
 '/renovations/kitchens':{detail:['First, the way it works.','Then, the way it looks.'],prep:['Bring the measurements.','And your morning routine.'],questions:['A better kitchen.','The practical decisions.']},
 '/renovations/bathrooms':{detail:['A bathroom that works.','From the pipes to the finish.'],prep:['A better daily routine.','Tell us what would help.'],questions:['Bathroom planning.','Details that matter daily.']},
 '/renovations/older-homes':{detail:['The character you love.','The comfort you need.'],prep:['Your home has a history.','Tell us what you know.'],questions:['An older home.','Where do we begin?']},
 '/renovations/projects-case-studies':{detail:['A direction you love.','A home that works for you.'],prep:['Bring your ideas.','And the things you would change.'],questions:['Inspired by a concept?','Let’s talk about your home.']},
 '/retrofitting':{detail:['Your home, understood.','Your next step, clearer.'],prep:['Tell us what feels wrong.','We can start there.'],questions:['Your retrofit with Fennor.','A few useful answers.']},
 '/retrofitting/whole-home':{detail:['One home.','Improvements that work together.'],prep:['A warmer home starts','with your priorities.'],questions:['A whole-home project.','Your questions, answered.']},
 '/retrofitting/insulation':{detail:['Where you feel the cold.','Where we begin.'],prep:['Tell us about the house.','Bring what you have.'],questions:['Insulation for your home.','Let’s make it clearer.']},
 '/retrofitting/windows-doors':{detail:['More than a new frame.','A better everyday view.'],prep:['The openings you use.','The changes you want.'],questions:['Your windows and doors.','A few practical answers.']},
 '/retrofitting/ventilation':{detail:['A fresher home.','Planned around you.'],prep:['Tell us what you notice.','Room by room.'],questions:['Fresh air and comfort.','Your questions, answered.']},
 '/retrofitting/grants-funding':{detail:['Your plans first.','The support that may fit.'],prep:['You do not need every answer.','Start the conversation.'],questions:['Funding your upgrade.','A clearer way forward.']},
 '/retrofitting/projects-case-studies':{detail:['Comfort you can picture.','A plan for your own home.'],prep:['What would you change?','Tell Fennor.'],questions:['From inspiration','to your next step.']},
 '/heat-pumps':{detail:['Your home. Your heating.','Let’s join the dots.'],prep:['Start with how it feels.','And what it costs.'],questions:['Thinking about a heat pump?','Start here.']},
 '/heat-pumps/air-to-water':{detail:['Everyday warmth.','A considered change.'],prep:['The heating you have.','The comfort you want.'],questions:['What would change?','Let’s make it clearer.']},
 '/heat-pumps/suitability':{detail:['No need to guess.','Let’s understand your home.'],prep:['Bring what you know.','We will explain the next step.'],questions:['Is a heat pump right for you?','Let’s look at your home.']},
 '/heat-pumps/with-solar':{detail:['Your electricity. Your heating.','One conversation.'],prep:['Tell us about your routine.','And the systems you have.'],questions:['Solar and heating together.','What it means at home.']},
 '/heat-pumps/grants':{detail:['Heat-pump grants, explained.','Alongside the work you need.'],prep:['Your existing heating.','The changes you have in mind.'],questions:['Heat-pump funding.','Where your home fits.']},
 '/heat-pumps/faq':{detail:['Comfort, cost and controls.','Let’s talk through them.'],prep:['Bring your questions.','That is a useful start.'],questions:['Your heat-pump questions.','Plain-language answers.']},
 '/building':{detail:['Room for your ideas.','A clear plan for the build.'],prep:['Tell us what you have in mind.','Bring the plans you have.'],questions:['Building with Fennor.','What happens next?']},
 '/building/extensions':{detail:['More useful space.','A better-connected home.'],prep:['What would an extra room change?','That is where we start.'],questions:['Planning an extension.','Your questions, answered.']},
 '/building/new-builds':{detail:['Your site. Your new home.','A plan to bring them together.'],prep:['The way you want to live.','The place you want to build.'],questions:['A new home.','From plans to the build.']},
 '/building/attic-conversions':{detail:['Space above you.','Could it become the room you need?'],prep:['Tell us how you would use it.','We will explain the checks.'],questions:['An attic conversion.','What is possible?']},
 '/about':{detail:['A family business.','A personal approach.'],prep:['Tell us what matters.','We will start there.'],questions:['Getting to know Fennor.','A few starting questions.']},
 '/about/your-project':{detail:['Your first call.','Your home, ready to enjoy.'],prep:['Tell us what matters most.','We will plan the next step.'],questions:['Your project with Fennor.','What can you expect?']},
 '/about/reviews':{detail:['Your experience matters.','Your questions are welcome.'],prep:['Tell us what matters to you.','We can talk it through.'],questions:['Customer feedback.','A direct conversation.']},
 '/about/areas':{detail:['Rooted in Slane.','Ready to hear about your project.'],prep:['Tell us where.','Tell us what you need.'],questions:['Where we work.','Is your property in our area?']},
 '/advice':{detail:['A clearer picture.','An easier next step.'],prep:['Find the topic that matters.','Bring us your questions.'],questions:['Useful advice.','Help for your own home.']},
 '/advice/grant-updates':{detail:['New support.','A useful conversation.'],prep:['Your home and your plans.','Let’s find the starting point.'],questions:['Making sense of the update.','Where your project fits.']},
 '/advice/news':{detail:['Ideas for everyday living.','A starting point with Fennor.'],prep:['Something caught your eye?','Tell us about your home.'],questions:['From an idea','to your next conversation.']},
 '/contact':{detail:['Start with the project.','Keep it simple.'],prep:['Your location. Your priorities.','Your preferred contact.'],questions:['Getting in touch.','What happens next?']},
 '/contact/assessment':{detail:['Tell us what you want to improve.','We will explain the assessment.'],prep:['Bring what you have.','No need to guess the rest.'],questions:['Requesting an assessment.','What happens after you enquire?']},
};
export default function EditorialPage({path}:{path:string}){
 const page=editorialPages[path],family=path.split('/')[1],group=pageGroups.find(g=>g.path===`/${family}`),label=allPages.find(p=>p.path===path)?.label??page.title;
 const kind=page.kind??'service',related=page.related??[],headings=sectionHeadings[path];
 const bespokeOnly=['about','advice','contact'].includes(family);
 const homeEnergy=['retrofitting','heat-pumps'].includes(family);
 const ArchitectureExperience=family==='solar'?SolarSupportingExperience:['renovations','building'].includes(family)?RenovationBuildingExperience:['retrofitting','heat-pumps'].includes(family)?RetrofitHeatingExperience:bespokeOnly?CompanyAdviceExperience:null;
 const firstDestination=path==='/advice/grant-updates'?'#grant-directory':path==='/about'?'#detail':path==='/solar/calculator'?'#sizer-title':homeEnergy||kind==='contact'?'#enquire':kind==='overview'?'#explore':'#detail';
 const firstAction=path==='/advice/grant-updates'?'Browse grants & funding':path==='/about'?'Get to know Fennor':path==='/solar/calculator'?'Try the solar calculators':homeEnergy?'Talk to Fennor':kind==='contact'?'Start the conversation':kind==='overview'?'Explore your options':'See how we help';
 return <div className={`ep-page ep-${family} ep-${kind}`}><PageSchema page={page} path={path}/><a className="skip-link" href="#main">Skip to content</a>
 <SiteHeader editorial/>
 <main id="main"><div className="ep-shell ep-crumbs"><a href="/">Home</a><span>/</span>{group&&path!==group.path&&<><a href={group.path}>{group.label}</a><span>/</span></>}<span aria-current="page">{label}</span></div>
 <section className="ep-hero ep-shell"><div className="ep-hero-copy"><p className="ep-kicker">FENNOR / {label.toUpperCase()}</p><h1>{page.headline}<br/><em>{page.accent}</em></h1><p className="ep-intro">{page.intro}</p><div className="ep-hero-actions"><a href={firstDestination} className="ep-button">{firstAction} <span aria-hidden="true">↗</span></a><a href="tel:+353894032737">089 403 2737</a></div></div>
 <EditorialHeroVisual image={page.image} alt={page.alt} portrait={kind!=='overview'&&kind!=='product'} sizes={kind==='overview'?'(max-width: 1800px) 88vw, 1584px':'(max-width: 900px) 88vw, 44vw'} caption={path==='/about'?'SLANE BRIDGE / THE PLACE WE CALL HOME':kind==='product'?'PRODUCT DETAIL / MANUFACTURER PHOTOGRAPHY':kind==='project'?'INSPIRATION FOR YOUR OWN PROJECT':path==='/renovations'||path==='/heat-pumps'?'A VISION FOR YOUR HOME':'THOUGHTFULLY PLANNED. BETTER CONNECTED.'} film={path==='/renovations'?'/films/renovation-living-motion.mp4':path==='/heat-pumps'?'/films/heat-pump-garden-motion.mp4':undefined}/></section>
 {path==='/about'&&<p className="ep-local-photo-credit ep-shell">Slane Bridge photograph by <a href="https://commons.wikimedia.org/wiki/File:Slane_Bridge.jpg" target="_blank" rel="noopener noreferrer">Nordision</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Resized and cropped for layout.</p>}
 <nav className="ep-jump ep-shell" aria-label="On this page">{path==='/solar/calculator'?<><a href="#sizer-title">01 System size</a><a href="#value">02 Electricity value</a><a href="#detail">03 Understand the numbers</a></>:<><a href="#detail">{homeEnergy?'01 Your home & options':'01 Explore your options'}</a>{related.length>0&&<a href="#explore">02 Explore more</a>}</>}{(path==='/advice/grant-updates'||grantsForPath(path).length>0)&&<a href={path==='/advice/grant-updates'?'#grant-directory':'#grant-options'}>Grants & funding</a>}<a href="#questions">{path==='/solar/calculator'?'04':'03'} Your questions</a><a href="#enquire">{path==='/solar/calculator'?'05':'04'} Your next step</a></nav>
 <div id="detail" className="ep-page-story">
 {ArchitectureExperience&&<ArchitectureExperience path={path}/>}
 </div>
 {kind==='overview'&&<PageLinks page={page} path={path} prominent/>}
 {kind==='project'&&family==='retrofitting'&&<ProjectGallery path={path}/>}
 {['/retrofitting','/retrofitting/whole-home'].includes(path)&&<HomeUpgradeExplorer mode="retrofit"/>}
 {['/heat-pumps','/heat-pumps/air-to-water'].includes(path)&&<HomeUpgradeExplorer mode="heating"/>}
 {page.feature==='calculator'&&<div className="ep-shell ep-calculators"><PanelSizer/><EnergyValue/></div>}
 {page.feature==='readiness'&&path!=='/heat-pumps/suitability'&&<div className="ep-shell"><ReadinessChecklist/></div>}
 {page.feature==='journey'&&path!=='/about/your-project'&&<div className="ep-shell"><ProjectJourney/></div>}
 {page.feature==='surplus'&&<section className="ep-shell ep-surplus" aria-labelledby="surplus-title"><h2 id="surplus-title">One surplus.<br/><em>Choose what matters.</em></h2><SurplusExplorer/></section>}
 {!bespokeOnly&&<><section className="ep-detail ep-shell" id="practical-detail"><div className="ep-detail-heading"><p className="ep-kicker">YOUR PROJECT WITH FENNOR</p><h2>{headings.detail[0]}<br/><em>{headings.detail[1]}</em></h2><p>{kind==='project'?'Something you like? Tell us what caught your eye and we will explore the possibilities for your property.':'We explain the choices, the work involved and what happens next, so you can decide with a clearer picture.'}</p></div><div className="ep-article-list">{page.sections.map(([heading,text],i)=><article key={heading}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{heading}</h3><p>{text}</p></div></article>)}</div></section>
 <section className="ep-prep"><div className="ep-shell ep-prep-inner"><div><p className="ep-kicker">A SIMPLE START</p><h2>{headings.prep[0]}<br/><em>{headings.prep[1]}</em></h2></div><ul>{page.checklist.map((item,i)=><li key={item}><span>{String(i+1).padStart(2,'0')}</span>{item}<b aria-hidden="true">↗</b></li>)}</ul></div></section></>}
 {kind!=='overview'&&<PageLinks page={page} path={path}/>}
 {path!=='/advice/grant-updates'&&<GrantDirectory path={path}/>}
 <section className="ep-questions ep-shell" id="questions"><div><p className="ep-kicker">USEFUL ANSWERS</p><h2>{headings.questions[0]}<br/><em>{headings.questions[1]}</em></h2><p>Plain language. No pressure to have it all figured out.</p></div><div>{page.questions.map(({q,a},i)=><details key={q}><summary><span>{String(i+1).padStart(2,'0')}</span><h3>{q}</h3><b aria-hidden="true">+</b></summary><p>{a}</p></details>)}</div></section>
 {page.sources&&<aside className="ep-sources ep-shell"><p className="ep-kicker">OFFICIAL GUIDANCE</p><div>{page.sources.map(([name,url])=><a key={url} href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a>)}</div><p className="ep-small">Guidance checked <time dateTime="2026-10-09">9 October 2026</time>. We will help you understand how it relates to your plans. Current official requirements and the assessment of your property determine what applies.</p></aside>}
 <section className="ep-enquiry ep-shell" id="enquire"><div><p className="ep-kicker">LET’S TAKE THE NEXT STEP</p><h2>{homeEnergy?'Let’s talk about your home.':kind==='contact'?'Start with a conversation.':'Talk to Fennor.'}<br/><em>{homeEnergy?'And what could feel better.':'Tell us what you have in mind.'}</em></h2>{homeEnergy&&<p>Cold rooms, rising bills or a heating system you want to change? Tell us what matters most. We explain the assessment and options for your home—you do not need to choose the equipment or a grant scheme first.</p>}<p>Based in Slane, serving Meath, Louth and Dublin. Tell us about a project further afield and we will confirm whether we can help.</p><a className="ep-phone" href="tel:+353894032737">089 403 2737 ↗</a><a href={enquiryEmailHref({ primary: 'info@fennor.ie' })}>info@fennor.ie</a><p className="ep-small">We will confirm the next step, availability and any assessment cost with you before a visit is booked.</p></div><ProjectEnquiry topic={label}/></section>
 {family==='solar'&&path.split('/').length===3&&<div className="ep-shell ep-solar-related"><SolarRelated current={path.split('/')[2]}/></div>}
 </main></div>;
}
function PageLinks({page,path,prominent=false}:{page:PageData;path:string;prominent?:boolean}){
 const links=page.related??[];if(!links.length)return null;
 return <section className={`ep-links ep-shell ${prominent?'ep-links-prominent':''}`} id="explore"><div className="ep-section-heading"><div><p className="ep-kicker">MORE WAYS WE CAN HELP</p><h2>{prominent?'Find your starting point.':'Keep exploring.'}</h2></div><span>{String(links.length).padStart(2,'0')} / RELATED GUIDES</span></div><div className="ep-link-grid">{links.map((href,i)=>{const clean=href.split('#')[0],target=editorialPages[clean],label=allPages.find(p=>p.path===clean)?.label??clean.split('/').pop()?.replaceAll('-',' ');return <a href={href} key={href} className="ep-destination"><span className="ep-destination-number">{String(i+1).padStart(2,'0')}</span><div><h3>{label}</h3>{prominent&&<p>{target?.intro??({domestic:'A system shaped around your roof and daily electricity use.',commercial:'Put your roof to work around your business’s electricity needs.',farm:'Make use of shed space around the way your farm runs.','battery-storage':'Keep more of your solar electricity for when you need it.',accessories:'Hot water, car charging, backup and better control.','ground-mounted':'Explore solar on your land when the roof is not the right fit.'}[clean.split('/').pop()??'']??'Find practical answers and see how Fennor can help.')}</p>}</div><b aria-hidden="true">↗</b></a>})}</div></section>;
}
