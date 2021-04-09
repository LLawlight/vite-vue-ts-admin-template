<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      'menu-wrapper',
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel },
    ]"
  >
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :data="icons[String(theOnlyOneChild.meta.icon)]"
            original
          />
          <template v-if="theOnlyOneChild.meta.title" v-slot:title>{{
            theOnlyOneChild.meta.title
          }}</template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template v-slot:title>
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :data="icons[String(item.meta.icon)]"
          original
        />
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import { isExternal } from "@/utils/validate";
import SidebarItemLink from "./SidebarItemLink.vue";
import dashboard from "@/icons/svg/dashboard.svg";
import example from "@/icons/svg/example.svg";
import tree from "@/icons/svg/tree.svg";
import table from "@/icons/svg/table.svg";
import form from "@/icons/svg/form.svg";
import nested from "@/icons/svg/nested.svg";
import link from "@/icons/svg/link.svg";

export default defineComponent({
  name: "SidebarItem",

  components: {
    SidebarItemLink,
  },

  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },

    isCollapse: {
      type: Boolean,
      default: false,
    },

    isFirstLevel: {
      type: Boolean,
      default: true,
    },

    basePath: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const icons: {
      [name: string]: string;
    } = {
      dashboard,
      example,
      tree,
      table,
      form,
      nested,
      link,
    };

    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false;
          } else {
            return true;
          }
        });
        return showingChildren.length;
      }
      return 0;
    });

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null;
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...props.item, path: "" };
    });

    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(props.basePath)) {
        return props.basePath;
      }

      return props.basePath + routePath;
    };

    return {
      icons,

      theOnlyOneChild,

      resolvePath,
    };
  },
});
</script>

<style lang="scss">
.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>
