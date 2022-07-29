// vite.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "https://personalwebsite-3y4.pages.dev",
  server: {
    proxy: {
      "^/api/*": {
        target: "https://jared-sauve.herokuapp.com",
        secure: false,
        changeOrigin: true,
      },
      "^/uploads/*": {
        target: "https://jared-sauve.herokuapp.com",
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
