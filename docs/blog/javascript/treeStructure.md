---
title: 树形结构数据处理
---

# 树形结构数据处理函数

> 树型结构在业务中还是经常使用到的，收集经常使用的相关函数


## 节点查找

### 1. 查找制定节点的父节点信息

```javascript
const findFatherNode = function(array, node, fNode) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if(element.value === node.value) {
      return fNode || array;
    }
    if(element.children) {
      const targetNode = findFatherNode(element.children, node, element)
      if(targetNode) {
        return targetNode
      }
    }
  }
}
```
