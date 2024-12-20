<template>
  <PCHomeView v-if="device.includes('Windows')" />
  <MobileHomeView v-else />
  <!-- device is Android or iOS -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      device: "",
    };
  },
  mounted() {
    console.log(navigator.userAgent);
    this.device = navigator.userAgent;
  },
});
</script>
