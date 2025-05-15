/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Status colors (light mode)
    'bg-indigo-600',
    'bg-red-600',
    'bg-yellow-600',
    'bg-green-600',
    'text-indigo-600',
    'text-red-600',
    'text-yellow-600',
    'text-green-600',
    'bg-red-100',
    'text-red-800',
    'bg-yellow-100',
    'text-yellow-800',
    'bg-green-100',
    'text-green-800',
    
    // Dark mode variants
    'dark:bg-indigo-500',
    'dark:bg-red-500',
    'dark:bg-yellow-500',
    'dark:bg-green-500',
    'dark:text-indigo-100',
    'dark:text-red-100',
    'dark:text-yellow-100',
    'dark:text-green-100',
    'dark:bg-red-900',
    'dark:text-red-100',
    'dark:bg-yellow-900',
    'dark:text-yellow-100',
    'dark:bg-green-900',
    'dark:text-green-100',
  ],
  theme: {
    extend: {
      colors: {
        // You can add custom colors that work well in both modes
        primary: {
          DEFAULT: '#4f46e5', // indigo-600
          dark: '#6366f1',    // indigo-500 (lighter for dark mode)
        },
        danger: {
          DEFAULT: '#dc2626', // red-600
          dark: '#ef4444',   // red-500
        }
      },
    },
  },
  plugins: [],
}