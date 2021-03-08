---
title: Checkbox 多选框
---

# Checkbox 多选框
一组备选项中进行多选

## 基础用法
单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

::: demo
```html
<template>
  <MliCheckbox v-model="checkbox" @change="checkboxChange">选项一</MliCheckbox>
  <MliCheckbox v-model="checkbox" @change="checkboxChange">选项二</MliCheckbox>
</template>
<script>
export default {
  data() {
    return {
      checkbox: true
    }
  },
  methods: {
    checkboxChange(value) {
      console.log('value', value)
    }
  }
}
</script>
```
:::

## 多选框组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

::: demo `MliCheckboxGroup`元素能把多个 MliCheckbox 管理为一组，只需要在 Group 中使用`v-model`绑定`Array`类型的变量即可。
```html
<template>
  <MliCheckboxGroup v-model="checkboxGroup" @change="checkboxGroupChange">
    <MliCheckbox label="1">选项一</MliCheckbox>
    <MliCheckbox label="2">选项二</MliCheckbox>
    <MliCheckbox label="3">选项三</MliCheckbox>
  </MliCheckboxGroup>
</template>
<script>
export default {
  data() {
    return {
      checkboxGroup: ['1']
    }
  },
  methods: {
    checkboxGroupChange(value) {
      console.log('value', value)
    }
  }
}
</script>
```
:::


## Checkbox Attributes
自己查 ~

```html
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component
export default class MliCheckbox extends Vue {
  @Prop({ type: [String, Number, Boolean] }) private label!: string | number | boolean
  @Prop({ type: [String, Number, Boolean] }) private value!: string | number | boolean
  @Prop({ type: [String, Number] }) private trueLabel!: string | number
  @Prop({ type: [String, Number] }) private falseLabel!: string | number
  @Prop(Boolean) private checked!: boolean

  @Emit('change')
  emitChange(value: any) {
    return value
  }
}
</script>
```
