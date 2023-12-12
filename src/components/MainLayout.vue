<script setup>
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
</script>
<template>
  <MainHeader />
  <main class="container">
    <slot />
  </main>
  <MainFooter v-if="isHome" />
</template>
<script>
export default {
  components: {
    MainHeader,
    MainFooter,
  },
  computed: {
    isHome() {
      return this.$route.name === "home";
    },
  },
};
</script>
