import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte()
  ],
  server: {
    host: true,
    port: 1234,
    strictPort: true,
    proxy: {
        "/ws": {
            "target": "http://localhost:8080/",
            "ws": true
        },
    },
  },
});