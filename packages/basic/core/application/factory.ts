import { createApp } from "vue";
import AndV from 'ant-design-vue'
import {install} from '@icon-park/vue/es/all';
import "@icon-park/vue-next/styles/index.css";
// import 'virtual:windi.css'
// import 'uno.css'


export interface createAppOption {
  /**挂载标签 */
  app: any;
  /**配置项 */
  config: any;
  /**路由 */
  router: any;
}

export function createApplication(option: createAppOption) {
  // createHttp
  // createHttp(option.config.url, option.config.http);

  const app = createApp(option.app);

  app
    .use(option.router)
    .use(AndV)
    // .use();

  // 使用自定义前缀'i', 例如: 对于`People`这个icon，组件名字是`i-people`.
  install(app, 'i'); 

  // mount
  app.mount('#app')

  // 注册全局组件
  // app.component("mozat", mozatComponent);

  return app;
}

/**
 * 应用全局配置
 * @param projectName
 * @returns
 */
export function createAppConfig(projectName :string) {
  const httpCfg = {
    apiPrefix: "",
    baseURL: "",
    timeout: 30000,
    noToken: false, // 是否传token
    showSpin: true, // 是否呈现loading效果
    showMsg: false, // 是否弹出成功/失败消息
    showOkMsg: false, // 是否弹出成功消息
    showFailMsg: false, // 是否弹出失败消息
    okMsg: "", // 自定义成功消息
    failMsg: "", // 自定义失败消息
  };

  return {
    httpCfg
  }
}