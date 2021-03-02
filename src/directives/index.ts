import { clipboard } from './clipboard'
interface IClipboardDirective {
  install?: Function
}

const clipboardDirective: IClipboardDirective = {}

clipboardDirective.install = (Vue: any) => {
  Vue.directive('clipboard', clipboard)
}

export * from './clipboard'
export { clipboardDirective }
