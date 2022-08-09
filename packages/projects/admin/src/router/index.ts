import { createRouter, createWebHashHistory } from "vue-router";
import config from "../config";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "root",
    component: () => import("@components/business/buttonTest/Button.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router;