---

pageClass: custom-page-class
title: 快速上手

---
# 快速上手
本节将介绍如何在项目中使用 UI。

## 安装
> 线上是只有一个 组件：MliButton 的测试， 后续优化打包之后再上传
``` shell
npm install mli-ui
# 或
yarn add mli-ui
```
## 引入 MliUi
引入整个 MliUi

```javascript
import Vue from 'vue';
import MliUi from 'mli-ui';
import App from './App.vue';

Vue.use(MliUi);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
