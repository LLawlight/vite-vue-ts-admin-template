import { createApp } from "vue";

import "normalize.css";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { VueSvgIconPlugin } from "@yzfe/vue3-svgicon";
import "@yzfe/svgicon/lib/svgicon.css";

import "@/styles/element-variables.scss";
import "@/styles/index.scss";

import App from "@/App.vue";
import router from "@/router";
import "@/permission";

createApp(App)
  .use(ElementPlus)
  .use(VueSvgIconPlugin, {
    tagName: "svg-icon",
  })
  .use(router)
  .mount("#app");
