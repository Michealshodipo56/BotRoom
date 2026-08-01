/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Light mode colors (matching the dashboard design)
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          border: '#e2e8f0',
          text: {
            primary: '#1e293b',
            secondary: '#64748b',
            tertiary: '#94a3b8'
          }
        },
        // Dark mode colors (current design)
        dark: {
          bg: '#000000',
          surface: '#0f172a',
          border: '#1e293b',
          text: {
            primary: '#ffffff',
            secondary: '#cbd5e1',
            tertiary: '#64748b'
          }
        },
        // Brand colors (work in both themes)
        brand: {
          primary: '#6366f1', // indigo-500
          secondary: '#3b82f6', // blue-500
          gradient: {
            from: '#8b5cf6', // violet-500
            to: '#3b82f6'     // blue-500
          }
        }
      }
    },
  },
  plugins: [],
}