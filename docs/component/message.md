---
title: Message 消息提示
---

# Message 消息提示
常用于主动操作后的反馈提示

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