---
title: js 函数 apply call bind 
---

# apply call bind 
- apply
> apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。<br>
> 在调用一个存在的函数时，你可以为其指定一个 this 对象。 this 指当前对象，也就是正在调用这个函数的对象。 使用 apply， 你可以只写一次这个方法然后在另一个对象中继承它，而不用在新对象中重复写该方法。<br>
> func.apply(thisArg, [argsArray])
- call 
> 该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数<br>
> fun.call(thisArg, arg1, arg2, ...)
- bind
> bind() 方法创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。<br>
> function.bind(thisArg[,arg1[,arg2[, ...]]])

```javascript
    const Person = function (name) {
      this.name = name
    }
    Person.prototype.getName = function(exec = '') {
      console.log('name', this.name + ' ' + exec);
    }
    const laoli = new Person('laoli') // laoli Person {name: "laoli"}
    laoli.getName('xxx') // name laoli xxx

    // apply call bind
    const laowang = { name: '老王' }

    laoli.getName.call(laowang, 'cal') // name 老王 cal
    laoli.getName.apply(laowang, ['apply']) // name 老王 apply
    const bindfunction = laoli.getName.bind(laowang, 'bind')  // return fn
    bindfunction() // name 老王 bind
```

```javascript
  Function.prototype._apply = function(newThis, arr) {
    const oThis = this
    const thisFn = Symbol('thisFn')
    newThis[thisFn] = oThis
    let result =  newThis[thisFn](arr)
    delete newThis[thisFn]
    return result
  }
```

```javascript
  Function.prototype._bind = function(newThis, ...params) {
    // 首先保存调用这个方法本身的对象的 this  因为最后 需要拷贝或者执行这个方法
    const oThis = this
    const newFun = function (...sParams) {
      return oThis.apply(newThis, [...params, ...sParams])
    }
    newFun.prototype = Object.create(oThis.prototype)
    return newFun
  }
```