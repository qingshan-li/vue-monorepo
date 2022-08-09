import app from './App.vue'
import { createApplication } from "@basic/core/application/factory"
import router from "./router";
import config from "./config";

createApplication(
  {
    app,
    config,
    router,
  }
)
