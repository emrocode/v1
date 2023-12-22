import { createApp } from "vue";
import Base from "@/app.vue";
import VueRouter from "@/router";
import DataGrabber from "@/components/DataGrabber.vue";
import MainLink from "@/components/MainLink.vue";
import MainCard from "@/components/MainCard.vue";
import "@/assets/css/globals.css";

const app = createApp(Base);

window.VueVersion = app.version;

app.component("Fetch", DataGrabber);
app.component("Link", MainLink);
app.component("Card", MainCard);

app.use(VueRouter);

app.mount("#app");
