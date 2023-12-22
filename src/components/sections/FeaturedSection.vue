<script setup>
import GitHubIcon from "@/assets/icons/brand/IconTelegram.vue";
</script>
<template>
  <section>
    <div class="section">
      <h2 class="section-title">noteworthy projects</h2>
      <p class="section-paragraph">
        Most notable projects on GitHub.
        <Link :to="to" class="link">View the {{ to.key }}</Link>
      </p>
    </div>
    <Fetch :url="apiURL" :maxItems="maxItems" />
  </section>
</template>
<script>
import config from "@config";

export default {
  data() {
    return {
      apiURL: import.meta.env.VITE_API_ENDPOINT,
      maxItems: 4,
      to: config.navs.top[0],
    };
  },
};
</script>
