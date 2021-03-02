<!--
 * @Description: 
 * @Author: mlcheng2
 * @Date: 2021-01-29 17:45:50
-->
<template>
  <section class="button-page">
    Button Page
    <div>
      <div style="display: inline-block; border: 1px solid #eaeefb; margin: 12px; padding:50px">
        <MliCarousel>
          <MliCarouselItem style="background: rgb(241, 104, 104)">1</MliCarouselItem>
          <MliCarouselItem style="background: rgb(238, 183, 110)">2</MliCarouselItem>
          <MliCarouselItem style="background: rgb(149, 236, 122)">3</MliCarouselItem>
        </MliCarousel>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class CarouselPage extends Vue {}
</script>

<style lang="less" scoped>
.button-page {
  display: flex;
  flex-direction: column;
}
</style>
