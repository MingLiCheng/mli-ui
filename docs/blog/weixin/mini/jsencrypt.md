---
title: 小程序 JSEncrypt RSA
---

# 微信小程序中使用 jsencrypt 进行 rsa 加/解密
> 和服务端交互的接口需要对参数进行rsa加密, h5中使用`jsencrypt`进行的加密操作<br>
> 移植到微信小程序中发现问题，因为`jsencrypt`中有window的相关操作，但是微信小程序中不存在window所以报错<br>
> 此文档记录微信小程序中使用`jsencrypt`的方法


### 1. 下载安装jsencrypt

```shell
yarn add jsencrypt -S
```
> 安装成功后检查node_modules文件夹下是否安装成功

### 2. 使用微信开发者工具构建npm

路径： 工具 --> 构建 npm

> 构建成功后查看 miniprogram_npm 下是否存在 `jsencrypt` 文件夹以及相关代码<br>
> 此时应该会发现程序代码报错了

### 3. 使用jsencrypt

```javascript

// 引入
import { JSEncrypt } from 'jsencrypt'
import GlobalConfig from '../../config/index.js'
const RSA_PUBLICKEY = GlobalConfig.rsaPublicKey
// 使用
function todo () {
  const { passWord } = this.data
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(RSA_PUBLICKEY)
  const psw = encrypt.encrypt(passWord) //rsa加密
}


```
> 此时使用方法是正确的但是 程序报错


### 4. 修改构建后的jsencrypt源码
> 将一下代码添加到源码文件中， 然后全局替换 `window` 为 `window2`  `navigator` 为 `navigator2` <br>
> **注意全匹配** 别把 window2替换为window22了

```javascript
// 在文件开头添加 navigator2 window2两个变量
module.exports = (function() {
//------- 这里开始添加---------
// 用来替换 navigator2
var navigator2 = {
    appName: 'Netscape',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};
//  用来替换window2
var window2 = {
    ASN1: null,
    Base64: null,
    Hex: null,
    crypto: null,
    href: null
};
// ...
})()

```
> 这时候代码应该可以正常运行了

### 5. 移动源码文件
将修改后的jsencrypt源码文件夹移动 到 utils文件夹中， 防止后续构建npm包时引起代码变化<br>

更改引入路径

```javascript
import { JSEncrypt } from '../../utils/jsencrypt/index'
```

**`凡是修改后的代码都不应该放入到npm相关目录中`**




