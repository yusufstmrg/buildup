import { defineConfig } from 'vite';

export default defineConfig({
  // … konfigurasi lain …
  server: {
    host: '0.0.0.0',   // dengarkan pada semua interface
    port: 3000,        // atau port lain yang Anda suka
    watch: {
      ignored: [
        '**/Archive/**',
        '**/IT & Multimedia/**/Video/*.zip',
        '**/node_modules/**',
        '**/.git/**'
      ]
    }
  }
});