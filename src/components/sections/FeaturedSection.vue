<template>
  <section>
    <div class="box">
      <h2 class="box-title">notable projects</h2>
      <p class="box-paragraph">
        Most notable projects on GitHub&period;
        <VueLink :to="to" class="link">View the {{ to.key }}</VueLink>
      </p>
    </div>
    <VueFetcher :url="apiURL" :maxItems="maxItems" />
  </section>
</template>
<script>
import config from "@config";

export default {
  data() {
    return {
      apiURL: import.meta.env.VITE_GITHUB_ENDPOINT,
      maxItems: 4,
      to: config.navs.top[0],
    };
  },
};
</script>
