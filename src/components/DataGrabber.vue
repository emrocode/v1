<script setup>
import MainLink from "@/components/MainLink.vue";
</script>
<template>
  <section>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error grabbing repositories. Try again later.</div>
    <TransitionGroup
      tag="div"
      class="wrapper"
      mode="out-in"
      appear
      @beforeEnter="beforeEnter"
      @enter="onEnter">
      <article class="card" v-for="(repo, i) in repoToShow" :key="repo.id" :data-index="i">
        <div v-if="matchRepo(repo.name)" class="card-used">used now</div>
        <div class="card-body">
          <span class="card-date">{{ formatDate(repo.created_at) }}</span>
          <h3 class="card-title">
            <MainLink :to="repo.html_url">{{ repo.name }}</MainLink>
          </h3>
          <p class="card-paragraph">{{ repo.description }}</p>
        </div>
        <div class="card-stats">
          <span>{{ repo.stargazers_count }} Stars</span>
          <span></span>
          <span>{{ repo.language || "Unknown" }}</span>
        </div>
      </article>
    </TransitionGroup>
  </section>
</template>
<script>
import { Octokit } from "octokit";
import pkg from "@pkg";

var storageKey = "github-data";

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    maxItems: {
      type: Number,
      default: 1 / 0, // infinity 🥵
    },
  },
  data() {
    return {
      repositories: [],
      loading: true,
      error: false,
    };
  },
  computed: {
    repoToShow() {
      const clonedRepos = [...this.repositories];

      // if maxItems is not defined, sort by date; else, sort by stars
      if (this.maxItems === 1 / 0) {
        return clonedRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else {
        // top maxItems (4) most stars
        return clonedRepos
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, this.maxItems);
      }
    },
  },
  methods: {
    async grabRepositories() {
      try {
        const octokit = new Octokit({
          auth: import.meta.env.API_TOKEN,
        });

        let data = [];
        let page = 1;

        for (;;) {
          const { data: res } = await octokit.request(this.url, {
            page,
          });

          if (res.length === 0) {
            break;
          } else {
            data = data.concat(res);
            page++;
          }
        }

        window.sessionStorage.setItem(storageKey, JSON.stringify(data));
        this.repositories = data;
      } catch (error) {
        console.error("Error grabbing repositories:", error);
        this.loading = false;
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    },
    matchRepo(name) {
      const dependencies = Object.keys(pkg.dependencies || []);

      // return true if any dependency matches the repository name
      return dependencies.some(dependency => name.toLowerCase().includes(dependency.toLowerCase()));
    },
    grabLocalRepositories() {
      const sessionData = window.sessionStorage.getItem(storageKey);

      if (!sessionData) {
        this.grabRepositories();
      } else {
        this.repositories = JSON.parse(sessionData);
        this.loading = false;
      }
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 500ms, transform 500ms";
      el.style.transitionDelay = `${el.dataset.index * 100}ms`;
    },
    onEnter(el, done) {
      el.offsetHeight;
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";

      el.addEventListener(
        "transitionend",
        () => {
          this.afterEnter(el);
          done();
        },
        { once: true }
      );
    },
    afterEnter(el) {
      el.style.opacity = "";
      el.style.transform = "";
      el.style.transitionDelay = "";
    },
  },
  mounted() {
    this.grabLocalRepositories();
  },
};
</script>
