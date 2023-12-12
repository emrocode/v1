<template>
  <section class="hero">
    <h1 class="hero-title">Emilio <span>Romero</span></h1>
    <p class="hero-description">
      <span>Front-end developer,</span> I combine creativity and technical skills to create
      innovative solutions.
    </p>
    <div class="hero-menu">
      <Link v-for="item in heroLinks" :to="item.path" :key="item.key" class="hero-button center">
        <component :is="item.icon" />
        <span>{{ item.key }}</span>
      </Link>
    </div>
  </section>
</template>
<script>
import config from "@config";

export default {
  data() {
    return {
      heroLinks: config.heroLinks,
    };
  },
};
</script>
