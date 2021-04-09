import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgicon from "vite-plugin-svgicon";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import 'src/styles/_variables.scss';
          @import 'src/styles/_mixins.scss';
        `,
      },
    },
  },
  plugins: [
    vue(),
    svgicon({
      include: ["**/svg/**/*.svg"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
});
