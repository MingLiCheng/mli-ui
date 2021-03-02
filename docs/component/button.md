---
title: 'Button 按钮'
---
# MliButton 按钮
<p>常用的操作按钮</p>

<h3>基础用法</h3>
<p>基础的按钮用法。</p>

::: demo
```html
<template>
  <div style="margin:20px 0px">
    <MliButton>默认按钮</MliButton>
    <MliButton type="primary">主要按钮</MliButton>
    <MliButton type="success">成功按钮</MliButton>
    <MliButton type="warning">警告按钮</MliButton>
    <MliButton type="danger">危险按钮</MliButton>
    <MliButton type="info">主要按钮</MliButton>
  </div>
  <div style="margin:20px 0px">
    <MliButton plain>朴素按钮</MliButton>
    <MliButton type="primary" plain>主要按钮</MliButton>
    <MliButton type="success" plain>成功按钮</MliButton>
    <MliButton type="warning" plain>警告按钮</MliButton>
    <MliButton type="danger" plain>危险按钮</MliButton>
    <MliButton type="info" plain>主要按钮</MliButton>
  </div>
  <div style="margin:20px 0px">
    <MliButton round>圆角按钮</MliButton>
    <MliButton type="primary" round>主要按钮</MliButton>
    <MliButton type="success" round>成功按钮</MliButton>
    <MliButton type="info" round>信息按钮</MliButton>
    <MliButton type="warning" round>警告按钮</MliButton>
    <MliButton type="danger" round>危险按钮</MliButton>
  </div>
  <div style="margin:20px 0px; text-align:left;">
    <MliButton circle icon="mli-icon-search"></MliButton>
    <MliButton type="primary" icon="mli-icon-edit" circle></MliButton>
    <MliButton type="success" icon="mli-icon-select" circle></MliButton>
    <MliButton type="info" icon="mli-icon-favorite" circle></MliButton>
    <MliButton type="warning" icon="mli-icon-email" circle></MliButton>
    <MliButton type="danger" icon="mli-icon-ashbin" circle></MliButton>
  </div>
</template>
```
:::

<h3>禁用状态</h3>
<p>按钮不可用状态。</p>

::: demo
```html
<template>
  <div style="margin: 20px 0px">
    <MliButton disabled>默认按钮</MliButton>
    <MliButton type="primary" disabled>主要按钮</MliButton>
    <MliButton type="success" disabled>成功按钮</MliButton>
    <MliButton type="warning" disabled>警告按钮</MliButton>
    <MliButton type="danger" disabled>危险按钮</MliButton>
    <MliButton type="info" disabled>主要按钮</MliButton>
  </div>
  <div style="margin: 20px 0px">
    <MliButton plain disabled>朴素按钮</MliButton>
    <MliButton type="primary" plain disabled>主要按钮</MliButton>
    <MliButton type="success" plain disabled>成功按钮</MliButton>
    <MliButton type="warning" plain disabled>警告按钮</MliButton>
    <MliButton type="danger" plain disabled>危险按钮</MliButton>
    <MliButton type="info" plain disabled>主要按钮</MliButton>
  </div>
</template>
```
:::