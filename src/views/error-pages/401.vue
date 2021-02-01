<template>
  <div class="errPage-container">
    <img :src="errGif" class="some-gif" width="313" height="428" alt="Girl has dropped her ice cream." />
    <div class="info-box">
      <h2 class="text-401">401 Page No Permission</h2>
      <a href="javascript:;" class="text-401__return-home" @click="$router.replace('/')">Back to home</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import errGif from '@/assets/images/401/401.gif'

@Component({
  name: 'Page401'
})
export default class extends Vue {
  private errGif = errGif + '?' + +new Date()
}
</script>

<style lang="less" scoped>
@import '@/assets/styles/_variable.less';
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  display: flex;
  .text-401 {
    font-size: 20px;
    line-height: 24px;
    color: #222;
    font-weight: bold;
  }
  .info-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .text-401__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: @color-primary;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
  }
}
</style>
