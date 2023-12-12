<script setup>
import MainLink from "@/components/MainLink.vue";
</script>
<template>
  <section id="contact">
    <div class="section">
      <h2 class="section-title">Contact me</h2>
      <p class="section-paragraph">You can contact me by these means, I will respond shortly.</p>
    </div>
    <div class="contact-container">
      <div class="wrapper">
        <div class="card" v-for="(item, i) in contactLinks" :key="i">
          <div class="card-body">
            <component :is="item.icon" class="card-icon" />
            <h3 class="card-title">
              <MainLink :to="item.url">
                {{ item.user }}
              </MainLink>
            </h3>
            <p class="card-stats">{{ item.platform }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import config from "@config";

export default {
  data() {
    return {
      contactLinks: config.contactLinks,
    };
  },
};
</script>
