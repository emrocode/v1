<script setup>
import MainLink from "@/components/MainLink.vue";
</script>
<template>
  <section>
    <div class="error absolute">
      <h1 class="error-title">404</h1>
      <p class="error-paragraph">Oops! this page could not be found.</p>
      <MainLink to="/" class="error-button">go home</MainLink>
    </div>
  </section>
</template>
