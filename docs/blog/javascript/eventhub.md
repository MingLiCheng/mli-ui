---
title: 'eventhub'
---
# EventHub
> eventhub 是一个在模块间传递事件的方式， 采用发布订阅模式  on emit off
> 创建一个对象用来缓存发布的事件， emit时调用对应的方法， off时注销事件

- 1. 定义EventHub
```javascript
class EventHub {
  cache = {}
  on(eventName, fn){}
  emit(eventName, params){}
  off(eventName)
}
```

- 2. 实现on函数,向cache中存储这个事件

```javascript
on(eventName, fn){
  this.cache[eventName] = this.cache[eventName] || []
  this.cache[eventName].push(fn)
}
```
- 3. 实现emit函数,执行cache中存储的事件

```javascript
emit(eventName, params){
  this.cache[eventName] = this.cache[eventName] || []
  this.cache[eventName].foreach(fn => fn(params))
}
```