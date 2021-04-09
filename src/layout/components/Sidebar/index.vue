<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppModule } from "@/store/modules/app";
import SidebarItem from "./SidebarItem.vue";

export default defineComponent({
  name: "SideBar",

  components: {
    SidebarItem,
  },

  setup() {
    const { meta, path } = useRoute();
    const { options } = useRouter();

    const sidebar = computed(() => {
      return AppModule.sidebar;
    });

    const routes = computed(() => {
      return options.routes;
    });

    const activeMenu = computed(() => {
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });

    const isCollapse = computed(() => {
      return !sidebar.value.opened;
    });

    return {
      routes,
      activeMenu,
      isCollapse,
    };
  },
});
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
