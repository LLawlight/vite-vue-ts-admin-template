import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgicon from "vite-plugin-svgicon";
import styleImport from "vite-plugin-style-import";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "/vite-vue-ts-admin-template/"
      : "/",
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
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
});
