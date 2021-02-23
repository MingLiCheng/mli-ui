<template>
  <section>
    <h1>Hello Link</h1>
    <div style="margin: 20px; padding: 20px; border: 1px solid #eaeefb">
      <MliLink>默认链接</MliLink>
      <MliLink type="primary">主要链接</MliLink>
      <MliLink type="success">成功链接</MliLink>
      <MliLink type="warning">警告链接</MliLink>
      <MliLink type="info">信息链接</MliLink>
      <MliLink type="danger">危险链接</MliLink>
    </div>
    <div style="margin: 20px; padding: 20px; border: 1px solid #eaeefb">
      <MliLink disabled>默认链接</MliLink>
      <MliLink type="primary" disabled>主要链接</MliLink>
      <MliLink type="success" disabled>成功链接</MliLink>
      <MliLink type="warning" disabled>警告链接</MliLink>
      <MliLink type="info" disabled>信息链接</MliLink>
      <MliLink type="danger" disabled>危险链接</MliLink>
    </div>
    <div style="margin: 20px; padding: 20px; border: 1px solid #eaeefb">
      <MliLink icon="mli-icon-play">播放</MliLink>
      <MliLink icon="mli-icon-navigation">发送</MliLink>
    </div>

    <div style="margin: 20px; padding: 20px; border: 1px solid #eaeefb">
      <MliInput v-model="inputValue" placeholder="请输入内容"></MliInput>
    </div>
  </section>
</template>

<script lang="ts">
import MliLink from '@/components/link'
import MliInput from '@/components/input'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: { MliLink, MliInput }
})
export default class MliLinkPage extends Vue {
  private inputValue = ''
}
</script>
