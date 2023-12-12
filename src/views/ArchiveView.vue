<template>
  <section>
    <Fetch :url="apiURL" />
  </section>
</template>
<script>
export default {
  data() {
    return {
      apiURL: import.meta.env.VITE_API_ENDPOINT,
    };
  },
};
</script>
