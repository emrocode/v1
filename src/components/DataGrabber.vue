<script setup>
import IconRefresh from "@/assets/icons/IconRefresh.vue";
</script>
<template>
  <div>
    <ul class="menu filter" v-show="showFilter">
      <li class="menu-item" v-for="(lang, i) in useLanguages" :key="i">
        <button
          class="filter-button"
          :class="{ active: selectedLanguage === lang }"
          @click="selectLanguage(lang)">
          {{ lang || "Unknown" }}
        </button>
      </li>
      <li class="menu-item">
        <button class="filter-button active" @click="refreshLocalData">
          <span>Refresh data</span>
          <IconRefresh />
        </button>
      </li>
    </ul>
    <div v-show="loading">Loading...</div>
    <div v-show="error">Error grabbing repositories. Try again later.</div>
    <TransitionGroup
      tag="section"
      class="wrapper"
      @beforeEnter="beforeEnter"
      @enter="enter"
      @leave="leave">
      <Card
        v-for="(repo, index) in repoToShow"
        :key="repo.id"
        :data-index="index"
        :date="repo.created_at"
        :github="repo.html_url"
        :name="repo.name"
        :description="repo.description"
        :stargazers_count="repo.stargazers_count"
        :language="repo.language" />
    </TransitionGroup>
  </div>
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
      selectedLanguage: "All",
      updateInterval: 7 * 24 * 60 * 60 * 1000,
      sortByDate: (a, b) => new Date(b.created_at) - new Date(a.created_at),
      sortByStar: (a, b) => b.stargazers_count - a.stargazers_count,
    };
  },
  computed: {
    repoToShow() {
      const repositories = this.repositories;

      if (this.selectedLanguage !== "All") {
        return repositories
          .filter(repo => repo.language === this.selectedLanguage)
          .sort(this.sortByDate);
      }

      // if maxItems sort by stargazers count
      if (this.maxItems !== this.$options.props.maxItems.default) {
        return repositories.sort(this.sortByStar).slice(0, this.maxItems);
      }

      return repositories.sort(this.sortByDate);
    },
    useLanguages() {
      const useLanguages = [...new Set(this.repositories.map(repo => repo.language))];
      useLanguages.unshift("All");
      return useLanguages;
    },
    showFilter() {
      return this.$route.name === config.navs.top[0].key;
    },
  },
  methods: {
    async grabRepositories() {
      try {
        const octokit = new Octokit({
          auth: import.meta.env.VITE_GITHUB_TOKEN,
        });

        var data = [];
        var page = 1;

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
    selectLanguage(language) {
      this.selectedLanguage = language;
    },
    refreshLocalData() {
      window.localStorage.removeItem(storageKey);
      return window.location.reload();
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.visibility = "hidden";
      el.style.transform = "translateY(15px)";
      el.style.transition = "opacity 500ms linear, transform 500ms linear";
      el.style.transitionDelay = `${el.dataset.index * 100}ms`;
    },
    enter(el, done) {
      el.offsetHeight;
      el.style.opacity = 1;
      el.style.visibility = "visible";
      el.style.transform = "translateY(0px)";

      el.addEventListener("transitionend", () => {
        this.afterEnter(el);
        done;
      });
    },
    afterEnter(el) {
      el.style.opacity = "";
      el.style.visibility = "";
      el.style.transform = "";
      el.style.transition = "";
      el.style.transitionDelay = "";
    },
    leave(el) {
      el.style.display = "none";
    },
  },
  mounted() {
    this.grabLocalRepositories() || [];
  },
};
</script>
