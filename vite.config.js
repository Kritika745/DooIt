import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      // Tailwind configuration
      content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
      theme: {
        extend: {
          colors: {
            // Custom colors for the application
            primary: {
              DEFAULT: 'var(--primary)',
              dark: 'var(--primary-dark)',
            },
            secondary: 'var(--secondary)',
            danger: 'var(--danger)',
            success: 'var(--success)',
            background: 'var(--background)',
            foreground: 'var(--foreground)',
            'high-priority': '#ef4444',
            'medium-priority': '#f59e0b',
            'low-priority': '#10b981',
          },
        },
      },
      // Add any plugins you need
      plugins: [
        // If you need forms plugin, uncomment this line and install it:
        // require('@tailwindcss/forms')
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})