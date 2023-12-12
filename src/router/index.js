import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/archive",
      name: "archive",
      component: () => import("@/views/ArchiveView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Error",
      component: NotFoundView,
    },
  ],
});

export default router;
