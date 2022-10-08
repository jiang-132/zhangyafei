import todoListVue from "@/views/todoList.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Todo",
      component: () => import("../views/todoList.vue"),
    },
    { path: '/', redirect: { name: 'admin' } },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin.vue"),
    },
    {
      path: "/admin/static",
      name: "static",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/static.vue"),
    },
    {
      path: "/admin/detail",
      name: "detail",
      component: () => import("../views/datail.vue"),
    },
  ],
});

export default router;
