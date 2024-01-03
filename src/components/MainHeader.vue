<script setup>
import IconLogo from "@/assets/icons/brand/IconLogo.vue";
import IconArrowBack from "@/assets/icons/IconArrowBack.vue";
import IconTone from "@/assets/icons/IconTone.vue";
</script>
<template>
  <header>
    <nav class="container nav">
      <VueLink to="/" aria-label="Emilio Romero Logo" class="nav-brand">
        <component :is="isHome ? IconLogo : IconArrowBack" />
      </VueLink>
      <ul class="menu">
        <li class="menu-item" v-for="item in navs" :key="item.key">
          <VueLink :to="item.path" class="menu-link" activeClass="active">
            {{ item.key }}
          </VueLink>
        </li>
        <li class="menu-item menu-spp" v-if="navs[0].key && navs[0].path"></li>
        <li class="menu-item">
          <button id="dTheme" class="center menu-button" title="Toggle theme">
            <IconTone />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import Darkify from "darkify-js";
import config from "@config";

export default {
  data() {
    return {
      navs: config.navs.top,
    };
  },
  mounted() {
    // dark mode with darkify-js
    const options = {
      autoMatchTheme: true,
      useLocalStorage: true,
      useColorScheme: ["#ffffff", "#1f1f1f"],
    };
    this.darkModeWithDarkify = new Darkify("#dTheme", options);
  },
  computed: {
    isHome() {
      return this.$route.path === "/";
    },
  },
};
</script>
