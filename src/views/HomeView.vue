<script setup>
import HeroSection from "@/components/sections/HeroSection.vue";
import FeaturedSection from "@/components/sections/FeaturedSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
</script>
<template>
  <HeroSection />
  <FeaturedSection />
  <ContactSection />
</template>
<script>
export default {
  components: {
    HeroSection,
    FeaturedSection,
    ContactSection,
  },
};
</script>
