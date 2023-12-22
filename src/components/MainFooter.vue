<template>
  <footer>
    <div class="container footer">
      <div>
        <p>Built with Vuejs v{{ vueVersion }}</p>
        <p>Hand-crafted by Emilio Romero &copy; {{ year }}</p>
      </div>
      <ul class="menu">
        <li class="menu-item" v-for="(item, i) in connections" :key="i">
          <Link :to="item.url" class="menu-link">
            {{ item.platform }}
          </Link>
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
      year: new Date().getFullYear(),
      vueVersion: window.VueVersion || "Unknown",
      connections: config.connections,
    };
  },
};
</script>
