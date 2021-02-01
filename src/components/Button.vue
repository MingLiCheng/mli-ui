<!--
 * @Description: 
 * @Author: mlcheng2
 * @Date: 2021-01-29 17:48:39
-->
<template>
  <button
    :disabled="buttonDisabled"
    @click="handleClick"
    :class="[
      'mli-button',
      type ? 'mli-button--' + type : '',
      {
        'is-plain': plain,
        'is-loading': loading,
        'is-disabled': buttonDisabled,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i v-if="icon && !loading" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class MliButton extends Vue {
  @Prop({ type: String, default: '' }) private icon!: string
  @Prop({ type: String, default: 'default' }) private type!: string
  @Prop(Boolean) private plain!: boolean
  @Prop(Boolean) private loading!: boolean
  @Prop(Boolean) private disabled!: boolean | string
  @Prop(Boolean) private round!: boolean
  @Prop(Boolean) private circle!: boolean
  // eslint-disable-next-line
  @Emit('click') private handleClick(e: Event) {}

  get buttonDisabled() {
    return this.disabled
  }
}
</script>

<style lang="less">
@import '@/assets/styles/_variable.less';
.mli-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: 12px;
  &.is-plain {
    &:hover {
      background: #fff;
      border-color: #409eff;
      color: #409eff;
    }
  }
  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  &.is-disabled,
  &.is-disabled:active,
  &.is-disabled:focus,
  &.is-disabled:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }

  &.is-round {
    border-radius: 20px;
  }
  &.is-circle {
    border-radius: 50%;
    padding: 12px;
  }

  [class*='mli-icon-'] + span {
    margin-left: 5px;
  }

  &--primary {
    border-color: @color-primary;
    background: @color-primary;
    color: #fff;
    &.is-plain {
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
      &:hover {
        background: #409eff;
        border-color: #409eff;
        color: #fff;
      }
      &.is-disabled,
      &.is-disabled:active,
      &.is-disabled:focus,
      &.is-disabled:hover {
        color: #8cc5ff;
        background-color: #ecf5ff;
        border-color: #d9ecff;
      }
    }
    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
    &.is-disabled,
    &.is-disabled:active,
    &.is-disabled:focus,
    &.is-disabled:hover {
      color: #fff;
      background-color: #a0cfff;
      border-color: #a0cfff;
    }
  }
  &--success {
    border-color: @color-success;
    background: @color-success;
    color: #fff;
    &.is-plain {
      color: #67c23a;
      background: #f0f9eb;
      border-color: #c2e7b0;
      &:hover {
        background: #67c23a;
        border-color: #67c23a;
        color: #fff;
      }
      &.is-disabled,
      &.is-disabled:active,
      &.is-disabled:focus,
      &.is-disabled:hover {
        color: #a4da89;
        background-color: #f0f9eb;
        border-color: #e1f3d8;
      }
    }
    &:hover {
      background: #85ce61;
      border-color: #85ce61;
      color: #fff;
    }
    &.is-disabled,
    &.is-disabled:active,
    &.is-disabled:focus,
    &.is-disabled:hover {
      color: #fff;
      background-color: #b3e19d;
      border-color: #b3e19d;
    }
  }
  &--warning {
    border-color: @color-warning;
    background: @color-warning;
    color: #fff;
    &.is-plain {
      color: #e6a23c;
      background: #fdf6ec;
      border-color: #f5dab1;
      &:hover {
        background: #e6a23c;
        border-color: #e6a23c;
        color: #fff;
      }
      &.is-disabled,
      &.is-disabled:active,
      &.is-disabled:focus,
      &.is-disabled:hover {
        color: #f0c78a;
        background-color: #fdf6ec;
        border-color: #faecd8;
      }
    }
    &:hover {
      background: #ebb563;
      border-color: #ebb563;
      color: #fff;
    }

    &.is-disabled,
    &.is-disabled:active,
    &.is-disabled:focus,
    &.is-disabled:hover {
      color: #fff;
      background-color: #f3d19e;
      border-color: #f3d19e;
    }
  }

  &--danger {
    border-color: @color-danger;
    background: @color-danger;
    color: #fff;
    &.is-plain {
      color: #f56c6c;
      background: #fef0f0;
      border-color: #fbc4c4;
      &:hover {
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
      }
      &.is-disabled,
      &.is-disabled:active,
      &.is-disabled:focus,
      &.is-disabled:hover {
        color: #f9a7a7;
        background-color: #fef0f0;
        border-color: #fde2e2;
      }
    }
    &:hover {
      background: #f78989;
      border-color: #f78989;
      color: #fff;
    }
    &.is-disabled,
    &.is-disabled:active,
    &.is-disabled:focus,
    &.is-disabled:hover {
      color: #fff;
      background-color: #fab6b6;
      border-color: #fab6b6;
    }
  }
  &--info {
    border-color: @color-info;
    background: @color-info;
    color: #fff;
    &.is-plain {
      color: #909399;
      background: #f4f4f5;
      border-color: #d3d4d6;
      &:hover {
        background: #909399;
        border-color: #909399;
        color: #fff;
      }
      &.is-disabled,
      &.is-disabled:active,
      &.is-disabled:focus,
      &.is-disabled:hover {
        color: #bcbec2;
        background-color: #f4f4f5;
        border-color: #e9e9eb;
      }
    }
    &:hover {
      background: #a6a9ad;
      border-color: #a6a9ad;
      color: #fff;
    }
    &.is-disabled,
    &.is-disabled:active,
    &.is-disabled:focus,
    &.is-disabled:hover {
      color: #fff;
      background-color: #c8c9cc;
      border-color: #c8c9cc;
    }
  }
}
</style>
