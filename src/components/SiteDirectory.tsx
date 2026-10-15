import BrandLogo from './BrandLogo';
import {pageGroups} from '@/config/page-map';
import {companyInformation} from '@/config/company-information';
import {isProductionSite} from '@/config/launch';
import {ENQUIRY_RECIPIENTS,enquiryEmailHref} from '@/config/contact';
import './site-directory.css';

export default function SiteDirectory() {
  const order=['/solar','/electrical','/building','/renovations','/retrofitting','/about','/advice','/contact'];
  const groups=order.map(path=>pageGroups.find(group=>group.path===path)).filter((group):group is (typeof pageGroups)[number]=>Boolean(group));
  const heatPumps=pageGroups.find(group=>group.path==='/heat-pumps');
  return <footer className="site-directory" aria-label="Fennor website information">
    <div className="sd-heading">
      <a href="/" className="sd-brand"><BrandLogo/><span>Building smarter. Powering the future.</span></a>
      <div><p>Explore the whole picture.</p><a className="sd-back-top" href="#site-top">Back to top ↑</a></div>
    </div>
    <nav aria-label="Full website directory" className="sd-groups">
      {groups.map(group => <details key={group.path}>
        <summary>{group.label}<span aria-hidden="true">+</span></summary>
        <div>{group.pages.map(([slug, label]) => <a key={slug} href={group.path + (slug ? `/${slug}` : '')}>{label}<span aria-hidden="true">↗</span></a>)}{group.path==='/retrofitting'&&heatPumps&&<><span className="sd-subheading">Heat pumps</span>{heatPumps.pages.map(([slug,label])=><a key={slug} href={heatPumps.path+(slug?`/${slug}`:'')}>{label}<span aria-hidden="true">↗</span></a>)}</>}</div>
      </details>)}
    </nav>
    <div className="sd-bottom"><span>Fennor Developments Ltd · Slane, Co. Meath, Ireland</span><a href="tel:+353894032737">089 403 2737</a>{ENQUIRY_RECIPIENTS.map(email=><a key={email} href={enquiryEmailHref({primary:email})}>{email}</a>)}</div>
    <div className="sd-legal"><span>© 2026 Fennor Developments Ltd. · Registered in Ireland · No. {companyInformation.registrationNumber}</span>{!isProductionSite&&<span>Independent design preview · Not the live website</span>}<nav aria-label="Legal information"><a href="/privacy">Privacy</a><a href="/company-information">Company information</a><a href="/solar/faq-advice">Helpful answers ↗</a></nav></div>
  </footer>;
}
