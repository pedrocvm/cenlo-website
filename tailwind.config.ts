import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        bg2:      'var(--bg2)',
        surface:  'var(--surface)',
        surface2: 'var(--surface2)',
        panel:    'var(--panel)',
        ink:      'var(--ink)',
        ink2:     'var(--ink2)',
        muted:    'var(--muted)',
        line:     'var(--line)',
        line2:    'var(--line2)',
        terra:    'var(--terra)',
        terraD:   'var(--terraD)',
        terraBg:  'var(--terraBg)',
        terraBtn: 'var(--terraBtn)',
        olive:    'var(--olive)',
        oliveBg:  'var(--oliveBg)',
        amber:    'var(--amber)',
        amberBg:  'var(--amberBg)',
      },
      fontFamily: {
        sans:    ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        display: ['var(--font-schibsted)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { maxw: '1160px' },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        dotPulse: {
          '0%,100%': { opacity: '0.35' },
          '50%':     { opacity: '1' },
        },
      },
      animation: {
        'fade-up':   'fadeUp .5s ease both',
        'fade-up-d': 'fadeUp .6s ease both',
        'dot-pulse': 'dotPulse 1.6s infinite',
      },
    },
  },
  plugins: [],
}

export default config
