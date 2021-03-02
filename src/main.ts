import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import '@/assets/styles/fonts/iconfont.css' // 字体

import MliUi from '@/components'

Vue.use(MliUi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
