import { companyInformation, privacyNoticeApproved } from './company-information';

/**
 * Server/build-time launch gate. Never use NODE_ENV alone: Vercel previews also
 * run production builds. Changing the flag requires a fresh approved build.
 * Leave FENNOR_SITE_LIVE unset in Development and Preview environments.
 */
export type LaunchEnvironment = {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
  FENNOR_SITE_LIVE?: string;
};

export type LaunchReadiness = {
  legalName: string | null;
  registrationNumber: string | null;
  registeredOffice: string | null;
  placeOfRegistration: string | null;
  verified: boolean;
  privacyNoticeApproved: boolean;
};

const currentReadiness: LaunchReadiness = { ...companyInformation, privacyNoticeApproved };

export function getLaunchBlockers(readiness: LaunchReadiness = currentReadiness): string[] {
  const missing = (['legalName', 'registrationNumber', 'registeredOffice', 'placeOfRegistration'] as const)
    .filter(key => !readiness[key]?.trim()).map(key => `Company information: ${key}`);
  if (!readiness.verified) missing.push('Owner confirmation of company information');
  if (!readiness.privacyNoticeApproved) missing.push('Owner approval of the privacy notice and actual data-handling practices');
  return missing;
}

export function getLaunchSettings(environment: LaunchEnvironment = {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_ENV: process.env.VERCEL_ENV,
  FENNOR_SITE_LIVE: process.env.FENNOR_SITE_LIVE,
}, readiness: LaunchReadiness = currentReadiness) {
  const productionRequested = environment.NODE_ENV === 'production'
    && environment.VERCEL_ENV === 'production'
    && environment.FENNOR_SITE_LIVE === 'true';
  const blockers = getLaunchBlockers(readiness);
  const indexable = productionRequested && blockers.length === 0;
  return {
    productionRequested,
    blockers,
    indexable,
    metadataRobots: { index: indexable, follow: indexable },
    robotsRule: indexable
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
  };
}

/** Fail the approved-production build instead of silently publishing incomplete legal information. */
export function assertProductionLaunch(environment?: LaunchEnvironment, readiness?: LaunchReadiness) {
  const settings = getLaunchSettings(environment, readiness);
  if (settings.productionRequested && settings.blockers.length) {
    throw new Error(`Fennor production launch is blocked: ${settings.blockers.join('; ')}. Leave FENNOR_SITE_LIVE unset while reviewing.`);
  }
}

// Use only in server components (including the footer), never in a client bundle.
export const isProductionSite = getLaunchSettings().indexable;

// Legal information is additional to, not a change to, the original 48-page scope.
export const legalPagePaths = ['/privacy', '/company-information'] as const;
