module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        cyber: {
          green: '#00ff5e',
          blue: '#00ffff',
          purple: '#fc00ff',
          dark: '#0a0a12',
          pink: '#ff00ff',
          yellow: '#ffff00'
        }
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
        digital: ['"Digital Numbers"', 'monospace']
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        scanline: {
          'from': { transform: 'translateY(-100%)' },
          'to': { transform: 'translateY(100%)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        }
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
    },
  },
  plugins: [],
}