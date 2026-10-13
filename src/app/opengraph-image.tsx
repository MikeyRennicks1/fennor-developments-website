import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
export const alt = 'Fennor — Solar, renovations and retrofits in Meath, Louth and Dublin';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/images/logo-social.png'));
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#191c28', color: '#fdfdfb', padding: '46px 70px', borderBottom: '10px solid #df8d54' }}>
      <img src={`data:image/png;base64,${logo.toString('base64')}`} width={250} height={115} alt="" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ fontSize: 69, letterSpacing: -3 }}>A better home.</div>
        <div style={{ fontSize: 69, letterSpacing: -3 }}>A brighter future.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 25 }}>Solar PV · Renovations · Retrofit</div>
        <div style={{ fontSize: 20, color: '#d5dedf' }}>Slane, Co. Meath · Meath, Louth &amp; Dublin · fennor.ie</div>
      </div>
    </div>, size,
  );
}
