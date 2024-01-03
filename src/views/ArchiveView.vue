<template>
  <section>
    <VueFetcher :url="apiURL" />
  </section>
</template>
<script>
export default {
  data() {
    return {
      apiURL: import.meta.env.VITE_GITHUB_ENDPOINT,
    };
  },
};
</script>
