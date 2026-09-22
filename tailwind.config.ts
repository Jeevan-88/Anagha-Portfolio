import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FBF9F5",
        "canvas-subtle": "#F3EFE9",
        "canvas-muted": "#E8E2D6",
        ink: {
          DEFAULT: "#141312",
          deep: "#0B0A09",
          soft: "#34322E",
          muted: "#6B665E",
          faint: "#A39E94",
        },
        saffron: {
          DEFAULT: "#D06B29",
          hover: "#B5581D",
          light: "#F7EBE2",
        },
        vermilion: "#B63D2B",
        leaf: "#28583E",
        indigo: "#21324E",
        border: {
          light: "rgba(20, 19, 18, 0.08)",
          medium: "rgba(20, 19, 18, 0.16)",
          dark: "rgba(20, 19, 18, 0.3)",
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.06em",
        wider: "0.12em",
        widest: "0.2em",
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};

export default config;
