<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">
      roles: <span v-for="role in roles" :key="role">{{ role }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { UserModule } from "@/store/modules/user";

export default defineComponent({
  name: "Dashboard",

  setup() {
    const name = computed(() => {
      return UserModule.name;
    });

    const roles = computed(() => {
      return UserModule.roles;
    });

    return {
      name,
      roles,
    };
  },
});
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
