<template>
  <section>
    <div class="section">
      <h2 class="section-title">skill sets</h2>
      <p class="section-paragraph">List of skills and technologies I use.</p>
    </div>
    <div class="skills">
      <!-- Skill icons from (https://skillicons.dev/) -->
      <img :src="getUrl()" alt="Skill Icons" loading="lazy" />
    </div>
  </section>
</template>
<script>
import config from "@config";

export default {
  data() {
    return {
      data1: config.skills.languages.concat(...config.skills.frameworks),
      data2: config.skills.tools.concat(...config.skills.design),
    };
  },
  methods: {
    getUrl() {
      const skills = [...this.data1].concat(...this.data2);
      return `https://skillicons.dev/icons?i=${skills.join(",")}&perline=10&theme=dark`;
    },
  },
};
</script>
