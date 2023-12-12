<script setup>
import { RouterView } from "vue-router";
import MainLayout from "@/components/MainLayout.vue";
</script>
<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>
<script>
export default {
  components: {
    MainLayout,
  },
};
</script>
