<template>
  <section class="checkbox-page">
    <h1>Hello Checkbox Page</h1>
    <div class="" style="margin: 20px; padding: 20px; border: 1px solid #eaeefb">
      <MliCheckbox v-model="checkbox" @change="CheckboxChange">选项一</MliCheckbox>
      <MliCheckbox v-model="checkbox" @change="CheckboxChange">选项二</MliCheckbox>
    </div>

    <h2>checkboxGroup</h2>
    <div class="" style="margin: 20px; padding: 20px; border: 1px solid #eaeefb">
      <MliCheckboxGroup v-model="checkboxGroup" @change="checkboxGroupChange">
        <MliCheckbox label="1">选项一</MliCheckbox>
        <MliCheckbox label="2">选项二</MliCheckbox>
        <MliCheckbox label="3">选项三</MliCheckbox>
      </MliCheckboxGroup>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MliCheckbox from '@/components/checkbox/Checkbox.vue'
import MliCheckboxGroup from '@/components/checkbox/CheckboxGroup.vue'
@Component({ components: { MliCheckbox, MliCheckboxGroup } })
export default class CheckboxPage extends Vue {
  private checkbox = true
  private checkboxGroup = []

  CheckboxChange(value: any) {
    console.log('value', value)
  }
  checkboxGroupChange(value: any) {
    console.log('value', value)
  }
}
</script>

<style lang="less" scoped>
.checkbox-page {
  color: #ccc;
}
</style>
