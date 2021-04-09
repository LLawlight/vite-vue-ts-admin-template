<template>
  <div :class="[{ 'is-active': isActive }]" @click="toggleClick">
    <svg-icon :data="hamburger" original width="20" height="20" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import hamburger from "@/icons/svg/hamburger.svg";

export default defineComponent({
  name: "Hamburger",

  props: {
    isActive: {
      type: Boolean,
      deault: false,
    },
  },

  emits: ["toggle-click"],

  setup(_, { emit }) {
    const toggleClick = () => {
      emit("toggle-click");
    };

    return {
      hamburger,

      toggleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
