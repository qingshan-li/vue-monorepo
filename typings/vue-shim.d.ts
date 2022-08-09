// ts 引入 .vue 导致的爆红问题
declare module '*.vue' {
  import type { DefineComponent } from "vue";
  const component:DefineComponent<{},{},any>
}