import type {Metadata} from 'next';
import { enquiryEmailHref } from '@/config/contact';
import LegalPage from '@/components/LegalPage';
import {companyInformation as company} from '@/config/company-information';

const title='Company information';
const description='Company details for Fennor Developments Ltd, registered in Ireland under number 810147, with its registered office in Fennor, Slane, Co. Meath.';
export const metadata:Metadata={title:`${title} | Fennor`,description,alternates:{canonical:'https://fennor.ie/company-information'}};

export default function CompanyInformationPage(){
  return <LegalPage title={title} intro="The company behind Fennor. Our registered details and the simplest ways to get in touch." sections={[
    {id:'registered-details',title:'Our registered details',content:<dl>
      <dt>Company name</dt><dd>{company.legalName}</dd>
      <dt>Legal form</dt><dd>Limited company</dd>
      <dt>Registered in</dt><dd>{company.placeOfRegistration}</dd>
      <dt>CRO registration number</dt><dd>{company.registrationNumber}</dd>
      <dt>Registered office</dt><dd><address>{company.registeredOffice}</address></dd>
    </dl>},
    {id:'contact',title:'Talk to Fennor',content:<><p>For an enquiry about your property, an existing job or these company details, email <a href={enquiryEmailHref({ primary: 'info@fennor.ie' })}>info@fennor.ie</a> or call <a href="tel:+353894032737">089 403 2737</a>. You can also use our <a href="/contact#enquire">online enquiry form</a>.</p><p>Please contact us to arrange any visit. Publishing a registered-office address does not mean a walk-in appointment has been booked.</p></>},
    {id:'where-we-work',title:'Rooted in Slane',content:<><p>Fennor is a family-run business based in Slane, Co. Meath. Our main service area is Meath, Louth and Dublin. We also welcome commercial solar enquiries from across Ireland and confirm coverage for each project.</p><p>Read <a href="/about">our story</a> or <a href="/about/areas">check your project area</a>.</p></>},
    {id:'your-information',title:'Your information',content:<p>Our <a href="/privacy">privacy notice</a> explains how we handle an enquiry and relevant information when you go ahead with a project.</p>},
  ]}/>;
}
