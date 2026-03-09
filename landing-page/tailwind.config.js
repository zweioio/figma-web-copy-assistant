/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'super-bg': '#ffffff',
        'super-text': '#0f172a',
        'super-text-secondary': '#475569',
        'super-primary': '#2563eb', // Blue-600
        'super-secondary': '#7c3aed', // Violet-600
        'glass-bg': 'rgba(255, 255, 255, 0.8)',
        'glass-border': 'rgba(255, 255, 255, 0.6)',
      },
      fontFamily: {
        'sans': ['"Inter"', 'system-ui', 'sans-serif'],
        'display': ['"SF Pro Display"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #ffffff 100%)',
        'gradient-primary': 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        'soft': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.2)',
      }
    },
  },
  plugins: [],
}