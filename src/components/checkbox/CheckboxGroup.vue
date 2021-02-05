<template>
  <div class="mli-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator'
@Component
export default class MliCheckboxGroup extends Vue {
  @Prop(Array) private value!: Array<string | number>
  @Emit('input')
  emitInput(value: any) {
    return value
  }

  @Emit('change')
  emitChange(value: any) {
    return value
  }
}
</script>
