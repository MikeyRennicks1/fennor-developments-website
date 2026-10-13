import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ElectricalPage, { electricalMetadata } from '@/components/electrical/ElectricalPage';
import { electricalServices, type ElectricalService } from '@/config/electrical';

export const dynamicParams = false;
export function generateStaticParams() { return electricalServices.map(service => ({ service })); }

function isElectricalService(service: string): service is ElectricalService {
  return electricalServices.some(key => key === service);
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  if (!isElectricalService(service)) notFound();
  return electricalMetadata(service);
}

export default async function ElectricalServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  if (!isElectricalService(service)) notFound();
  return <ElectricalPage pageKey={service} />;
}
