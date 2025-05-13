import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src/renderer'),
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true
  },
  build: {
    outDir: resolve(__dirname, 'dist/renderer'),
    emptyOutDir: true
  }
});