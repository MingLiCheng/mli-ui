---
title: '浅拷贝与深拷贝'
---

# js 浅拷贝与深拷贝

- 浅拷贝

```javascript
function shallowCopy(obj) {
  if(!(obj instanceof Object)) {
    return obj
  }
  let newObj = []
  for(let key in obj){
    if(obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
```


- 深拷贝

```javascript
// 学习使用， 代码中使用 _.cloneDeep
function deepCopy(obj) {
    if (obj instanceof Object) {
        let newObj = {};
        if (Array.isArray(obj)) {
            let arr = [];
            obj.forEach(item => {
                arr.push(deepCopy(item));
            })
            return arr;
        } else {
            for (let key in obj) {
                let value = obj[key];
                if (typeof value == 'function') {
                    newObj[key] = value.bind(newObj);
                } else if (typeof value == 'object') {
                    if (Array.isArray(value)) {
                        newObj[key] = [];
                        value.forEach(item => {
                            newObj[key].push(deepCopy(item));
                        })
                    } else {
                        newObj[key] = deepCopy(value);
                    }
                } else {
                    newObj[key] = value;
                }
            }
        }
        return newObj;
    } else {
        return obj;
    }
}
```