<template>
  <section>
    <div class="section">
      <h2 class="section-title">Notable projects</h2>
      <p class="section-paragraph">List of projects, examples and things I've done.</p>
    </div>
    <Fetch :url="apiURL" :maxItems="maxItems" />
  </section>
</template>
<script>
export default {
  data() {
    return {
      apiURL: import.meta.env.VITE_API_ENDPOINT,
      maxItems: 4,
    };
  },
};
</script>
