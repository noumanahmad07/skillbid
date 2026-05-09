/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: 'var(--white)',
        off: 'var(--off)',
        off2: 'var(--off2)',
        border: 'var(--border)',
        border2: 'var(--border2)',
        text: 'var(--text)',
        text2: 'var(--text2)',
        muted: 'var(--muted)',
        dim: 'var(--dim)',
        indigo: 'var(--indigo)',
        indigo2: 'var(--indigo2)',
        'indigo-light': 'var(--indigo-light)',
        'indigo-mid': 'var(--indigo-mid)',
        emerald: 'var(--emerald)',
        'emerald-light': 'var(--emerald-light)',
        amber: 'var(--amber)',
        'amber-light': 'var(--amber-light)',
        red: 'var(--red)',
        'red-light': 'var(--red-light)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Epilogue', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        lg: 'var(--shadow-lg)',
      },
      spacing: {
        nav: 'var(--nav-h)',
      },
      height: {
        nav: 'var(--nav-h)',
      }
    },
  },
  plugins: [],
}
