/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B1020',
          secondary: '#111827',
          card: '#151D30',
          cardHover: '#1B253D',
          border: '#1E293B',
          borderLight: '#26334D',
          primary: '#6366F1',
          primaryHover: '#4F46E5',
          accent: '#06B6D4',
          accentHover: '#0891B2',
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
          text: '#F8FAFC',
          muted: '#94A3B8',
          subtle: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Courier New', 'monospace']
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.45)',
        'glow-primary': '0 0 20px -5px rgba(99, 102, 241, 0.3)',
        'glow-accent': '0 0 20px -5px rgba(6, 182, 212, 0.3)',
      }
    },
  },
  plugins: [],
}
