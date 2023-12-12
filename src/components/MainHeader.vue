<script setup>
import IconLogo from "@/assets/icons/brand/IconLogo.vue";
import IconArrowLeft from "@/assets/icons/IconArrowLeft.vue";
import IconTone from "@/assets/icons/IconTone.vue";
</script>
<template>
  <header>
    <nav class="container nav">
      <MainLink to="/" aria-label="Emilio Romero Logo" class="nav-brand">
        <component :is="isHome ? IconLogo : IconArrowLeft" />
      </MainLink>
      <ul class="menu">
        <li class="menu-item" v-for="item in navs" :key="item.key">
          <MainLink :to="item.path" class="menu-link" activeClass="active">
            {{ item.key }}
          </MainLink>
        </li>
        <li class="menu-item menu-spp" v-if="navs[0].key && navs[0].path"></li>
        <li class="menu-item">
          <button id="dTheme" class="center menu-button" title="Alternar tema">
            <IconTone />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import MainLink from "@/components/MainLink.vue";
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
