import { defineConfig } from 'vitest/config';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
