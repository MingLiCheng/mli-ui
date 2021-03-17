---
title: 'css'
---

# CSS

## currentColor
> CSS变量， 该CSS变量值顾名思义就是当前color值，你可以这样理解：currentColot = color，该属性值用于读取和同步字体颜色，用以其他地方

```html
<style>
.box {
  border: 1px solid; 
  /* border: 1px solid currentColor */
}

/* eg */
.btn-box {
  color: hotpink;
}
.btn-box:hover {
  background-color: currentColor; 
  /* 自动集成btn-box的 color颜色 */
}
.btn-box:hover .txt {
  color: white
}
</style>
```