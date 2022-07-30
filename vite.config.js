// vite.config.js
import { replaceCodePlugin } from "vite-plugin-replace";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");
// https://vitejs.dev/config/
export default defineConfig((command) => {
  if (command === "build") {
    return {
      plugins: [
        replaceCodePlugin({
          replacements: [
            {
              from: "__SITE_BASE__",
              to: "https://strapi.jaredsauve.com",
            },
          ],
        }),
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
    };
  } else {
    return {
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
        replaceCodePlugin({
          replacements: [
            {
              from: "__SITE_BASE__",
              to: "http://localhost:8080",
            },
          ],
        }),
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
    };
  }
});
