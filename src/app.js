import { createApp } from "vue";
import base from "@/app.vue";
import router from "@/router";
import DataGrabber from "@/components/DataGrabber.vue";
import MainLink from "@/components/MainLink.vue";
import "@/assets/css/globals.css";

const app = createApp(base);

window.VueVersion = app.version;

app.component("Fetch", DataGrabber);
app.component("Link", MainLink);
app.use(router);
app.mount("#app");
