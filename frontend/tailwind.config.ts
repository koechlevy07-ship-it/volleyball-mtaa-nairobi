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
        'vball-blue': '#0057B8',
        'vball-yellow': '#FFD100',
        'vball-navy': '#002147',
        'vball-bg': '#F5F7FA',
        'vball-text': '#111827',
        'vball-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 10px rgba(0, 33, 71, 0.08)',
      }
    },
  },
  plugins: [],
};
export default config;