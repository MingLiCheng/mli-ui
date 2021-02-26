import MliLink from './src/index.vue'
import { VueConstructor } from 'vue'
;(MliLink as any).install = function(Vue: VueConstructor) {
  Vue.component(MliLink.name, MliLink)
}
export default MliLink
