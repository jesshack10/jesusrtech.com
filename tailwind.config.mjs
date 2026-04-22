/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        green:     'var(--accent-green)',
        blue:      'var(--accent-blue)',
        yellow:    'var(--accent-yellow)',
        base:      'var(--bg-base)',
        surface:   'var(--bg-surface)',
        elevated:  'var(--bg-elevated)',
        border:    'var(--border)',
        foreground:'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted:     'var(--text-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'var(--text-primary)',
            a: { color: 'var(--accent-blue)', textDecoration: 'underline' },
            'h1,h2,h3,h4': { color: 'var(--text-primary)' },
            code: { color: 'var(--accent-green)' },
            'pre code': { color: 'inherit' },
            blockquote: { borderLeftColor: 'var(--accent-blue)', color: 'var(--text-secondary)' },
            hr: { borderColor: 'var(--border)' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
