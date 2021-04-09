import { createApp } from "vue";

import "normalize.css";
import Element3 from "element3";
import { VueSvgIconPlugin } from "@yzfe/vue3-svgicon";
import "@yzfe/svgicon/lib/svgicon.css";

import "@/styles/element-variables.scss";
import "@/styles/index.scss";

import App from "@/App.vue";
import router from "@/router";
import "@/permission";

createApp(App)
  .use(Element3)
  .use(VueSvgIconPlugin, {
    tagName: "svg-icon",
  })
  .use(router)
  .mount("#app");
