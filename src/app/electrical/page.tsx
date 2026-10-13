import ElectricalPage, { electricalMetadata } from '@/components/electrical/ElectricalPage';

export const metadata = electricalMetadata('overview');

export default function ElectricalOverview() {
  return <ElectricalPage pageKey="overview" />;
}
