import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        board: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.03), transparent 35%), linear-gradient(145deg, #0b1610, #12261a 55%, #102117)'
      },
      colors: {
        brand: {
          red: '#8f1f1d',
          green: '#1f6d3b',
          gold: '#e4be65'
        }
      },
      boxShadow: {
        panel: '0 6px 14px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
