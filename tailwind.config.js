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
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        },
        secondary: {
          50: '#fff0f6',
          100: '#ffd6e7',
          200: '#ffadd2',
          300: '#ff85c0',
          400: '#f759ab',
          500: '#eb2f96',
          600: '#c41d7f',
          700: '#9e1068',
          800: '#780650',
          900: '#520339',
        },
        accent: {
          50: '#fff7e6',
          100: '#ffe7ba',
          200: '#ffd591',
          300: '#ffc069',
          400: '#ffa940',
          500: '#fa8c16',
          600: '#d46b08',
          700: '#ad4e00',
          800: '#873800',
          900: '#612500',
        },
        success: {
          50: '#f6ffed',
          100: '#d9f7be',
          200: '#b7eb8f',
          300: '#95de64',
          400: '#73d13d',
          500: '#52c41a',
          600: '#389e0d',
          700: '#237804',
          800: '#135200',
          900: '#092b00',
        },
        ocean: {
          50: '#e6fffb',
          100: '#b5f5ec',
          200: '#87e8de',
          300: '#5cdbd3',
          400: '#36cfc9',
          500: '#13c2c2',
          600: '#08979c',
          700: '#006d75',
          800: '#00474f',
          900: '#002329',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee2': 'marquee2 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(14, 165, 233, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
