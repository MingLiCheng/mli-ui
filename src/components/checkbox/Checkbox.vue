<template>
  <label :class="['mli-checkbox', { 'is-checked': isChecked }]">
    <span class="mli-checkbox__input">
      <span :class="['mli-checkbox__inner', { 'is-checked': isChecked }]"></span>
      <input class="mli-checkbox__original" v-model="model" type="checkbox" :value="label" @change="handleChange" />
    </span>

    <span class="mli-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component
export default class MliCheckbox extends Vue {
  @Prop({ type: [String, Number, Boolean] }) private label!: string | number | boolean
  @Prop({ type: [String, Number, Boolean] }) private value!: string | number | boolean
  @Prop({ type: [String, Number] }) private trueLabel!: string | number
  @Prop({ type: [String, Number] }) private falseLabel!: string | number
  @Prop(Boolean) private checked!: boolean

  private checkboxGroup?: Vue
  private selfModel = false

  created() {
    this.checked && this.initData()
  }

  initData() {
    if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
      this.model.push(this.label)
    } else {
      this.model = this.trueLabel || true
    }
  }

  get model() {
    return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel
  }

  set model(val) {
    if (this.isGroup) {
      ;(this.checkboxGroup as any).emitInput(val)
    } else {
      this.$emit('input', val)
      this.selfModel = val
    }
  }
  get isChecked() {
    if (Object.prototype.toString.call(this.model) === '[object Boolean]') {
      return this.model
    } else if (Array.isArray(this.model)) {
      return this.model.indexOf(this.label) > -1
    } else if (this.model !== null && this.model !== undefined) {
      return this.model === this.trueLabel
    } else {
      return false
    }
  }
  get isGroup() {
    let parent = this.$parent
    while (parent) {
      if ((parent.$options as any).name !== 'MliCheckboxGroup') {
        parent = parent.$parent
      } else {
        this.checkboxGroup = parent
        return true
      }
    }
    return false
  }

  get store() {
    return this.checkboxGroup ? (this.checkboxGroup as any).value : this.value
  }

  @Emit('change')
  emitChange(value: any) {
    return value
  }

  handleChange(e: Event) {
    // const value = (e.target as any).checked || false
    let value!: number | string | boolean
    if ((e.target as any).checked) {
      value = this.trueLabel === undefined ? true : this.trueLabel
    } else {
      value = this.falseLabel === undefined ? false : this.falseLabel
    }
    this.emitChange(value)
    this.$nextTick(() => {
      if (this.isGroup) {
        ;(this.checkboxGroup as any).emitChange((this.checkboxGroup as any).value)
      }
    })
  }
}
</script>

<style lang="less">
@import '@/assets/styles/_variable.less';
.mli-checkbox {
  // line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: 30px;
  color: @color-font;
  &.is-checked {
    color: @color-primary;
  }

  &__input {
    vertical-align: middle;
    .mli-checkbox__inner {
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      // vertical-align: middle;
      &:after {
        box-sizing: content-box;
        content: '';
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
      &.is-checked {
        background-color: #409eff;
        border-color: #409eff;
        &:after {
          transform: rotate(45deg) scaleY(1);
        }
      }
    }
    .mli-checkbox__original {
      opacity: 0;
      outline: none;
      position: absolute;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
    }
  }
  &__label {
    margin-left: 8px;
  }
}
</style>
