/*
 * @Author: JIANG 2460432959@qq.com
 * @Date: 2022-09-30 09:37:17
 * @LastEditors: JIANG 2460432959@qq.com
 * @LastEditTime: 2022-09-30 09:39:10
 * @FilePath: \vue-project\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createPinia } from "pinia";
// 引入持久化插件
import piniaPluginPersist from "pinia-plugin-persist";

const store = createPinia();
// 使用该插件
store.use(piniaPluginPersist);

//导出
export default store;
