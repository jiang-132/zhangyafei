/*
 * @Author: jiang 2460432959@qq.com
 * @Date: 2022-09-20 10:58:10
 * @LastEditors: jiang 2460432959@qq.com
 * @LastEditTime: 2022-09-20 11:02:11
 * @FilePath: \three\vue-project\src\components\todolist\Storage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};
//把它暴露出去
export default storage;
