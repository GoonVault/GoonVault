import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html', // Ensure this points to your entry point
    },
  },
  server: {
    open: true,
  },
});