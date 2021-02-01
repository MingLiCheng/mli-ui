declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module 'ant-design-vue/es/locale/zh_CN' {
  import zh from 'ant-design-vue/es/locale/zh_CN'
  const zh_CN: zhCN
  export default zh_CN
}
declare module '*.gif' {
  export const gif: any
}

declare module 'vue-color' {
  import { Sketch } from 'vue-color'
  export { Sketch }
}
