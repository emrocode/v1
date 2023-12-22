<template>
  <article class="card">
    <span class="card-date">{{ formatDate(date) }}</span>
    <div class="card-body">
      <h3 class="card-title">
        <Link :to="external">{{ name }}</Link>
      </h3>
      <p class="card-paragraph">{{ description }}</p>
    </div>
    <ul class="menu card-stats">
      <li class="menu-item">{{ stargazers_count }} Stars</li>
      <li class="menu-item">{{ language || "Unknown" }}</li>
    </ul>
  </article>
</template>
<script>
export default {
  props: {
    date: String,
    external: String,
    name: String,
    description: String,
    stargazers_count: String,
    language: String,
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    },
  },
};
</script>
