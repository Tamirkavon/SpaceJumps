/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        syncopate: ['Syncopate', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        space: {
          bg:      '#0a0a1a',
          surface: '#0f0f26',
          card:    '#12122e',
          border:  '#1a1a3e',
          cyan:    '#00f0ff',
          orange:  '#ff6b35',
          purple:  '#c084fc',
          green:   '#22c55e',
          red:     '#ef4444',
          gold:    '#f59e0b',
          text:    '#e0e6ff',
          muted:   '#4a4e7a',
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
