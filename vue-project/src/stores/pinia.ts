/*
 * @Author: JIANG 2460432959@qq.com
 * @Date: 2022-09-30 10:41:49
 * @LastEditors: JIANG 2460432959@qq.com
 * @LastEditTime: 2022-09-30 10:42:04
 * @FilePath: \vue-project\src\stores\pinia.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type {PiniaPluginContext } from 'pinia'
import { toRaw } from 'vue'
const __piniaKey = '__PINIAKEY__'
type OptPinia={
    key?:string
    paths?:string[]
}
​
//取值
const getStorage = (key: string) => {
    return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {})
}
//存储
const setStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
}
​
const piniaPlugin = (options: OptPinia)=>{
    return (context: PiniaPluginContext)=>{
        const { store } = context;
        const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`)
        store.$subscribe((args, state)=>{
            let arrPaths = options.paths
            if (!arrPaths?.includes(args.storeId))return
            setStorage(`${options?.key ?? __piniaKey}-${store.$id}`, toRaw(store.$state))
        })
​
        return{
            ...store.$state,
            ...data
        }
    }
}
​export default piniaPlugin