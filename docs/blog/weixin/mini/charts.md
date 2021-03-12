---
title: 小程序中使用echarts
---

# 小程序中使用echarts

- 官方引导 <br>
https://echarts.apache.org/zh/tutorial.html#%E5%9C%A8%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts

- ec-canvas 组件 <br>
https://github.com/ecomfe/echarts-for-weixin

- 使用组件 <br>
```html
<view class="container">
  <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
</view>
```

```javascript
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    ...
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});
```

- 注意<br>
https://github.com/ecomfe/echarts-for-weixin 这个示例很重要 <br>
Tooltip中得format函数 不支持返回HTML , js在微信小程序 会被序列化为字符串 ， 所以此功能无法支持， 使用echarts中的富文本代替
  - 暂不支持的功能 <br>
  - ECharts 中的绝大部分功能都支持小程序版本，因此这里仅说明不支持的功能，以及存在的问题。

- 以下功能尚不支持，如果有相关需求请在 issue 中向我们反馈，对于反馈人数多的需求将优先支持：
  - Tooltip<br>
  - 图片<br>
  - 多个 zlevel 分层<br>

- 此外，目前还有一些 bug 尚未修复，部分需要小程序团队配合上线支持，但不影响基本的使用。已知的 bug 包括：
  - 安卓平台：transform 的问题（会影响关系图边两端的标记位置、旭日图文字位置等）
  - iOS 平台：半透明略有变深的问题<br>
  - iOS 平台：渐变色出现在定义区域之外的地方<br>

## 示例

```html
<view class="home-page">
  <ec-canvas id="mychart-dom-bar" style="width:100%;height:300px;" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
</view>
```

```javascript
import * as echarts from '../../components/ec-canvas/echarts'
import '../../components/ec-canvas/china.js'
//获取应用实例
const app = getApp()

function randomData() {
  return Math.round(Math.random() * 500)
}

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  })
  canvas.setChart(chart)

  //这里复制了官方示例配置
  var option = {
    backgroundColor: '#FFFFFF',
    title: {
      text: '全国地图',
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      show: true,
      formatter: '{b}: {c}'
    },
    visualMap: {
      // min: min,
      //     max: max,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      show: false,
      inRange: {
        color: ['#DBEEF8', '#2662A1']
      }
      // splitList: [
      //   { start: 500, end: 600 },
      //   { start: 400, end: 500 },
      //   { start: 300, end: 400 },
      //   { start: 200, end: 300 },
      //   { start: 100, end: 200 },
      //   { start: 0, end: 100 }
      // ],
      // inRange: {
      //   color: ['#DBEEF8', '#2662A1']
      // }
      // color: ['#66CC33', '#00FF00', '#66FF33', '#339900', '#33CC00', '#00CC00']
    },
    series: [
      {
        name: '随机数据',
        type: 'map',
        mapType: 'china',
        roam: false, // 是否可以拖动
        itemStyle: {
          // color: '#333',
          // borderColor: '#333',
          normal: {
            borderWidth: 0.5, //边框大小
            borderColor: '#333',
            areaColor: '#e3ebf4'
          },
          emphasis: {
            borderWidth: 0.5, //边框大小
            borderColor: '#333',
            areaColor: '#4ECB73',
            label: {
              show: true
            }
          }
        },
        data: [
          { name: '北京', value: randomData() },
          { name: '天津', value: randomData() },
          { name: '上海', value: randomData() },
          { name: '重庆', value: randomData() },
          { name: '河北', value: randomData() },
          { name: '河南', value: randomData() },
          { name: '云南', value: randomData() },
          { name: '辽宁', value: randomData() },
          { name: '黑龙江', value: randomData() },
          { name: '湖南', value: randomData() },
          { name: '安徽', value: randomData() },
          { name: '山东', value: randomData() },
          { name: '新疆', value: randomData() },
          { name: '江苏', value: randomData() },
          { name: '浙江', value: randomData() },
          { name: '江西', value: randomData() },
          { name: '湖北', value: randomData() },
          { name: '广西', value: randomData() },
          { name: '甘肃', value: randomData() },
          { name: '山西', value: randomData() },
          { name: '内蒙古', value: randomData() },
          { name: '陕西', value: randomData() },
          { name: '吉林', value: randomData() },
          { name: '福建', value: randomData() },
          { name: '贵州', value: randomData() },
          { name: '广东', value: randomData() },
          { name: '青海', value: randomData() },
          { name: '西藏', value: randomData() },
          { name: '四川', value: randomData() },
          { name: '宁夏', value: randomData() },
          { name: '海南', value: randomData() },
          { name: '台湾', value: randomData() },
          { name: '香港', value: randomData() },
          { name: '澳门', value: randomData() },
          { name: '南海诸岛', value: randomData() }
        ]
      }
    ]
  }
  chart.setOption(option)
  return chart
}

Page({
  data: {
    ec: {
      onInit: initChart
    },
  }
})
```
- china.js 中国地图文件 [http://note.youdao.com/noteshare?id=19993167e2aea9c67e8a0230e306c6cb&sub=135CE4D60E384DAF89E3340AE7DC7B5E](http://note.youdao.com/noteshare?id=19993167e2aea9c67e8a0230e306c6cb&sub=135CE4D60E384DAF89E3340AE7DC7B5E)
