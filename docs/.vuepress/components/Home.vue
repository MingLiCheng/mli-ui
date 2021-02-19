<template>
  <div class="special-layout-wrapper">
    <Navbar />
    <div class="box">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from '@theme/components/Navbar.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components:{ Navbar }
})
export default class SpecialLayout extends Vue {}
</script>


<style lang="less">
.box {
  padding-top: 3.6rem;
  border: 1px solid #ccc;
  display: flex;
  width: 100%;
  height: 600px;
  .left {
    flex: 1;
    border: 1px solid hotpink;
    margin: 12px;
  }
  .right {
    flex: 1;
    border: 1px solid hotpink;
    margin: 12px;
    margin-left: 0px;
  }
}
</style>