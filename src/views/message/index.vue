<template>
  <section class="message-page">
    <h1>Hello Message Page</h1>
    <div class="box"></div>

    <div @click="colse">关闭</div>
    <div style="margin: 20px; border: 1px solid #eaeefb; padding:20px">
      <MliButton type="success" @click="showMessage('success')">成功</MliButton>
      <MliButton type="warning" @click="showMessage('warning')">警告</MliButton>
      <MliButton type="danger" @click="showMessage('danger')">危险/错误</MliButton>
      <MliButton type="info" @click="showMessage('info')">主要</MliButton>
    </div>
    <h2>可关闭的</h2>
    <div style="margin: 20px; border: 1px solid #eaeefb; padding:20px">
      <MliButton @click="showMessage('success', { showClose: true })">成功</MliButton>
      <MliButton @click="showMessage('warning', { showClose: true })">警告</MliButton>
      <MliButton @click="showMessage('danger', { showClose: true })">危险/错误</MliButton>
      <MliButton @click="showMessage('info', { showClose: true })">主要</MliButton>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class MessagePage extends Vue {
  private visible = false
  private messageInstance?: any
  showMessage(type: any, options: any = {}) {
    this.$message({
      ...options,
      type: type,
      message: '消息提示'
    })
  }
  colse() {
    this.messageInstance.close()
  }
}
</script>

<style lang="less" scoped>
.message-page {
  .box {
    height: 300px;
    width: 600px;
  }
}
</style>
