import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-mulish)", "Mulish", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        // Theme-aware tokens (drive dark mode). See globals.css for values.
        "theme-primary": "var(--color-primary)",
        "theme-primary-hover": "var(--color-primary-hover)",
        "theme-accent": "var(--color-accent)",
        "bg-base": "var(--color-bg-base)",
        "bg-elevated": "var(--color-bg-elevated)",
        "bg-sunken": "var(--color-bg-sunken)",
        "content-primary": "var(--color-text-primary)",
        "content-secondary": "var(--color-text-secondary)",
        "content-muted": "var(--color-text-muted)",
        "theme-success": "var(--color-success)",
        "theme-warning": "var(--color-warning)",
        "theme-error": "var(--color-error)",
        "theme-border": "var(--color-border)",
      },
      maxWidth: {
        prose: "72ch",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fall: {
          "0%": { transform: "translateY(-8%)", opacity: "0" },
          "15%": { opacity: "1" },
          "100%": { transform: "translateY(108%)", opacity: "0" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 400ms ease-out both",
        fadeIn: "fadeIn 300ms ease-out both",
        fall: "fall 7s linear infinite",
      },
      boxShadow: {
        "neu-raised": "6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light)",
        "neu-raised-sm": "3px 3px 6px var(--shadow-dark), -3px -3px 6px var(--shadow-light)",
        "neu-raised-lg": "12px 12px 24px var(--shadow-dark), -12px -12px 24px var(--shadow-light)",
        "neu-sunken": "inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light)",
        "neu-sunken-sm": "inset 2px 2px 4px var(--shadow-dark), inset -2px -2px 4px var(--shadow-light)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
