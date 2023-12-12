<!-- https://router.vuejs.org/guide/advanced/extending-router-link -->
<template>
  <a v-if="isExternal" v-bind="$attrs" :href="to" target="_blank" rel="noopener noreferrer">
    <slot />
  </a>
  <RouterLink v-else v-bind="$props">
    <slot />
  </RouterLink>
</template>
<script>
import { RouterLink } from "vue-router";

export default {
  props: {
    ...RouterLink.props,
  },
  computed: {
    isExternal() {
      return typeof this.to === "string" && /^(http|https|mailto)/.test(this.to);
    },
  },
};
</script>
