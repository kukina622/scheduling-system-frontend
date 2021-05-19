import Vue from "vue";
import VueRouter from "vue-router";
// views
import Login from "@/views/Login";
import Calendar from "@/views/Calendar";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "calendar",
    component:Calendar,
  },
  {
    path: "/login",
    name: "login",
    component:Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
