import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/user/create",
    name: "UserCreate",
    component: () => import("@/views/UserCreateView.vue"),
  },
  {
    path: "/user/list",
    name: "UserList",
    component: () => import("@/views/UserListView.vue"),
  },
  {
    path: "/profile/create",
    name: "ProfileCreate",
    component: () => import("@/views/ProfileCreateView.vue"),
  },
  {
    path: "/profile/list",
    name: "ProfileList",
    component: () => import("@/views/ProfileListView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
