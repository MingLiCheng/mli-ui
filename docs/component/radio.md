---
title: Radio 单选框
---
# Radio 单选框
在一组备选项中进行单选

## 基础用法
由于选项默认可见，不宜过多，若选项过多


::: demo
```html
<template>
  <MliRadio v-model="radio" label="1">选项1</MliRadio>
  <MliRadio v-model="radio" label="2">选项2</MliRadio>
</template>
<script>
export default {
  data(){
    return {
      radio: '1'
    }
  }
}
</script>
```
:::

## 禁用状态
单选框不可用的状态

::: demo
```html
<template>
  <MliRadio v-model="radio" disabled  label="1">选项1</MliRadio>
  <MliRadio v-model="radio" disabled  label="2">选项2</MliRadio>
</template>
<script>
export default {
  data(){
    return {
      radio: '2'
    }
  }
}
</script>
```
:::

## Radio Attributes
自己查 ~
```html
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
}
</script>
```