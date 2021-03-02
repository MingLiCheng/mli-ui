<template>
  <div class="mli-carousel__item" :style="itemStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class MliCarouselItem extends Vue {
  private translateX = 0

  setItemPostion(index: number, activeIndex: number) {
    this.translateX = this.$parent.$el.clientWidth * (index - activeIndex)
  }
  get itemStyle() {
    return `transform: translateX(${this.translateX}px)`
  }
}
</script>
