import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import { routerBeforeEachFunc, routerAfterEachFunc } from './interceptor/index'
Vue.use(VueRouter)
console.log('.BASE_URL', process.env)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "error-pages" */ '../views/error-pages/404.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "error-pages" */ '../views/error-pages/401.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 拦截器
router.beforeEach(routerBeforeEachFunc)
router.afterEach(routerAfterEachFunc)

export default router
