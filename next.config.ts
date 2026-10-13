import type { NextConfig } from 'next';
import { legacyRedirects } from './src/config/legacy-redirects';
import { assertProductionLaunch } from './src/config/launch';
assertProductionLaunch();
const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() { return [...legacyRedirects, { source: '/favicon.ico', destination: '/icon.svg', permanent: false }]; },
};
export default config;
