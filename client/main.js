/* eslint-disable vue/multi-word-component-names */
/* eslint-disable prettier/prettier */
import {
  createApp,
} from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import VueCal from 'vue-cal';

// css
import "element-plus/dist/index.css";
import "@mdi/font/css/materialdesignicons.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./style/style.scss";
import "./style/form.scss";

const app = createApp(App);

//index
import {
  rules,
  filter,
  lib,
  store
} from "./core/index";
app.config.globalProperties.$rules = rules;
app.config.globalProperties.$filter = filter;
app.config.globalProperties.$lib = lib;

app.use(store);
app.use(ElementPlus);
app.use(VueCal);
app.use(router);
app.mount("#app");