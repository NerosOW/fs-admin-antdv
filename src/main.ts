import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import "virtual:windi.css";
import "./style/common.less";
import "./mock";
import i18n from "./i18n";
import store from "./store";
import components from "./components";
import plugin from './plugin/'
// @ts-ignore
const app = createApp(App);
app.use(Antd);
app.use(router);
app.use(i18n);
app.use(store);
app.use(components);
app.use(plugin,{i18n});
app.mount("#app");
