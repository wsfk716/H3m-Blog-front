import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@/assets/iconfont/iconfont.js";
import "@/utils/axios.config.js";
import VueMavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(pinia);
app.use(ElementPlus, {
  locale: zhCn,
});
// 注册 ElementPlusIconsVue
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(VueMavonEditor);
app.mount("#app");
