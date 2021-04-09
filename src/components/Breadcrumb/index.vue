<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noredirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { compile } from "path-to-regexp";
import { defineComponent, ref, watch } from "vue";
import { RouteMeta, useRoute, useRouter } from "vue-router";

interface BreadcrumbItem {
  path: string;
  meta: RouteMeta;
  [name: string]: any;
}

export default defineComponent({
  name: "Breadcrumb",

  setup() {
    const route = useRoute();
    const router = useRouter();

    const breadcrumbs = ref<BreadcrumbItem[]>([]);

    watch(route, () => {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      getBreadcrumb();
    });

    const getBreadcrumb = () => {
      let matched: BreadcrumbItem[] = route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];
      if (!isDashboard(first)) {
        matched = [
          {
            path: "/dashboard",
            meta: { title: "Dashboard" },
          } as BreadcrumbItem,
        ].concat(matched);
      }
      breadcrumbs.value = matched.filter((item) => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false;
      });
    };

    const isDashboard = (route: BreadcrumbItem) => {
      const name = route && route.meta && route.meta.title;
      return name === "Dashboard";
    };

    const pathCompile = (path: string) => {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = route;
      const toPath = compile(path);
      return toPath(params);
    };

    const handleLink = (item: any) => {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push(pathCompile(path));
    };

    return {
      breadcrumbs,

      handleLink,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
