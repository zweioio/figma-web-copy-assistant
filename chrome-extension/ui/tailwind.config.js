
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        figma: {
          bg: '#ffffff',
          text: '#333333',
          border: '#e5e5e5',
          hover: '#f5f5f5',
          brand: '#0d99ff', // Figma Blue
          success: '#10b981' // Green
        }
      },
      boxShadow: {
        'figma': '0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
