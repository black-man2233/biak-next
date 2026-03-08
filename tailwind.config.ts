import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50:  '#fdf9f3',
          100: '#f5f0e8',
          200: '#e8ddd0',
          300: '#d4c4b0',
          400: '#bea38a',
          500: '#a67c5b',
          600: '#8b5e3c',
        },
        terra: {
          50:  '#fdf1ec',
          100: '#f9ddd3',
          200: '#f0b9a6',
          300: '#e48d74',
          400: '#d4633f',
          500: '#8b4513',
          600: '#7a3a0f',
          700: '#62300d',
          800: '#4d260b',
          900: '#3b1d09',
        },
        gold: {
          50:  '#fdf9ec',
          100: '#faf0ca',
          200: '#f4de90',
          300: '#edca56',
          400: '#e8b92e',
          500: '#c9a84c',
          600: '#a8842a',
          700: '#856313',
        },
        stone: {
          50: '#fafaf9',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'Cambria', 'serif'],
        sans:  ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
} satisfies Config
