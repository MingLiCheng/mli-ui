---
title: 微信 JS-SDK
---

# 微信 JS-SDK调研

> 集成微信JS-SDK（测试开发阶段）需要准备一个 已经备案的域名 和 一个服务器 需要设置 JS安全域名和IP白名单<br>
> 注意：  签名需要使用 jssha  版本需要使用1.5.0  否则会报错
Chosen SHA variant is not supported

微信开发官方文档  https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html 

-  公众平台以**access_token**为接口调用凭据，来调用接口，所有接口的调用需要先获取access_token，access_token在**2小时内有效**，过期需要重新获取，**但1天内获取次数有限**，开发者需自行存储，详见获取接口调用凭据（access_token）文档。  
-  生成签名之前必须先了解一下**jsapi_ticket**，jsapi_ticket是公众号用于调用微信JS接口的临时票据。正常情况下，jsapi_ticket的有效期为**7200**秒，通过**access_token**来获取。由于获取jsapi_ticket的ap**i调用次数非常有限**，频繁刷新jsapi_ticket会导致api调用受限，影响自身业务，开发者必须在自己的服务全局缓存jsapi_ticket 。 
- 引用js  （支持https）：http://res.wx.qq.com/open/js/jweixin-1.4.0.js   当上述资源不可访问时，可改访问：http://res2.wx.qq.com/open/js/jweixin-1.4.0.js （支持https） 

 

- 引入js以后使用前需要进行初始化配置

```javascript
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});

wx.ready(function(){
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

wx.error(function(res){
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
```

> 后台生成config返回给前端 因为 access_token和jsapi_ticket都是必须的 切有获取次数限制 ，需要后台进行缓存



- 首先获取 access_token  https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html 

>  https请求方式: GET https:// api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET 



appid 和 secret （微信公众后--> 开发--> 基本配置 ）  https://mp.weixin.qq.com/advanced/advanced?action=dev&t=advanced/dev&token=2037403139&lang=zh_CN 