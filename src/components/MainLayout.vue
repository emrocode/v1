<script setup>
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
</script>
<template>
  <MainHeader />
  <main class="container">
    <slot />
  </main>
  <MainFooter v-if="showFooter" />
</template>
<script>
export default {
  components: {
    MainHeader,
    MainFooter,
  },
  computed: {
    showFooter() {
      return this.$route.name !== "error";
    },
  },
};
</script>
