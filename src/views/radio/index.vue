<template>
  <section class="radio-page">
    <h1>Hello Radio Page</h1>
    <div class="" style="margin: 20px; padding: 20px; border: 1px solid #eaeefb">
      <MliRadio v-model="radio" label="选项一" @change="radioChange" />
      <MliRadio v-model="radio" label="2" @change="radioChange"> 选项二 </MliRadio>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MliRadio from '@/components/Radio.vue'
@Component({ components: { MliRadio } })
export default class RadioPage extends Vue {
  private radio = '1'

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
