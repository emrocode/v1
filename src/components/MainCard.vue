<script setup>
import IconGithub from "@/assets/icons/brand/IconGithub.vue";
import IconBriefcase from "@/assets/icons/IconBriefcase.vue";
</script>
<template>
  <article class="card">
    <component :is="language !== 'Work' ? IconGithub : IconBriefcase" class="card-icon" />
    <span class="card-date">
      <time :datetime="date">{{ formatDate(date) }}</time>
    </span>
    <div class="card-body">
      <h3 class="card-title">
        <VueLink :to="github">{{ formatName(name) }}</VueLink>
      </h3>
      <p class="card-paragraph">{{ description }}</p>
    </div>
    <ul class="menu card-stats">
      <li class="menu-item">{{ stargazers_count }} Stars</li>
      <li class="menu-item menu-spp"></li>
      <li class="menu-item">{{ language || "Unknown" }}</li>
    </ul>
  </article>
</template>
<script>
export default {
  props: {
    date: String,
    github: String,
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
    formatName(name) {
      return name
        .replace(/-/g, " ")
        .replace(/and/g, "&")
        .replace(/api|rest|js/gi, match => match.toUpperCase());
    },
  },
};
</script>
