import { createApp } from "vue";
import Base from "@/app.vue";
import VueRouter from "@/router";
import MainFetcher from "@/components/MainFetcher.vue";
import MainLink from "@/components/MainLink.vue";
import MainCard from "@/components/MainCard.vue";
import "@/assets/css/globals.css";

const app = createApp(Base);

app
  .component("VueFetcher", MainFetcher)
  .component("VueLink", MainLink)
  .component("VueCard", MainCard)
  .use(VueRouter)
  .mount("#app");
