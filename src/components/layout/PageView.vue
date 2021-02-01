<!--
 * @Description: 
 * @Author: mlcheng2
 * @Date: 2021-01-27 09:47:36
-->
<template>
  <keep-alive :include="keepAlive">
    <router-view />
  </keep-alive>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class PageView extends Vue {
  @Prop({ type: Array, default: () => [] }) private keepAlive!: Array<string>
}
</script>
