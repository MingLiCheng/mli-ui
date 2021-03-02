import Vue from 'vue'
import MliMessage from './Message.vue'
const MessageConstructor = Vue.extend(MliMessage)
interface IMessage {
  (options?: MessageParams): any
  close(id: string, userOnClose?: ((vm: MessageVNode) => void) | undefined): void
  [key: string]: any
}
interface IMessageOptions {
  type?: 'success' | 'warning' | 'info' | 'error' | '' | string
  visible?: boolean
  message?: string
  id?: string
  onClose?: () => void
  offset?: number
}
type MessageParams = IMessageOptions | string
type MessageVNode = Vue
let instance: any
const instances: Array<typeof instance> = []
let seed = 1
const Message: IMessage = function(options: MessageParams = {} as MessageParams) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  const id = 'message_' + seed++
  options.id = id
  // 保存用户自定义的 onclos事件
  const userOnClose = options.onClose
  options.onClose = function() {
    Message.close(id, userOnClose)
  }
  instance = new MessageConstructor({ data: options })
  instance.$mount()
  document.body.appendChild(instance.$el)
  // 定位
  let verticalOffset = options.offset || 20
  instances.forEach(ins => {
    verticalOffset += ins.$el.offsetHeight + 16
  })
  instance.verticalOffset = verticalOffset
  instance.visible = true
  instances.push(instance)
  return instance
}
;(['success', 'warning', 'info', 'error'] as const).forEach((type: string) => {
  Message[type] = (options: IMessageOptions) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

// 关闭组件后 重设当前显示的组件的样式（top）
Message.close = function(id: string, userOnClose?: (vm: MessageVNode) => void) {
  const len = instances.length
  let index = -1
  let removedHeight
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight
      index = i
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return
  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].$el
    dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px'
  }
}

export default Message
