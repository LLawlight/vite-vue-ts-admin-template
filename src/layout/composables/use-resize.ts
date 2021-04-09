import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { AppModule, DeviceType } from "@/store/modules/app";

const WIDTH = 992;

export function useResize() {
  const route = useRoute();

  const device = computed(() => {
    return AppModule.device;
  });

  const sidebar = computed(() => {
    return AppModule.sidebar;
  });

  watch(route, () => {
    if (device.value === DeviceType.Mobile && sidebar.value.opened) {
      AppModule.CloseSideBar(false);
    }
  });

  onBeforeMount(() => {
    window.addEventListener("resize", resizeHandler);
  });

  onMounted(() => {
    const isMobile = getIsMobile();
    if (isMobile) {
      AppModule.ToggleDevice(DeviceType.Mobile);
      AppModule.CloseSideBar(true);
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
  });

  const getIsMobile = () => {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };

  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = getIsMobile();
      AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);
      if (isMobile) {
        AppModule.CloseSideBar(true);
      }
    }
  };

  return {
    device,
    sidebar,
  };
}
