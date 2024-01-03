<template>
  <article class="post">
    <span class="post-date">
      <time :datetime="date">{{ formatDate(date) }}</time>
      <span class="menu-spp"></span>
      <span>{{ time }} min read</span>
    </span>
    <div class="post-body">
      <h3 class="post-title">
        <VueLink :to="url">{{ title }}</VueLink>
      </h3>
      <p class="post-description">{{ description }}</p>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    date: String,
    time: Number,
    url: String,
    title: String,
    description: String,
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);

      return date.toLocaleDateString("en-US", {
        year: "numeric",
      });
    },
  },
};
</script>
