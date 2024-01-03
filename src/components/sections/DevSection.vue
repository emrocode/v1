<script setup>
import VuePost from "@/components/MainPost.vue";
</script>
<template>
  <section>
    <div class="box">
      <h2 class="box-title">posts</h2>
      <p class="box-paragraph">Browse my latest web development posts&period;</p>
    </div>
    <section>
      <VuePost
        v-for="post in posts"
        :key="post.id"
        :date="post.date"
        :picture="post.picture"
        :title="post.title"
        :description="post.description"
        :url="post.url"
        :time="post.time" />
    </section>
  </section>
</template>
<script>
import { Octokit } from "@octokit/rest";

const storageKey = "posts";

export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async grabPosts() {
      try {
        const octokit = new Octokit();
        var data = [];

        const { data: res } = await octokit.request(import.meta.env.VITE_DEVAPI_ENDPOINT);

        data = data.concat(
          res.map(item => ({
            id: item.id,
            date: item.published_at,
            time: item.reading_time_minutes,
            url: item.url,
            title: item.title,
            description: item.description,
          }))
        );

        window.localStorage.setItem(storageKey, JSON.stringify({ data }));
        this.posts = data;
      } catch (error) {
        console.error("Error grabbing articles:", error);
      }
    },
    grabLocalPosts() {
      const STO = window.localStorage.getItem(storageKey);

      if (!STO) {
        this.grabPosts();
      } else {
        const { data } = JSON.parse(STO);

        this.posts = data;
      }
    },
  },
  mounted() {
    this.grabLocalPosts() || [];
  },
};
</script>
