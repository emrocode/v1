<template>
  <section>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error grabbing repositories. Try again later.</div>
    <TransitionGroup tag="div" class="wrapper" @beforeEnter="beforeEnter" @enter="onEnter">
      <article class="card" v-for="(repo, i) in repoToShow" :key="repo.id" :data-index="i">
        <span class="card-date">{{ formatDate(repo.created_at) }}</span>
        <div class="card-body">
          <h3 class="card-title">
            <Link :to="repo.html_url">{{ repo.name }}</Link>
          </h3>
          <p class="card-paragraph">{{ repo.description }}</p>
        </div>
        <ul class="menu card-stats">
          <li class="menu-item">{{ repo.stargazers_count }} Stars</li>
          <li class="menu-item menu-spp"></li>
          <li class="menu-item">{{ repo.language || "Unknown" }}</li>
        </ul>
      </article>
    </TransitionGroup>
  </section>
</template>
<script>
import { Octokit } from "@octokit/rest";
import config from "@config";
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
      error: false,
      loading: true,
      updateInterval: 7 * 24 * 60 * 60 * 1000,
    };
  },
  computed: {
    repoToShow() {
      const clonedRepos = [...this.repositories];

      // if maxItems is not defined, sort by date; else, sort by stars
      if (this.maxItems === this.$options.props.maxItems.default) {
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
          auth: import.meta.env.VITE_GITHUB_TOKEN,
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
            const ownRepo = res.filter(x => x.fork !== true);

            data = data.concat(
              ownRepo.map(repo => ({
                id: repo.id.toString(),
                created_at: repo.created_at,
                html_url: repo.html_url,
                name: repo.name,
                description: repo.description,
                stargazers_count: repo.stargazers_count.toString(),
                language: repo.language,
              }))
            );
            page++;
          }
        }

        // push local data in storage
        const dataToShow = config.work.filter(x => x.show === true);

        data.push(
          ...dataToShow.map(repo => ({
            id: repo.id.toString(),
            created_at: repo.created_at,
            html_url: repo.html_url,
            name: repo.name,
            description: repo.description,
            stargazers_count: repo.stargazers_count.toString(),
            language: repo.language,
          }))
        );

        window.localStorage.setItem(storageKey, JSON.stringify({ data, timestamp: Date.now() }));
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
    grabLocalRepositories() {
      const STO = window.localStorage.getItem(storageKey);

      if (!STO) {
        this.grabRepositories();
      } else {
        const { data, timestamp } = JSON.parse(STO);
        if (Date.now() - timestamp >= this.updateInterval) {
          this.grabRepositories();
        } else {
          this.repositories = data;
          this.loading = false;
        }
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

      el.addEventListener("transitionend", () => {
        this.afterEnter(el);
        done();
      });
    },
    afterEnter(el) {
      el.style.opacity = "";
      el.style.transform = "";
      el.style.transitionDelay = "";
    },
  },
  mounted() {
    this.grabLocalRepositories() || [];
  },
};
</script>
