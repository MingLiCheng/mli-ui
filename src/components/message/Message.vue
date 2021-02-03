<template>
  <transition name="mli-message-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" :class="['mli-message', type ? 'mli-message--' + type : '']">
      <i :class="typeIconClass" v-if="isShowIcon"></i>
      <span class="mli-message__content">
        {{ message }}
      </span>

      <!-- 关闭按钮 -->
      <i v-if="showClose" class="mli-message__closeBtn mli-icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
type Indexable<T> = {
  [key: string]: T
}
const TypeMap: Indexable<string> = {
  success: 'success',
  info: 'prompt',
  warning: 'warning',
  error: 'error',
  danger: 'error'
}
@Component
export default class MliMessage extends Vue {
  @Prop({ type: Boolean, default: true }) private isShowIcon!: boolean
  private type!: string
  private showClose!: boolean
  private message!: string
  private visible = false
  private closed = false
  private onClose: null | Function = null

  get typeIconClass() {
    return this.type ? `mli-message__icon mli-icon-${TypeMap[this.type]}` : ''
  }

  @Watch('$route', { immediate: true })
  onChangeRoute(newRoute: any) {
    console.log('newRoute', newRoute)
  }
  @Watch('visible')
  onChangeRoxute(newRoute: any) {
    console.log('newRoute', newRoute)
  }

  @Watch('closed')
  onChangeValue(newVal: boolean) {
    if (newVal) {
      this.visible = false
    }
  }

  handleAfterLeave() {
    this.$destroy()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }

  close() {
    this.closed = true
    console.log('xxx', this.closed)

    // if (typeof this.onClose === 'function') {
    //   this.onClose(this)
    // }
  }
}
</script>

<style lang="less">
@import url('@/assets/styles/_variable.less');
.mli-message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: #ebeef5;
  position: fixed;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  &__icon {
    margin-right: 10px;
    &.mli-icon-success {
      color: @color-success;
    }
    &.mli-icon-warning {
      color: @color-warning;
    }
    &.mli-icon-danger,
    &.mli-icon-error {
      color: @color-danger;
    }
    &.mli-icon-prompt {
      color: @color-info;
    }
  }
  &--info {
    background-color: @color-info-lighter;
    border-color: @color-info-light;
    .mli-message__content {
      color: @color-info;
    }
  }
  &--success {
    background-color: @color-success-lighter;
    border-color: @color-success-light;
    .mli-message__content {
      color: @color-success;
    }
  }
  &--warning {
    background-color: @color-warning-lighter;
    border-color: @color-warning-light;
    .mli-message__content {
      color: @color-warning;
    }
  }
  &--danger,
  &--error {
    background-color: @color-error-lighter;
    border-color: @color-error-light;
    .mli-message__content {
      color: @color-error;
    }
  }

  &__closeBtn {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #c0c4cc;
    font-size: 16px;

    &:focus {
      outline-width: 0;
    }
    &:hover {
      color: #909399;
    }
  }
}

.mli-message-fade-enter,
.mli-message-fade-leave-active {
  transform: translate(-50%, -100px);
  opacity: 0;
}
</style>
