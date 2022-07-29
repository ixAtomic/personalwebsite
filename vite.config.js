// vite.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "http://localhost:8080",
  server: {
    proxy: {
      "^/api/*": {
        target: "http://localhost:8090",
        secure: false,
        changeOrigin: true,
      },
      "^/uploads/*": {
        target: "http://localhost:8090",
        secure: false,
        changeOrigin: true,
      },
    },
    port: 8080,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2,
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      vue: "@vue/compat",
    },
  },
});
