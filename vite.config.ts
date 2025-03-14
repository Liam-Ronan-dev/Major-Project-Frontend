import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    // ...,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    watch: false,
    globals: true, // Enables global expect() & test() functions
    environment: 'jsdom', // Simulates browser-like environment for React testing
    exclude: ['tests/E2E/**', 'node_modules', 'dist'], // Excludes Playwright tests
    coverage: {
      provider: 'istanbul', // Generates coverage report
      reporter: ['text', 'json', 'html'], // Output formats
    },
  },
});
