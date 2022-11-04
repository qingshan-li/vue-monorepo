import { Router, createRouter, createWebHashHistory } from "vue-router";
import routes from "./define"

// console.log(process)
// const isProduction = process.env.VUE_APP_ENV === "production";

const router = createRouter({
  // history: createWebHashHistory(isProduction ? "/web-loops/test-iframe-pay/" : "/"),
  history: createWebHashHistory(),
  routes,
})

export default router;