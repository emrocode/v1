<script setup>
import IconLinkedin from "@/assets/icons/brand/IconLinkedin.vue";
import IconTwitter from "@/assets/icons/brand/IconTwitter.vue";
import IconGithub from "@/assets/icons/brand/IconGithub.vue";
</script>
<template>
  <section class="hero-box">
    <div class="hero">
      <h1 class="hero-title">Emilio <span>Romero</span></h1>
      <h2 class="hero-sub">Front End Developer</h2>
      <p class="hero-description">
        I combine creativity and technical skills to create innovative solutions&period;
      </p>
      <br />
      <p class="hero-description">Connect with me&colon;</p>
      <ul class="menu">
        <li v-for="(item, i) in heroLinks" :key="i" class="menu-item">
          <VueLink :to="item.url" class="center menu-link">
            <component :is="item.icon" />
            {{ item.platform }}
          </VueLink>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { markRaw } from "vue";

export default {
  data() {
    return {
      heroLinks: [
        {
          platform: "LinkedIn",
          username: "in/emrocode",
          url: "https://linkedin.com/in/emrocode/",
          icon: markRaw(IconLinkedin),
        },
        {
          platform: "X(Twitter)",
          username: "@emilioromz",
          url: "https://twitter.com/emilioromz/",
          icon: markRaw(IconTwitter),
        },
        {
          platform: "GitHub",
          username: "emrocode",
          url: "https://github.com/emrocode/",
          icon: markRaw(IconGithub),
        },
      ],
    };
  },
};
</script>
