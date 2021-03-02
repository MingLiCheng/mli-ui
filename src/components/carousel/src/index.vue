<template>
  <div :class="['mli-carousel']">
    <slot></slot>
    <button class="mli-carousel__arrow mli-carousel__arrow--left" @click="handleLastClick">
      <i class="mli-icon-arrow-left-bold"></i>
    </button>
    <button class="mli-carousel__arrow mli-carousel__arrow--right" @click="handleNextClick()">
      <i class="mli-icon-arrow-right"></i>
    </button>

    <div class=""></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import MliCarouselItem from './item.vue'
@Component({})
export default class MliCarousel extends Vue {
  private activeIndex = 0
  private translateX = 0
  items: MliCarouselItem[] = []

  mounted() {
    this.initItems()
  }

  initItems() {
    this.items = this.$children.filter(children => {
      return children.$options.name === 'MliCarouselItem'
    }) as MliCarouselItem[]

    this.items.forEach((element, index) => {
      element.setItemPostion(index, this.activeIndex)
    })
  }

  handleLastClick() {
    console.log('laset')
    this.activeIndex > 1 ? this.activeIndex-- : (this.activeIndex = 3)
  }

  handleNextClick() {
    this.items.forEach((element, index) => {
      element.setItemPostion(this.activeIndex + 1, index)
    })
  }

  get itemStyle() {
    return `transform: translateX(${this.translateX}px)`
  }

  @Watch('activeIndex', { immediate: true })
  activeIndexWatch(newVal: number, oldVal: number) {
    // if(newVal == 3) { // 当前是最大的一个 把第一个移动到后面

    // }
    console.log('new', newVal)
    console.log('old', oldVal)
  }
}
</script>

<style lang="less">
@import url('../../../assets/styles/_variable.less');
.mli-carousel {
  display: inline-block;
  width: 500px;
  height: 200px;
  border: 1px solid @color-border;
  position: relative;
  overflow: hidden;

  &__item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    z-index: 0;

    transition: 1s;
  }
  &__arrow {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    height: 36px;
    width: 36px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 50%;
    background-color: rgba(31, 45, 61, 0.11);
    color: #fff;

    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    text-align: center;
    font-size: 12px;

    &--left {
      left: 16px;
    }
    &--right {
      right: 16px;
    }
  }
}
</style>
