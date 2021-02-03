import Vue from 'vue'
import MliMessage from './Message.vue'

const MessageConstructor = Vue.extend(MliMessage)

interface IMessageOptions {
  type?: 'success' | 'warning' | 'info' | 'error' | ''
  visible?: boolean
  message?: string
  id?: string
  onClose?: () => void
}

type MessageParams = IMessageOptions | string

type MessageVNode = Vue

let instance: any
let seed = 1
const Message = function(options: MessageParams = {} as MessageParams) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  const id = 'message_' + seed++
  options.id = id

  // const userOnClose = options.onClose
  // options.onClose = function() {
  //   Message.close(id, userOnClose)
  // }

  instance = new MessageConstructor({ data: options })

  instance.$mount()
  console.log('instance----mount', instance)

  document.body.appendChild(instance.$el)

  instance.visible = true

  return instance
}

// Message.close = function(id: string, userOnClose?: (vm: MessageVNode) => void) {}

export default Message
