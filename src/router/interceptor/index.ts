/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2021-01-27 14:01:53
 */

import { Route } from 'vue-router'
export async function routerBeforeEachFunc(to: Route, from: Route, next: any) {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Vue Ts Temp Pc'
  }
  next()
}

// 进入路由后
export function routerAfterEachFunc(to: Route, from: Route) {
  console.log('from', from)
}
