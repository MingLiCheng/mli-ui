---
title: Promise
---

# Promise 承诺/期约
> Promise 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值. <br>
> 语法： `new Promise( function(resolve, reject) {...} /* executor */  );`

- 异步封装， 放弃高耦合的callback
- 链式调用 then() 返回一个新的promise 所以可以进行链式调用

## 使用示例
微信小程序 请求 封装

```javascript
function request (url, method, params = null) {
  return new Promise((resolve, reject) => {
    qcloud.request({
      url: config.host + url,
      method,
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: params,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
```

## 解析与实现
- 三个状态：pending, fulfilled, rejected 
- 两个函数：resolve() , rejedct()
- 状态转移：pending ---> resolve() ---> fulfilled  | pending ---> reject() ---> fulfilled

promise微任务实现
> Node环境中可以使用process.nextTick回调来模拟微任务的执行 <br>
> 而在浏览器环境中我们可以选择MutationObserver
```javascript
function nextTick(callback) {
  if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
    process.nextTick(callback)
  } else {
    const observer = new MutationObserver(callback)
    const textNode = document.createTextNode('1')
    observer.observe(textNode, {
      characterData: true
    })
    textNode.data = '2'
  }
}
```