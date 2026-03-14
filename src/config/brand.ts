/**
 * Brand identity: logo, colours, naming.
 * Add logo.png to public/ for the header logo (navy + orange gear).
 * If the file is missing, the header and footer fall back to text.
 */

export const brand = {
  displayName: "Fennor Developments",
  legalName: "Fennor Developments Ltd",
  useLtd: true,
  tagline: "Building Smarter. Powering the Future.",
  /** Path to logo in /public (e.g. /logo.png). If missing, header shows text. */
  logoPath: "/logo.png",
  logoAlt: "Fennor Developments",
  /**
   * Optional square favicon for Google search results (recommended 48×48 or 64×64).
   * If set, used as the tab/search result icon; otherwise the main logo is used.
   * Add e.g. favicon.png to public/ and set to "/favicon.png" for best display in Google.
   */
  faviconPath: undefined as string | undefined,
} as const;

/** Professional orange from logo (gear) – sharp, confident. */
export const brandColors = {
  navy: { DEFAULT: "#1e293b", dark: "#0f172a", light: "#334155" },
  gold: { DEFAULT: "#d4a853", light: "#e5c078", dark: "#b8923f" },
  /** Logo gear / accent – use in active states or small accents so the palette feels intentional */
  accent: {
    orange: "#b45309",
    orangeLight: "#c45a0a",
    orangeDark: "#8c4007",
  },
} as const;
