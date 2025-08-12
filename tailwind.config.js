/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00FFFF',
          50: '#80FFFF',
          100: '#66FFFF',
          200: '#4DFFFF',
          300: '#33FFFF',
          400: '#1AFFFF',
          500: '#00FFFF',
          600: '#00E6E6',
          700: '#00CCCC',
          800: '#00B3B3',
          900: '#009999',
          950: '#008080',
        },
        accent: '#00FFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 255, 0.3)',
        'neon-lg': '0 0 30px rgba(0, 255, 255, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'spotlight': 'spotlight 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spotlight: {
          '0%': { transform: 'translate(-50%, -50%) scale(0.8)' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.2)' },
          '100%': { transform: 'translate(-50%, -50%) scale(0.8)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
