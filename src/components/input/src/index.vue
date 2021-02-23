<template>
  <div :class="['mli-input']">
    <input
      class="mli-input__inner"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      @input="handleInput"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component({})
export default class MliInput extends Vue {
  @Prop({ type: [String, Number] }) value!: string | number
  @Prop(String) placeholder!: string
  @Prop(Boolean) showPassword!: boolean
  @Emit('input') inputEmit(value: string | number) {
    return value
  }
  private passwordVisible = false

  handleInput(e: any) {
    this.inputEmit(e.target.value)
  }
}
</script>

<style lang="less">
@import '../../../assets/styles/_variable.less';
.mli-input {
  &__inner {
    border: 1px solid #ccc;
    height: 32px;
    outline: none;
    padding: 0 15px;
    border-radius: 4px;
    color: @color-font;
    &::placeholder {
      color: @color-text-placeholder;
    }
    &:hover {
      border-color: @color-primary;
    }
    &:focus {
      outline: none;
      border-color: @color-primary;
    }
  }
}
</style>
