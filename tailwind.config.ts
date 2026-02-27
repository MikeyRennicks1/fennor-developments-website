import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111827",
        graphite: "#0f172a",
        slate: "#111827",
        navy: { DEFAULT: "#1e293b", dark: "#0f172a", light: "#334155" },
        accent: {
          DEFAULT: "#0d9488",
          light: "#14b8a6",
          dark: "#0f766e",
        },
        "solar-orange": {
          DEFAULT: "#ea580c",
          light: "#f97316",
          dark: "#c2410c",
        },
        gold: { DEFAULT: "#d4a853", light: "#e5c078", dark: "#b8923f" },
        "accent-orange": "#b45309",
        "off-white": "#fafaf9",
        "off-white-alt": "#f5f5f4",
        "celtic-green": "#2d5a27",
        "celtic-green-light": "#3d6b36",
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.1" }],
        "hero-sm": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.15" }],
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-up-delay": "slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      boxShadow: {
        card: "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
        "card-hover":
          "0 24px 48px -12px rgb(15 23 42 / 0.2), 0 12px 24px -8px rgb(15 23 42 / 0.12)",
        "card-3d":
          "0 12px 24px -6px rgb(0 0 0 / 0.08), 0 4px 12px -4px rgb(0 0 0 / 0.06), 0 0 0 1px rgb(0 0 0 / 0.04)",
        "card-3d-hover":
          "0 28px 56px -12px rgb(15 23 42 / 0.2), 0 14px 28px -10px rgb(15 23 42 / 0.14), 0 0 0 1px rgba(13, 148, 136, 0.15)",
        "accent-glow": "0 0 32px -4px rgba(13, 148, 136, 0.4)",
        "orange-glow": "0 0 28px -4px rgba(234, 88, 12, 0.4)",
        "gold-glow": "0 0 28px -4px rgba(212, 168, 83, 0.35)",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(180deg, rgba(212,168,83,0.12) 0%, rgba(15,23,42,0.5) 30%, rgba(15,23,42,0.88) 65%, rgba(15,23,42,0.96) 100%)",
        "gradient-hero-overlay":
          "linear-gradient(180deg, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.82) 50%, rgba(15,23,42,0.94) 100%)",
        "gradient-cta":
          "linear-gradient(135deg, #ea580c 0%, #f97316 50%, #ea580c 100%)",
        "gradient-accent-band":
          "linear-gradient(90deg, rgba(13,148,136,0.08) 0%, rgba(13,148,136,0.2) 50%, rgba(13,148,136,0.08) 100%)",
        "gradient-gold-band":
          "linear-gradient(90deg, rgba(212,168,83,0.06) 0%, rgba(212,168,83,0.18) 50%, rgba(212,168,83,0.06) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
