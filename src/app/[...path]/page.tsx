import {notFound} from 'next/navigation';
import EditorialPage,{editorialMetadata} from '@/components/EditorialPage';
import {editorialPages} from '@/config/editorial-pages';
const existingSolar=new Set(['/solar/calculator','/solar/grants-funding','/solar/projects-case-studies','/solar/faq-advice']);
export const dynamicParams=false;
export function generateStaticParams(){return Object.keys(editorialPages).filter(path=>!existingSolar.has(path)).map(path=>({path:path.slice(1).split('/')}));}
export async function generateMetadata({params}:{params:Promise<{path:string[]}>}){return editorialMetadata('/'+(await params).path.join('/'));}
export default async function Page({params}:{params:Promise<{path:string[]}>}){const path='/'+(await params).path.join('/');if(!editorialPages[path])notFound();return <EditorialPage path={path}/>;}
