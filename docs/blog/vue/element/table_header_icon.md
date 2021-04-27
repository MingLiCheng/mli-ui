---
title: el-table 表头增加自定义图标
---

# el-table 表头增加自定义图标
> 在el-table的 一列表头上增加一个icon 给用户提示该列的信息  el-icon-warning-outline


```html
<el-table-column prop="xxxx" label="xxxxxxx" :render-header="renderHeader"> </el-table-column>
```
```javascript
    renderHeader(h, { column, $index }) {
      return h(
        'div',
        {
          style: 'position:relative;'
        },
        [
          h('span', null, [
            'xxxxxxxx',
            h(
              'el-tooltip',
              {
                props: {
                  effect: 'dark',
                  content: 'xxxxxxxxxxxxx',
                  placement: 'right-start',
                  'popper-class': 'net-status-tooltip'
                }
              },
              [
                h('i', {
                  class: 'el-icon-warning-outline'
                })
              ]
            )
          ])
        ]
      )
    },
```

## h函数介绍
> 在vuejs中，h函数仅是作为createElement函数之缩写，而render只是暴露给是开发者去使用createElement的钩子，因为本质上createElement是为了做渲染，因此笼统地称作是渲染函数也是可以的，只要心里清除背后真正在做事情的是createElement函数就好
> 
```javascript
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签字符串，组件选项对象，或者一个返回值
  // 类型为 String/Object 的函数，必要参数
  'div',

  // {Object}
  // 一个包含模板相关属性的数据对象
  // 这样，您可以在 template 中使用这些属性。可选参数。
  {
    // (详情见下一节)
  },

  // {String | Array}
  // 子节点 (VNodes)，由 `createElement()` 构建而成，
  // 或使用字符串来生成“文本节点”。可选参数。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

> 属性对象详解
```javascript
let object = {
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 `on`
  // 所以不再支持如 `v-on:keyup.enter` 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}

```
