/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFF8F4',
        cream: '#FFFBF7',
        peach: '#FBE8DE',
        blush: '#F8DDE0',
        dustypink: '#F3C8CB',
        rose: '#C98282',
        warmbrown: '#8C6258',
        champagne: '#D8AE82',
        text: {
          DEFAULT: '#493A37',
          muted: '#967D76'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        handwriting: ['Parisienne', 'cursive'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
