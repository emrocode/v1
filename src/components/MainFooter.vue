<template>
  <footer>
    <div class="container wrapper footer">
      <p>
        Hand-crafted by Emilio Romero. Built with
        <VueLink to="https://vuejs.org" class="link">Vuejs</VueLink> and deployed with
        <VueLink to="https://vercel.com" class="link">Vercel</VueLink>
      </p>
      <ul class="menu">
        <li class="menu-item" v-for="(item, i) in connections" :key="i">
          <VueLink :to="item.url" class="menu-link">
            {{ item.platform }}
          </VueLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
<script>
import config from "@config";

export default {
  data() {
    return {
      connections: config.connections,
    };
  },
};
</script>
