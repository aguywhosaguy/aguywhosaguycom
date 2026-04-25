import tailwindcss from "@tailwindcss/vite"

import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  server: {
    preset: "bun" // Set to vercel on prod
  }
});
