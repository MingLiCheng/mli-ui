---
title: '对象属性访问'
---

# 对象属性访问

- eg  谷歌V8

```javascript
function yyz(){
    this['A']='A'
    this[0]='2'
    this['1']=3
    this[2]='4'
    this['handsome']=5
    this[7.7]=7.7
    this[888]='6'
    this['B']='B'
};

const handsomeBoy = new yyz()

for (let key in handsomeBoy) {
   console.log(`${key}:${handsomeBoy[key]}`);
};
// console
// 0:2
// 1:3
// 2:4
// 888:6
// A:A
// handsome:5
// 7.7:7.7
// B:B

```

在V8的对象中有分俩种属性，排序属性以（elements）及常规属性（properties），数字被分类为排序属性，字符串属性就被称为常规属性，其中排序属性按照数字大小升序而常规属性按照创建升序，执行顺序也是先查elements再查找properties。

<img src="@assets/images/js-ov-01.png" alt="" style="border:1px solid #ccc; padding:6px">


总结：

- 排序顺序数字按大小排序->字符串按先后执行顺序排序
- 数字存储在排序属性字符串存储在常规属性->10个及10个以内会在内部生成属性-> 大于十个在properties里线性存储 -> 数量大的情况改为散列表存储