<template>
  <section class="demo-block">
    <div class="demo-block-border">
      <slot></slot>
    </div>
    <div class="demo-block-code">

    </div>
    <div class="demo-block-control">
      <i
        ><svg
          t="1612603218449"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3592"
          width="14"
          height="14"
        >
          <path
            d="M180.177 258.603c-32.209 0-49.892 39.532-29.407 65.799l316.399 405.35c23.526 30.156 67.296 30.156 90.824 0l316.079-405.394c20.485-26.227 2.8-65.757-29.408-65.757l-664.487 0z"
            p-id="3593"
            fill="#409eff"
          ></path></svg
      ></i>

      <span>显示代码</span>
      <a class="link-btn control-btn" href="javascript:;">测试</a>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DemoBlock extends Vue {
  mounted() {
    console.log('this', this);
    
  }
}
</script>

<style lang="less" scoped>
.demo-block {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  border: 1px solid #eaeefb;
  font-size: 14px;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .demo-block-control {
      color: #d3dce6;
      background-color: #f9fafc;
      .control-btn {
        opacity: 1;
        display: inline-block;
        right: 20px;
      }
      i {
        transform: translateX(-10px);
      }
      span {
        transform: translateX(-10px);
        opacity: 1;
      }
    }
  }
  &-border {
    display: inline-block;

    padding: 24px;
  }
  &-control {
    border-top: 1px solid #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    // transition: all 0.3s ease-in;

    i {
      transition: 0.3s;
      transform: translateX(30px);
      display: inline-block;
      height: 14px;
      color: #409eff;
    }
    span {
      transition: 0.3s;
      font-size: 14px;
      line-height: 44px;
      opacity: 0;
      margin-left: 6px;
      transform: translateX(20px);
    }
    .control-btn {
      opacity: 0;
      transition: all 0.3s ease-in;
    }

    &:hover {
      span, .control-btn{
        color: #409eff;
      }
    }
  }
  &-code {
    height: 100px;
    background-color: #FAFAFA;
    border-top: 1px solid #eaeefb;
  }

  .link-btn {
    color: #d3dce6;
    position: absolute;
    right: 0px;
  }
}
</style>