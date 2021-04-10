import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

export default createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),  // Disabled due to Github Pages doesn't support this, enable this if you need.
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes,
});
