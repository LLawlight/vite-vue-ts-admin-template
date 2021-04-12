import Layout from "@/layout/index.vue";

export default [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "Login",
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "Dashboard",
          icon: "dashboard",
        },
      },
    ],
  },
  {
    path: "/example",
    component: Layout,
    redirect: "/example/tree",
    meta: {
      title: "Example",
      icon: "example",
    },
    children: [
      {
        path: "tree",
        component: () => import("@/views/tree/index.vue"),
        meta: {
          title: "Tree",
          icon: "tree",
        },
      },
      {
        path: "table",
        component: () => import("@/views/table/index.vue"),
        meta: {
          title: "Table",
          icon: "table",
        },
      },
    ],
  },
  {
    path: "/form",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/form/index.vue"),
        meta: {
          title: "Form",
          icon: "form",
        },
      },
    ],
  },
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    meta: {
      title: "Nested",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index.vue"),
        redirect: "/nested/menu1/menu1-1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1/index.vue"),
            meta: { title: "Menu1-1" },
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2/index.vue"),
            redirect: "/nested/menu1/menu1-2/menu1-2-1",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1/index.vue"),
                meta: { title: "Menu1-2-1" },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2/index.vue"),
                meta: { title: "Menu1-2-2" },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3/index.vue"),
            meta: { title: "Menu1-3" },
          },
        ],
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index.vue"),
        meta: { title: "Menu2" },
      },
    ],
  },
  {
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "https://llawlight.github.io/vite-vue-ts-admin-template",
        // 一个标准的 `RouteRecordRaw` 必须具有 `component` 或者 `redirect`
        redirect: "",
        meta: {
          title: "External Link",
          icon: "link",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: { hidden: true },
  },
];
