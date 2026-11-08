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
        medical: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#BAE0FF',
          300: '#7CC4FA',
          400: '#38A3F8',
          500: '#0C83EB',
          600: '#0066FF',
          700: '#0052CC',
          800: '#07429E',
          900: '#0B347A',
          950: '#061D47',
        },
        navy: {
          800: '#14213d',
          900: '#0B192C',
          950: '#050D18',
        },
        cyan: {
          glow: '#00F5D4',
        },
        pharma: {
          teal: '#00C9A7',
          mint: '#10B981',
          azure: '#0284C7',
          coral: '#F43F5E',
          amber: '#F59E0B',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(0, 102, 255, 0.3)',
        'glow-lg': '0 0 40px -10px rgba(0, 102, 255, 0.45)',
        'glow-cyan': '0 0 35px -8px rgba(0, 245, 212, 0.35)',
        'glass': '0 8px 32px 0 rgba(11, 25, 44, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

