<template>
  <div class="all">
    <ul>
      <template v-for="iconItem in iconList">
        <li :key="iconItem" v-clipboard:copy="iconItem" v-clipboard:success="clipboardSuccess">
          <span><MliIcon :name="iconItem"></MliIcon></span>
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
      console.log('e', e, this)
      // this.$refs.message1.success('复制成功' + ' ' + e.text)
      this.$message.success({
        type: 'success',
        message: '复制成功' + ' ' + e.text
      })
    }
  }
}
</script>

<style lang="less">
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
    border-right: none;
    flex-wrap: wrap;
    width: 666px;

    li {
      width: 132.8px;
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
          i {
            font-size: 28px;
          }
        }

        &:last-of-type {
          height: 50px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>