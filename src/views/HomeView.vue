<script setup>
import HeroSection from "@/components/sections/HeroSection.vue";
import SkillSection from "@/components/sections/SkillSection.vue";
import FeaturedSection from "@/components/sections/FeaturedSection.vue";
</script>
<template>
  <HeroSection />
  <SkillSection />
  <FeaturedSection />
</template>
<script>
export default {
  components: {
    HeroSection,
    SkillSection,
    FeaturedSection,
  },
  name: "MyComponent",
  meta: {
    title: "Page Title",
    meta: [
      { vmid: "description", name: "description", content: "This is a description" },
      // other meta tags
    ],
  },
};
</script>
