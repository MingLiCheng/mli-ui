---
title: Message 消息提示
---

# Message 消息提示
常用于主动操作后的反馈提示


## 基础用法
从顶部出现，3 秒后自动消失。
::: demo MliUi 注册了一个`$message`方法用于调用，Message 可以接收一个字符串
```html
<template>
  <MliButton :plain="true" @click="open">打开消息提示</MliButton>
</template>


<script>
export default {
  methods: {
    open() {
      this.$message('这是一条消息提示');
    }
  }
}
</script>
```
:::

## 不同状态
用来显示「成功、警告、消息、错误」类的操作反馈。

::: demo 设置`type`字段可以定义不同的状态，默认为`info`。此时正文内容以`message`的值传入。同时，我们也为 Message 的各种 `type` 注册了方法，可以在不传入type字段的情况直接调用`this.$message.success`。
```html
<template>
  <MliButton :plain="true" type="success" @click="open('success')">成功</MliButton>
  <MliButton :plain="true" type="warning" @click="open('warning')">警告</MliButton>
  <MliButton :plain="true" type="info" @click="open('info')">消息</MliButton>
  <MliButton :plain="true" type="danger" @click="open('danger')">错误</MliButton>
</template>
<script>
export default {
  methods: {
    open(type) {
      this.$message({
        message: `恭喜你，这是一条${type==='success'? '成功' : type==='warning' ? '警告' : type ==='danger' ? '错误' : '' }消息 ${ type==='info' ? '提示' : '' }。`,
        type,
      });
    }
  }
}
</script>
```
:::

```javascript
;(['success', 'warning', 'info', 'error'] as const).forEach((type: string) => {
  Message[type] = (options: IMessageOptions) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})
```

## 可关闭
可以添加关闭按钮。

::: demo 
```html
<template>
  <MliButton :plain="true" type="info" @click="open1">消息</MliButton>
  <MliButton :plain="true" type="success" @click="open2">成功</MliButton>
  <MliButton :plain="true" type="warning" @click="open3">警告</MliButton>
  <MliButton :plain="true" type="danger" @click="open4">错误</MliButton>
</template>
<script>
export default {
  methods: {
    open1() {
      this.$message({
        showClose: true,
        message: '这是一条消息提示'
      });
    },

    open2() {
      this.$message({
        showClose: true,
        message: '恭喜你，这是一条成功消息(不会自动消失)',
        type: 'success',
        duration: 0
      });
    },

    open3() {
      this.$message({
        showClose: true,
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      });
    },

    open4() {
      this.$message({
        showClose: true,
        message: '错了哦，这是一条错误消息',
        type: 'error'
      });
    }
  }
}
</script>
```
:::

### Attributes

|   参数    |                 说明                  |  类型  |           可选值            | 默认值 |
| :-------: | :-----------------------------------: | :----: | :-------------------------: | ------ |
|  message  |               消息文字                | string |              -              | -      |
|   type    |                 主题                  | string | success/warning/danger/info | info   |
| duration  | 显示时间, 毫秒。设为 0 则不会自动关闭 | number |              —              | 3000   |
| iconClass |     自定义图标的类名，会覆盖 type     | string |              —              | -      |

<style>
table {
  display: table;
  width: 100%;
}
</style>