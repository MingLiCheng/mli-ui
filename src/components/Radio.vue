<template>
  <label class="mli-radio" :class="{ 'is-checked': model === label, 'is-disabled': disabled }" role="radio">
    <span :class="['mli-radio__input', { 'is-checked': model === label, 'is-disabled': disabled }]">
      <span class="mli-radio__inner"></span>
      <input
        ref="radio"
        class="mli-raido__original"
        :value="label"
        v-model="model"
        :disabled="disabled"
        aria-hidden="true"
        type="radio"
        tabindex="-1"
        @change="handleChange"
      />
    </span>
    <span class="mli-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component
export default class MliRadio extends Vue {
  @Prop({ type: [String, Boolean, Number], default: '' }) private value!: string
  @Prop({ type: [String, Boolean, Number], default: '' }) private label!: string
  @Prop(Boolean) private disabled!: boolean

  /** change 这样就可以得到一个提示 */
  @Emit('change')
  emitChange(value: string | boolean | number) {
    return value
  }

  handleChange() {
    this.$nextTick(() => {
      this.emitChange(this.model)
    })
  }
  get model() {
    return this.value
  }
  set model(value) {
    this.$emit('input', value)
    this.$refs.radio && ((this.$refs.radio as HTMLInputElement).checked = this.model === this.label)
  }
}
</script>

<style lang="less" scoped>
.mli-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  user-select: none;
  border: 1px solid hotpink;
  &.is-checked {
    color: #409eff;
  }
  &.is-disabled {
    cursor: not-allowed;
    .mli-radio__label {
      color: #c0c4cc;
    }
  }
  &__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    &.is-checked {
      .mli-radio__inner {
        border-color: #409eff;
        background: #409eff;
        &:after {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }
    &.is-disabled {
      .mli-radio__inner {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        cursor: not-allowed;
        &:after {
          cursor: not-allowed;
          background-color: #f5f7fa;
        }
        &:hover {
          border-color: #e4e7ed;
        }
      }
      &.is-checked {
        .mli-radio__inner {
          &:after {
            background-color: #c0c4cc;
          }
        }
      }
    }
    .mli-radio__inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      &:after {
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.15s ease-in;
      }
      &:hover {
        border-color: #409eff;
      }
    }
    .mli-raido__original {
      line-height: 1;
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
  &__label {
    font-size: 14px;
    padding-left: 6px;
  }
}
</style>
