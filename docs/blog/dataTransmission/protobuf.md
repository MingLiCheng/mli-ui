---
title: protobuf 协议
---

# protobuf 协议
> protocolbuffer(以下简称PB)是google 的一种数据交换的格式，它独立于语言，独立于平台。<br>
> 由于它是一种二进制的格式，比使用 xml 进行数据交换快许多。可以把它用于分布式应用之间的数据通信或者异构环境下的数据交换。作为一种效率和兼容性都很优秀的**二进制数据**传输格式，可以用于诸如网络传输、配置文件、数据存储等诸多领域。

## 使用背景
项目中使用websocket进行信息交互，在数据交互中使用了pb协议，把json数据使用pb协议转化为二进制数据然后通过websocket传送给服务端

## ProtoBuf 使用流程
1. 定义.proto文件<br>
首先我们需要编写一个 proto 文件，定义我们程序中需要处理的结构化数据，在 protobuf 的术语中，结构化数据被称为 Message。<br>
proto 文件非常类似 java 或者 C 语言的数据定义。

下面代码显示了例子应用中的 proto 文件内容：
文件名： aiui.proto (packageName.MessageName.proto)
```javascript
// proto 协议类型
syntax = "proto3";
// 包名
package api_aiui;
//ai能力平台基础配置
message Base {
    required string appId = 1; //应用标识
    optional string uid = 2; //终端标识
    string deviceId = 3; //设备标识
}

```
在上例中，package 名字叫做 api_aiui，<br>
定义了一个消息 Base，该消息有三个成员，类型为 string 的必须成员 appId, 类型为 string 的可选成员 uid。类型为string的可选成员 deviceId。

**proto文件一般为服务端接口人员提供，或合作制定好后两端使用相同的proto文件**

2. 编译.proto文件<br>
使用响应代码平台的依赖包编译proto文件，生成目标语言所需的包<br>
本次是web端使用的所以提供javascript编译方式
```shell
# 安装所需依赖
yarn add protobufjs -S
# 使用命令行编译proto文件
pbjs -t json-module -w commonjs -o `target` `source`
# eg 把src下的proto文件夹下的所有proto文件编译为 src/proto/proto.js文件
pbjs -t json-module -w commonjs -o src/proto/proto.js src/proto/*.proto
# 可以将指令加入到package.json中方便使用
"proto": "pbjs -t json-module -w commonjs -o  src/proto/proto.js src/proto/*.proto"
```
代码中使用
```javascript
import protoRoot from './proto/proto'
// api_aiui.Base   packageName.messageName
protoRoot.lookup('api_aiui.Base')
// 具体使用具体3
```

3. 序列化和反序列化<br>
- 发送（序列化）<br>
> 发送时一般前端数据都是json类型的，需要把 对象、json类型的数据通过之前编译的proto转化为二进制数据
```javascript
export const messageObjectToBuffer = function requestMessage(message) {
  // 获取编译对象
  const MessageRequest = protoRoot.lookup('api_aiui.Base')
  const requestBody = message
  console.log('需要转化的message', message)
// 使用序列化对象建议对象是否满足条件
  const requestVerify = MessageRequest.verify(requestBody)
  if (requestVerify) throw Error(requestVerify)
  // 创建生成器？
  const requestCreater = MessageRequest.create(requestBody)
  // 转化为数据流
  const requestBuffer = MessageRequest.encode(requestCreater).finish()
  return requestBuffer
}
```

- 接收（反序列化）<br>
> 接收时需要确定接收的数据的类型需要将其转化为arrayBuffer的类型然后再进行反序列化编译
```javascript
export const messageBufferToObject = function responseMessage(message:arrayBuffer) {
  // 一般接收的数据类型和发送的不一样这里是演示
  const MessageResponse = protoRoot.lookup('api_aiui.Base')
  const responseBuffer = message
  // 转化为对象数据
  return MessageResponse.decode(responseBuffer)
}

// message为arrayBuffer类型， 从websocket中接收的数据类型为blob,需要使用到一个转化
// blob转化为ArrayBuffer
export const blobToArrayBuffer = function bufferData(blob) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      reader.onload = function load(result) {
        resolve(new Uint8Array(result.target.result))
      }
      reader.readAsArrayBuffer(blob)
    } catch (error) {
      reject(error)
    }
  })
}
// 使用
const arrayBuffer = await blobToArrayBuffer(data.data)
const res = messageBufferToObject(arrayBuffer)
console.log('res', res)

```
**使用方法不难 `但是注意当结构发生变化之后需要及时进行编译`， 有兴趣的可以看一下编译生成的proto文件**

## protoBuf数据协议的优势
- 平台无关，语言无关，可扩展；
- 提供了友好的动态库，使用简单；
- 解析速度快，比对应的XML快约20-100倍；
- 序列化数据非常简洁、紧凑，与XML相比，其序列化之后的数据量约为1/3到1/10

说明：
数据量小是因为，Protobuf 序列化后所生成的二进制消息非常紧凑，这得益于 Protobuf 采用的非常巧妙的little-endian编码方法。

转换速度快。首先我们来了解一下 XML 的封解包过程。XML 需要从文件中读取出字符串，再转换为 XML 文档对象结构模型。之后，再从 XML 文档对象结构模型中读取指定节点的字符串，最后再将这个字符串转换成指定类型的变量。这个过程非常复杂，其中将 XML 文件转换为文档对象结构模型的过程通常需要完成词法文法分析等大量消耗 CPU 的复杂计算。

反观 Protobuf，它只需要简单地将一个二进制序列，按照指定的格式读取到 C++ 对应的结构类型中就可以了。从上一节的描述可以看到消息的 decoding 过程也可以通过几个位移操作组成的表达式计算即可完成。速度非常快。

