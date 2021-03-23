---
title: '小程序调研'
---

# 小程序调研

## 微信官方文档
- 小程序 [https://developers.weixin.qq.com/miniprogram/dev/framework/](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- 开发工具 [https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 公众平台，小程序相关参数配置 [https://mp.weixin.qq.com/](https://mp.weixin.qq.com/)


## 注意事项
- 小程序主体  
  - 小程序主体 主要分为 `个人/非个人` 注册时需要确定主体类型 ， 主体类型确认后**不可变更**
  - 不同的主体 可调用的接口的权限不同， 个人主体 部分接口信息无法调用
  - 详细信息： [**主体类型**](https://developers.weixin.qq.com/miniprogram/introduction/#%E5%A1%AB%E5%86%99%E4%B8%BB%E4%BD%93%E4%BF%A1%E6%81%AF)
- 开发注意
  - 小程序只能和指定的域名进行通讯且必须使用HTTPS/WSS发起网络请求 域名可在[小程序后台](https://mp.weixin.qq.com/)配置


## 框架

- 原生
> 微信小程序官方提供的框架语法 <br>


<!-- ![An image](@assets/images/weixin-01.png) -->
<img src="@assets/images/weixin-01.png" alt="" style="width: 640px; height:300px">

- uni-app
> uni-app 是一个使用` Vue.js`开发跨端应用的框架，团队人员使用vue的开发效率更高。<br>
> 同时uni-app可以避免针对h5 和 微信小程序做多次开发的问题 <br>
> uni-app 社区相对也比较成熟 <br>
> 官网 [https://uniapp.dcloud.io/](https://uniapp.dcloud.io/)
- 语法<br>
> 基本和Vue相同具体参考官网文档

## 面向业务的调研
> 根据相关业务功能 进行调研Demo开发，并输出相关过程
> 
### 页面UI建设

### 业务交互逻辑

### 网络请求

### 消息订阅
> 业务中可能会涉及到向用户推送相关消息 (告警信息) <br>
> 结论： 可以向指定的用户推送消息， 需要配置消息模板并且需要 用户主动授权订阅， **个人主体只能进行一次性订阅** <br>
> 官方文档 [**消息订阅**](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html)

- 订阅消息包括两种：
  - 一次性订阅消息 <br>
  一次性订阅消息用于解决用户使用小程序后，后续服务环节的通知问题。用户自主订阅后，开发者可不限时间地下发一条对应的服务消息；每条消息可单独订阅或退订。

  - 长期订阅消息 <br>
  一次性订阅消息可满足小程序的大部分服务场景需求，但线下公共服务领域存在一次性订阅无法满足的场景，如航班延误，需根据航班实时动态来多次发送消息提醒。为便于服务，我们提供了长期性订阅消息，用户订阅一次后，开发者可长期下发多条消息。

**目前长期性订阅消息仅向`政务民生、医疗、交通、金融、教育等线下公共服务`开放，后期将逐步支持到其他线下公共服务业务。**

- 示例
```html
<view>
	<vant-button bind:tap="messageSubscribeHandler">订阅消息</vant-button>
</view>

<script>
// 消息订阅 -- 小程序
  messageSubscribeHandler() {
    console.log('messageSubscribeHandler')
    wx.requestSubscribeMessage({
      tmplIds: ['ZqedtGyfAC2YzF1PKGl1m-7F9f3n4kzdnvDGYDOrlxY'],
      success(res) {
        console.log('res', res);
        if (res['ZqedtGyfAC2YzF1PKGl1m-7F9f3n4kzdnvDGYDOrlxY'] === 'accept') {
          // 订阅成功  通知服务端订阅成功， 处理相关事情
        }
      }
    })
  }
// 服务端处理完后 消息推送 文档： https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html
// post  https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=
</script>
```
**服务端进行post接口调用时 参数使用 `application/json` 格式**

<!-- 需要写一个图片组件 -->
<img src="@assets/images/weixin-03.png" alt="" style="border:1px solid #ccc; padding:6px">

- 参数格式

```json
{
  "touser": "okzye4qU_XXX", // 用户的openid
  "template_id": "ZqedtGyfAC2YzF1PKGl1m-7F9f3n4kzdnvDGYDOrlxY", // 消息模板
  "page": "pages/me/me",
  "miniprogram_state":"developer",
  "lang":"zh_CN",
  "data": { // 模板参数
      "thing1": {
          "value": "告警内容"
      },
      "time2": {
          "value": "2015年01月05日"
      },
      "thing3": {
          "value": "备注"
      } ,
      "thing4": {
          "value": "地址"
      },
      "thing5": {
          "value": "企业名称"
      }
  }
}
```

- 效果 <br>

<img src="@assets/images/weixin-02.jpg" alt="" style="width: 375px; height:667px">

### 转发
