<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <section>
    <div class="error absolute">
      <h1 class="error-title">404</h1>
      <p class="error-paragraph">Oops! {{ this.$route.path }} could not be found.</p>
      <RouterLink to="/" class="error-button">go home</RouterLink>
    </div>
  </section>
</template>
