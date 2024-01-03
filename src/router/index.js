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
      meta: {
        title: "Home",
      },
    },
    {
      path: "/archive",
      name: "archive",
      component: () => import("@/views/ArchiveView.vue"),
      meta: {
        title: "Archive",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: NotFoundView,
      meta: {
        title: "NotFound",
      },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} / Emilio Romero`;
  }

  next();
});

export default router;
