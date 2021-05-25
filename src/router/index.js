import Vue from "vue";
import VueRouter from "vue-router";
// views
import Login from "@/views/Login";
import Calendar from "@/views/Calendar";
import UserInfo from "@/views/UserInfo"
import Register from "@/views/Register"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "calendar",
    component:Calendar,
  },
  {
    path: "/register",
    name: "register",
    component:Register,
  },
  {
    path: "/login",
    name: "login",
    component:Login,
  },
  {
    path: "/userinfo",
    name: "userinfo",
    component:UserInfo,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
