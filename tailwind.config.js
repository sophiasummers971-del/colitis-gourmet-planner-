/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f4',
          100: '#e3e7dd',
          200: '#c7d0bb',
          300: '#a5b392',
          400: '#84976e',
          500: '#687d52',
          600: '#526341',
          700: '#424f35',
          800: '#37402d',
          900: '#2f3627',
        },
        terracotta: {
          50: '#fdf6f3',
          100: '#faebe5',
          200: '#f5d5c9',
          300: '#edb7a3',
          400: '#e39173',
          500: '#d9734e',
          600: '#c95d39',
          700: '#a74b2e',
          800: '#8b3f29',
          900: '#723726',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
