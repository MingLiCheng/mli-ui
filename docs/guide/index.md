---
title: '介绍'
---
# 介绍

- 组件 
  - 基于 Vue 2.0 的桌面端组件库, 模仿 Element 仅供学习
  - 使用 Typescript（vue-property-decorator）开发
  - Github [https://github.com/MingLiCheng/mli-ui](https://github.com/MingLiCheng/mli-ui)
- 博客
  - 网站搭建过程问题记录

## 代码示例组件

### 自己开发显示组件

<Common-DemoBlock>
  <MliButton>默认按钮</MliButton>
  <MliButton type="primary">主要按钮</MliButton>
  <MliButton type="success">成功按钮</MliButton>
  <MliButton type="warning">警告按钮</MliButton>
  <MliButton type="danger">危险按钮</MliButton>
  <MliButton type="info">主要按钮</MliButton>
</Common-DemoBlock>

```html
<Common-DemoBlock>
  <MliButton>默认按钮</MliButton>
  <MliButton type="primary">主要按钮</MliButton>
  <MliButton type="success">成功按钮</MliButton>
  <MliButton type="warning">警告按钮</MliButton>
  <MliButton type="danger">危险按钮</MliButton>
  <MliButton type="info">主要按钮</MliButton>
</Common-DemoBlock>
```


### vuepress-plugin-demo-container 插件

::: demo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**
```html
<template>
  <MliButton>默认按钮</MliButton>
  <MliButton type="primary">主要按钮</MliButton>
  <MliButton type="success">成功按钮</MliButton>
  <MliButton type="warning">警告按钮</MliButton>
  <MliButton type="danger">危险按钮</MliButton>
  <MliButton type="info">主要按钮</MliButton>
</template>
```
:::

```md
::: demo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**
```html
<template>
  <MliButton>默认按钮</MliButton>
  <MliButton type="primary">主要按钮</MliButton>
  <MliButton type="success">成功按钮</MliButton>
  <MliButton type="warning">警告按钮</MliButton>
  <MliButton type="danger">危险按钮</MliButton>
  <MliButton type="info">主要按钮</MliButton>
</template>
```<
:::
```
