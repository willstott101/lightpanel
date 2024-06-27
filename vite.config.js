import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin()
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