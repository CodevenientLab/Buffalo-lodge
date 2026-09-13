import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The workflow supplies /Buffalo-lodge/. Change BASE_PATH to / for a custom domain.
export default defineConfig({
  base: process.env.BASE_PATH || '/Buffalo-lodge/',
  plugins: [react()],
  build: { rollupOptions: { input: { main: 'index.html', enquire: 'enquire/index.html', privacy: 'privacy/index.html', terms: 'terms/index.html' } } }
});
