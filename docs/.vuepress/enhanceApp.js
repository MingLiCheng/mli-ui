/**
 * 扩展 VuePress 应用
 */
import './public/fonts/iconfont.css' // 字体
// import MliUi from '../../src/components/index'
import { clipboardDirective } from '../../src/directives/index'
import MliMessage from '../../src/components/message'
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
  // Vue.use(MliUi)  这样注册全局组件 build之后 有问题 （没搞定 哪个大佬能帮助一下 原因是组件使用 的 ts vue-property-decorator 换成 普通的格式就没问题）

  Vue.use(clipboardDirective)
  Vue.prototype.$message = MliMessage
}
