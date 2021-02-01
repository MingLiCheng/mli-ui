<!--
 * @Description: 
 * @Author: mlcheng2
 * @Date: 2021-02-01 15:40:37
-->
<template>
  <section class="icon-page">
    <h1>Hello Icon Page</h1>
    <div class="case-box">
      <i class="mli-icon-edit"></i>
      <i class="mli-icon-share"></i>
      <i class="mli-icon-delete"></i>
      <MliButton type="primary" icon="mli-icon-search">搜索</MliButton>
    </div>
    <div class="all">
      <ul>
        <template v-for="iconItem in iconList">
          <li :key="iconItem" v-clipboard:copy="iconItem" v-clipboard:success="clipboardSuccess">
            <span><i :class="iconItem"></i></span>
            <span> {{ iconItem }} </span>
          </li>
        </template>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import Clipboard from 'clipboard'
import { Component, Vue } from 'vue-property-decorator'
import Icon from '@/components/Icon.vue'
import MliButton from '@/components/Button.vue'
import iconList from './icon-all'
@Component({
  components: { Icon, MliButton }
})
export default class IconPage extends Vue {
  private iconList = iconList

  clipboardSuccess(e: Clipboard.Event) {
    console.log('e', e)
  }
}
</script>

<style lang="less" scoped>
.icon-page {
  i {
    color: #606266;
    margin: 0 20px;
    font-size: 1.5em;
    vertical-align: middle;
  }
  .case-box {
    margin: 20px;
    i {
      margin: 0px 20px;
    }
  }
  .all {
    ul {
      list-style: none;
      padding: 0px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #eee;
      flex-wrap: wrap;
      width: 726px;
      li {
        width: 120px;
        height: 120px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &:hover {
          color: #5cb6ff;
          i {
            color: #5cb6ff;
          }
        }
        span {
          &:first-of-type {
            display: flex;
            align-items: center;
            flex: 1;
          }
          &:last-of-type {
            height: 40px;
          }
        }
      }
    }
  }
}
</style>
