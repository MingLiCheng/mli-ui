<template>
  <div class="icon-page">
    <ul>
      <template v-for="iconItem in iconList">
        <li :key="iconItem" v-clipboard:copy="iconItem" v-clipboard:success="clipboardSuccess">
          <span><i :class="`mli-icon-${iconItem}`"></i></span>
          <!-- <MliIcon :name="iconItem"></MliIcon> 这里面 好像不能这样使用全局组件 打包之后无法编译 -->
          <span> {{ iconItem }} </span>
        </li>
      </template>
    </ul>
  </div>
</template>


<script lang="ts">
import iconList from './icon-all.ts'
export default {
  data() {
    return {
      iconList
    }
  },
  methods: {
    clipboardSuccess(e) {
      this.$message.success('复制成功' + ' ' + e.text)
    }
  }
}
</script>

<style lang="less">
.icon-page {
  // border: 1px solid #eee;
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
  ul {
    list-style: none;
    padding: 0px;
    // margin: 0 auto;
    // border: 1px solid #eee;
    border-right: none;
    border-bottom: none;
    width: 100%;
    margin-right: -1px;
    display: flex;
    flex-wrap: wrap;

    // display: grid;
    // grid-template-columns: repeat(8, 12.5%);
    // grid-template-rows: repeat(122px);
    // grid-template-columns: 150px 150px 150px;
    // grid-template-rows: 150px 150px 150px;

    li {
      // width: 100%;
      // border-right: 1px solid #eee;
      // border-bottom: 1px solid #eee;
      width: calc(12.5% + 1px);
      min-width: 110px;
      height: 122px;
      border: 1px solid #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-right: -1px;
      margin-bottom: -1px;

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
          i {
            font-size: 32px;
          }
        }

        &:last-of-type {
          height: 32px;
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
}
</style>