/* eslint-disable */
import Vue from 'vue'
import MliIcon from './icon'
import MliButton from './button'
import MliLink from './link'
import MliRadio from './radio'
import MliCheckbox from './checkbox'
import MliCheckboxGroup from './checkbox-group'
import MliInput from './input'
import MliMessage from './message'
import MliCarousel from './carousel'
import MliCarouselItem from './carousel-item'

import { clipboardDirective } from '../directives/index'
const components = [
  MliIcon,
  MliButton,
  MliLink,
  MliRadio,
  MliCheckbox,
  MliCheckboxGroup,
  MliInput,
  MliMessage,
  MliCarousel,
  MliCarouselItem
]

const install = function(Vue: any, options = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(clipboardDirective)
  Vue.prototype.$message = MliMessage
}

export default {
  install,
  MliIcon,
  MliButton,
  MliLink,
  MliRadio,
  MliCheckbox,
  MliCheckboxGroup,
  MliInput,
  MliMessage,
  MliCarousel,
  MliCarouselItem
}
