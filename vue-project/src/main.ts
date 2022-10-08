/*
 * @Author: jiang 2460432959@qq.com
 * @Date: 2022-09-20 09:15:04
 * @LastEditors: JIANG 2460432959@qq.com
 * @LastEditTime: 2022-10-08 08:23:21
 * @FilePath: \three\vue-project\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//引入自定义模块
import storage from "./utils/Storage";
//引入echarts
import * as echarts from "echarts";
//注册图标组件
import * as ElIcon from "@element-plus/icons-vue";

import BaseEcharts from "./components/index.vue"
// import store from './stores'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "./assets/main.css";

const app = createApp(App);
app.use(ElementPlus);
// const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);;
// app.use(store);
app.use(createPinia());
app.use(router);
app.config.globalProperties.storage = storage;
for (let iconName in ElIcon) {
  app.component(iconName, ElIcon[iconName]);
}
app.component('BaseEcharts', BaseEcharts);
app.mount("#app");
