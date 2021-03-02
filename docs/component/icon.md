---
title: Icon 图标
---
# MliIcon 图标
<p>提供了一套常用的图标集合。</p>

### 使用方法
直接通过设置类名为`mli-icon-iconName` 来使用即可。例如

::: demo
```html
<i class="mli-icon-favorite-filling"></i>
<i class="mli-icon-add"></i>
<i class="mli-icon-adjust"></i>
<i class="mli-icon-bad"></i>

<MliIcon name="bad"/>
```
:::

<Component-Icon></Component-Icon>

<!-- <template>
  <div class="icon-page">
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
      this.$message.success('复制成功' + ' ' + e.text)
    }
  }
}
</script>

<style lang="less">
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
</style> -->
