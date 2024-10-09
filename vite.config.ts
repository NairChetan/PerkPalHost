import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy for API requests
      '/api': {
        target: 'https://172.16.4.89:8443', // The URL of your backend server
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Use this if your backend uses self-signed certs
      },
    },
  },
  preview: {
    port: 3000,
  },
  base: '/',
});
