import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // ✅ Enables global expect() & test() functions
    environment: 'jsdom', // ✅ Simulates browser-like environment for React testing
    exclude: ['tests/e2e/**', 'node_modules', 'dist'], // ✅ Excludes Playwright tests
    coverage: {
      provider: 'istanbul', // ✅ Generates coverage report
      reporter: ['text', 'json', 'html'], // ✅ Output formats
    },
  },
});
