export default [
  {
    path: '/',
    name: "root",
    // redirect: { name: "App" },
    component: () => import("@/App.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/list/Container.vue"),
      },
      {
        path: "/play",
        name: "play",
        component: () => import("@/views/list/Play.vue"),
      },
      {
        path: "/rule",
        name: "rule",
        component: () => import("@/views/list/RulePage.vue"),
      }
    ]
  },
]