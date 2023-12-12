<template>
  <section>
    <DataGrabber :url="apiURL" />
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
    };
  },
};
</script>
