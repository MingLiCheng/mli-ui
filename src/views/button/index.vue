<!--
 * @Description: 
 * @Author: mlcheng2
 * @Date: 2021-01-29 17:45:50
-->
<template>
  <section class="button-page">
    Button Page
    <div>
      <div style="display: inline-block; border: 1px solid #eaeefb; margin: 12px">
        <div style="margin: 20px">
          <MliButton>默认按钮</MliButton>
          <MliButton type="primary">主要按钮</MliButton>
          <MliButton type="success">成功按钮</MliButton>
          <MliButton type="warning">警告按钮</MliButton>
          <MliButton type="danger">危险按钮</MliButton>
          <MliButton type="info">主要按钮</MliButton>
        </div>
        <div style="margin: 20px">
          <MliButton plain>朴素按钮</MliButton>
          <MliButton type="primary" plain>主要按钮</MliButton>
          <MliButton type="success" plain>成功按钮</MliButton>
          <MliButton type="warning" plain>警告按钮</MliButton>
          <MliButton type="danger" plain>危险按钮</MliButton>
          <MliButton type="info" plain>主要按钮</MliButton>
        </div>
        <div style="margin: 20px">
          <MliButton round>圆角按钮</MliButton>
          <MliButton type="primary" round>主要按钮</MliButton>
          <MliButton type="success" round>成功按钮</MliButton>
          <MliButton type="info" round>信息按钮</MliButton>
          <MliButton type="warning" round>警告按钮</MliButton>
          <MliButton type="danger" round>危险按钮</MliButton>
        </div>
        <div style="margin: 20px; text-align:left;">
          <MliButton circle icon="mli-icon-search"></MliButton>
          <MliButton type="primary" icon="mli-icon-edit" circle></MliButton>
          <MliButton type="success" icon="mli-icon-select" circle></MliButton>
          <MliButton type="info" icon="mli-icon-favorite" circle></MliButton>
          <MliButton type="warning" icon="mli-icon-email" circle></MliButton>
          <MliButton type="danger" icon="mli-icon-ashbin" circle></MliButton>
        </div>
      </div>
    </div>
    <div>
      <div style="display: inline-block; border: 1px solid #eaeefb; margin: 12px">
        <div style="margin: 20px">
          <MliButton disabled>默认按钮</MliButton>
          <MliButton type="primary" disabled>主要按钮</MliButton>
          <MliButton type="success" disabled>成功按钮</MliButton>
          <MliButton type="warning" disabled>警告按钮</MliButton>
          <MliButton type="danger" disabled>危险按钮</MliButton>
          <MliButton type="info" disabled>主要按钮</MliButton>
        </div>
        <div style="margin: 20px">
          <MliButton plain disabled>朴素按钮</MliButton>
          <MliButton type="primary" plain disabled>主要按钮</MliButton>
          <MliButton type="success" plain disabled>成功按钮</MliButton>
          <MliButton type="warning" plain disabled>警告按钮</MliButton>
          <MliButton type="danger" plain disabled>危险按钮</MliButton>
          <MliButton type="info" plain disabled>主要按钮</MliButton>
        </div>
      </div>
    </div>

    <div style="margin: 20px"></div>
    <div style="margin: 20px">
      <MliButton plain disabled>朴素按钮</MliButton>
      <MliButton plain type="primary" disabled>朴素按钮</MliButton>
    </div>

    <div style="margin: 20px">
      <MliButton @click="test($event, 'ceshi')">测试</MliButton>
      <i class="mli-icon-add"></i>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class ButtonPage extends Vue {
  test(e: Event, y: string) {
    console.log('e', e, 'y', y)
  }
}
</script>

<style lang="less" scoped>
.button-page {
  display: flex;
  flex-direction: column;
}
</style>
