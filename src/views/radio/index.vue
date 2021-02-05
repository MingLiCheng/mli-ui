<template>
  <section class="radio-page">
    <h1>Hello Radio Page</h1>
    <div class="" style="margin: 20px; padding: 20px; border: 1px solid #eaeefb">
      <MliRadio v-model="radio" label="选项一" @change="radioChange" />
      <MliRadio v-model="radio" label="2" @change="radioChange"> 选项二 </MliRadio>
      <MliRadio v-model="radio" label="3" @change="radioChange"> 选项三 </MliRadio>
    </div>

    <h2>禁用的 disabled</h2>
    <div class="" style="margin: 20px; padding: 20px; border: 1px solid #eaeefb">
      <MliRadio v-model="radio" label="选项一" disabled @change="radioChange" />
      <MliRadio v-model="radio" label="2" disabled @change="radioChange"> 选项二 </MliRadio>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MliRadio from '@/components/Radio.vue'
@Component({ components: { MliRadio } })
export default class RadioPage extends Vue {
  private radio = '2'

  radioChange(value: string) {
    console.log('value', value)
  }
}
</script>

<style lang="less" scoped>
.radio-page {
  color: #ccc;
}
</style>
