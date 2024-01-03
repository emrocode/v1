<script setup>
import HeroSection from "@/components/sections/HeroSection.vue";
import FeaturedSection from "@/components/sections/FeaturedSection.vue";
import DevSection from "@/components/sections/DevSection.vue";
</script>
<template>
  <HeroSection />
  <FeaturedSection />
  <DevSection />
</template>
<script>
export default {
  components: {
    HeroSection,
    FeaturedSection,
    DevSection,
  },
};
</script>
