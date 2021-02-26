<template>
  <a
    :class="['mli-link', type ? `mli-link--${type}` : '', disabled && 'is-disabled', underline && 'underline']"
    :href="disabled ? null : href"
    @click="handleClick"
  >
    <i :class="icon" v-if="icon"></i>
    <span v-if="$slots.default" class="mli-link--inner">
      <slot></slot>
    </span>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { PluginObject } from 'vue'
@Component({})
export default class MliLink extends Vue implements PluginObject<any> {
  @Prop(String) type!: string
  @Prop(Boolean) disabled!: boolean
  @Prop(String) href!: string
  @Prop(String) icon!: string
  @Prop({ type: Boolean, default: true }) underline!: boolean

  @Emit('click') emitClick(e: Event) {
    return e
  }
  install!: any

  handleClick(e: Event) {
    if (!this.disabled) {
      if (!this.href) {
        this.emitClick(e)
      }
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/styles/_variable.less';
.mli-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 0 6px;
  font-size: 14px;
  font-weight: 500;
  color: @color-primary;
  &.underline {
    &:hover {
      text-decoration: underline;
    }
  }
  &.is-disabled {
    user-select: none;
    cursor: not-allowed;
    color: mix(@color-primary, @color-white, 50%);
    &:hover {
      text-decoration: none;
    }
  }
  &--primary {
    color: @color-primary;
    &.is-disabled {
      color: mix(@color-primary, @color-white, 50%);
    }
  }
  &--success {
    color: @color-success;
    &.is-disabled {
      color: mix(@color-success, @color-white, 50%);
    }
  }
  &--info {
    color: @color-info;
    &.is-disabled {
      color: mix(@color-info, @color-white, 50%);
    }
  }
  &--warning {
    color: @color-warning;
    &.is-disabled {
      color: mix(@color-warning, @color-white, 50%);
    }
  }
  &--danger {
    color: @color-danger;
    &.is-disabled {
      color: mix(@color-danger, @color-white, 50%);
    }
  }
  &--error {
    color: @color-danger;
    &.is-disabled {
      color: mix(@color-danger, @color-white, 50%);
    }
  }
  i {
    margin-right: 2px;
  }
}
</style>
