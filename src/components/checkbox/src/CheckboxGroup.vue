<template>
  <div class="mli-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MliCheckboxGroup',
  props: {
    value: {
      type: Array
    }
  },
  methods: {
    emitInput(value) {
      this.$emit('input', value)
    },
    emitChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
