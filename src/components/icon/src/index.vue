<!--
 * @Description: 
 * @Author: mlcheng2
 * @Date: 2021-02-01 15:18:10
-->
<template>
  <i :class="`mli-icon-${name}`"></i>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class MliIcon extends Vue {
  @Prop({ type: String, default: '' }) private name!: string
}
</script>
