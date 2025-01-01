import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173, // Change port since 8080 is used by WebSocket
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});