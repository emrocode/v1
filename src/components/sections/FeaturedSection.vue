<template>
  <section>
    <div class="section">
      <h2 class="section-title">Projects</h2>
      <p class="section-paragraph">List of projects, examples and things I've done.</p>
    </div>
    <DataGrabber :url="apiURL" :maxItems="maxItems" />
  </section>
</template>
<script>
import DataGrabber from "@/components/DataGrabber.vue";

export default {
  components: {
    DataGrabber,
  },
  data() {
    return {
      apiURL: import.meta.env.VITE_API_URL,
      maxItems: 4,
    };
  },
};
</script>
