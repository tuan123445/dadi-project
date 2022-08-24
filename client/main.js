/* eslint-disable vue/multi-word-component-names */
/* eslint-disable prettier/prettier */
import {
  createApp,
} from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import VueCal from 'vue-cal';

// css
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./style/style.scss";
import "./style/form.scss";

const app = createApp(App);

//index
import {
  rules
} from "./core/index";
app.config.globalProperties.$rules = rules;

app.use(ElementPlus);
app.use(VueCal);
app.use(router);
app.mount("#app");