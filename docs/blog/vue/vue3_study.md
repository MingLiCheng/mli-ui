--- 
title: Vue3.x 学习笔记
---

# Vue3.x 学习笔记

## Vue3.x的优势
- 性能更强 对比 Vue2.x性能提升1-2倍
  - diff算法优化， 3.x在生成虚拟DOM时 添加标记， 仅对比被标记的DOM进行diff算法比较， 标记是针对不同的类型打上不同的flag https://vue-next-template-explorer.netlify.app/
  - 静态提升
    - 2.x 无论是否需要更新每次都需要重新创建，然后渲染
    - 3.x 对不需要更新的(没有标记的) 只创建一次 渲染时直接复用