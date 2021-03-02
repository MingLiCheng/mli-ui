<template>
  <div class="home">
    <h1>"Welcome to Your Vue.js + TypeScript App"</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
.home {
  padding: 20vh;
}
</style>
