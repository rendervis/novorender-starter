import { defineConfig } from "vite";
import { resolve } from "path";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [
    copy({
      targets: [
        {
          src: "node_modules/@novorender/webgl-api/render.js",
          dest: "public/novorender/webgl-api",
        },
        {
          src: "node_modules/@novorender/webgl-api/geometry.js",
          dest: "public/novorender/webgl-api",
        },
      ],
      verbose: true,
    }),
  ],

  appType: "mpa",
});
