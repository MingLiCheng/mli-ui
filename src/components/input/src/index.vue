<template>
  <div :class="['mli-input', isShowSuffix && 'mli-input--suffix']">
    <input
      ref="input"
      class="mli-input__inner"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      @input="handleInput"
      :placeholder="placeholder"
    />
    <span class="el-input__prefix"> </span>
    <!-- 后置内容 -->
    <span class="mli-input__suffix" v-if="isShowSuffix">
      <i
        v-if="showPassword"
        :class="['mli-input__icon', passwordVisible ? 'mli-icon-eye-close' : 'mli-icon-browse']"
        @click="handleShowPasswordClick"
      ></i>
      <i v-if="search" :class="['mli-input__icon', 'mli-icon-search']"></i>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component({})
export default class MliInput extends Vue {
  @Prop({ type: [String, Number] }) value!: string | number
  @Prop(String) placeholder!: string
  @Prop(Boolean) showPassword!: boolean
  @Prop(Boolean) search!: boolean
  @Prop({ type: String, default: 'text' }) type!: string
  @Emit('input') inputEmit(value: string | number) {
    return value
  }
  private passwordVisible = false

  get isShowSuffix() {
    return this.showPassword || this.search
  }

  handleInput(e: any) {
    this.inputEmit(e.target.value)
  }

  handleShowPasswordClick() {
    this.passwordVisible = !this.passwordVisible
    this.focus()
  }

  focus() {
    ;(this.getInput() as HTMLInputElement).focus()
  }

  getInput() {
    return this.$refs.input || this.$refs.textarea
  }
}
</script>

<style lang="less">
@import '../../../assets/styles/_variable.less';
.mli-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
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
  &__icon {
    color: @color-text-placeholder;
  }
  &--suffix {
    .mli-input__inner {
      padding-right: 30px;
    }
  }
  &__suffix {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    // pointer-events: none;
    cursor: pointer;
    .mli-input__icon {
      width: 25px;
      text-align: center;
      line-height: 32px;
    }
  }
}
</style>
