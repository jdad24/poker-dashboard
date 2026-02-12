import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Import the plugin

// https://vitejs.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add the plugin to the plugins array
  ],
  server: {
    proxy: {
      // Proxy requests starting with '/api'
      '/api': {
        target: 'http://localhost:5000', // The address of your Express server
        changeOrigin: true,        
      },
    },
  },
});
