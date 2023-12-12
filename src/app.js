import { createApp } from "vue";
import base from "@/app.vue";
import router from "@/router";
import MainLink from "@/components/MainLink.vue";
import "@/assets/css/globals.css";
import "@/assets/css/rubik-v28-latin.css";

const app = createApp(base);

app.component("MainLink", MainLink);
app.use(router);
app.mount("#app");

window.VueVersion = app.version;
