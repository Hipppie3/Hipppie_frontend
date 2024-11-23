import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all API requests
      '/api': {
        target: 'http://localhost:5005', // Backend server
        changeOrigin: true,
        secure: false, // For HTTPS (if needed)
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Strip '/api' prefix if not used in backend
      },
    },
  },
});
