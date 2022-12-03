import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportWidth: 1200,
    viewportHeight: 900,
    baseUrl: 'http://127.0.0.1:5173/',
  },
});
