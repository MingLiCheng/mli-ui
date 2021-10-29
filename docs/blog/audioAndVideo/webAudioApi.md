---
title: Web Audio Api
---
# Web Audio Api 语音交互
> web实现通过语音指令打开相对应功能 (识别语音指令触发某个按钮的事件) <br>
> 调研可以使用科大讯飞的AIUI来进行语音、语义识别功能  <br>
> web端主要做的就是采集麦克风的音频流文件然后传送给接口，这里需要用的就是**Web Audio API**<br>

## AIUI介绍
> AIUI 是科大讯飞提供的一套人机智能交互解决方案， 旨在实现人机交互无障碍，使人与机器之间可以通过语音、图像、手势等自然交互方式，进行持续，双向，自然地沟通。<br>
> 现阶段 AIUI 提供以语音交互为核心的交互解决方案，全链路聚合了**语音唤醒、语音识别、语义理解、内容（信源）平台、语音合成**等模块。
- 官网：https://aiui.xfyun.cn/
- 主要使用的开发接口文档： https://aiui.xfyun.cn/doc/aiui/3_access_service/access_interact/websocket.html

## 业务整体流程
<img src="@assets/images/20210915155038.png" alt="" style="width: auto; height:300px">

## 调研关键点
- Web端如何打开麦克风采集音频信息
- Web如何把音频流传输给AIUI
- AIUI支持的音频流的格式是哪些，前端能否满足是否需要编码转换
- 语音的实体怎么定义（说的内容识别得到的对应的结果，指令）

#### Web端浏览器打开麦克风采集音频信息
Web端采集音频可以通过navigator.mediaDevices.getUserMedia方法获取并录制声音，获取到音频流后可以通过Web Audio Api将音频流转化为实时的音频数据

注：**浏览器的安全策略规定，navigator.mediaDevices.getUserMedia方法只能在HTTPS协议，需要保证生产和测试环境是HTTPS协议的**

#### 获取麦克风权限，录制声音
```javascript
let audioCtx = null; // 音频上下文
let source = null; // 音频源
let audioStream = null; // 录音产生的音频流
let analyserNode = null; // 用于分析音频实时数据的节点

function recordSound () {
  navigator.mediaDevices
    .getUserMedia({ 'audio': true, 'video': false })
    .then(initAudioData)
    .catch(e => {
      console.log('获取麦克风权限失败', e);
    });
}

// 停止录制
function stopRecord () {
  // 关闭麦克风
  const tracks = audioStream.getAudioTracks();
  for (let i = 0, len = tracks.length; i < len; i++) {
    tracks[i].stop();
  }
  // 断开音频节点
  analyserNode.disconnect();
  source.disconnect();
  analyserNode = null;
  source = null;
}
```

#### 利用Web Audio Api 处理音频流数据
获取到音频流之后，我们通过音频上下文AudioContext，创建音频源。这里选择MediaStreamAudioSourceNode，它接收一个MediaStream对象来创建音频源。
然后我们在音频源和destination中间插入一个音频节点，用来获取及处理音频数据，进而利用数据绘制出波形图。这里选择AnalyserNode，当然像ScriptProcessorNode和AudioWorkletNode节点也能够实现获取和处理实时音频数据，具体可以参考相关Api。
```javascript
// 音频数据处理
function initAudioData (stream) {
  audioStream = stream;
  // 创建音频上下文
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // 创建音频源
  source = audioCtx.createMediaStreamSource(audioStream);
  // 创建音频分析节点
  analyserNode = audioCtx.createAnalyser();
  // fftSize决定了能够获取到的音频数据的数量
  analyserNode.fftSize = 4096;
  // 音频源连接至analyserNode
  source.connect(analyserNode);
  // analyserNode再连接至扬声器播放
  analyserNode.connect(audioCtx.destination);
}
```

#### Web如何把音频流传输给AIUI
通过查阅AIUI官方文档，AIUI对Web端的支持包含Web Api 和WebSocket接口，结合业务实际场景，需要使用WebSocket接口把音频数据实时传送给服务。<br>
AIUI官网： https://aiui.xfyun.cn/
- websocket接口有两种交互方式，针对设备端是否具备vad(语音端点检测)功能
1. 设备端具备端点检测功能，交互时序图如下：
<div align=center>
  <img src="https://aiui-file.cn-bj.ufileos.com/vad.png"/>
</div>

2. 设备端不具备端点检测功能，需依赖云端端点检测功能，交互时序图如下：
<div align=center>
  <img src="https://aiui-file.cn-bj.ufileos.com/novad.png"/>
</div>

采用第二种方案使用通过WebSocket将音频数据流实时传送至aiui，由aiui进行vad的判断。

```javascript
    // 建立WebSocket连接，传输指定的参数 具体可以在文档中查询
    document.querySelector('#connect').addEventListener('click', function (e) {
      let params = {
        scene: 'main',
        auth_id: 'xxx',
        data_type: 'audio',
        vad_info: 'end',
        cloud_vad_eos: '1000'
      }
      let paramsString = window.btoa(JSON.stringify(params))
      let appid = 'xxxxxxxxxxxxxxxx'
      let apikey = 'xxxxxxxxxxxxxx'
      let curtime = Math.round(new Date().getTime() / 1000)
      let checksum = apikey + curtime + paramsString
      let checksumString = CryptoJS.MD5(checksum).toString()
      console.log('checksumString', checksumString);
      let url = `ws://wsapi.xfyun.cn/v1/aiui?appid=${appid}&checksum=${checksumString}&curtime=${curtime}&param=${paramsString}`
      console.log('url', url);
      socket = new WebSocket(window.encodeURI(url))
      // Connection opened
      socket.addEventListener('open', function (event) {
        console.log('websocket 连接成功');
        socket.send('Hello Server!');
      });
      socket.addEventListener('close', function (event) {
        console.log('websocket 已经关闭');
        closeAll()
      });

      // Listen for messages
      socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        let data = JSON.parse(event.data)
        console.log('data----------------', data);

        if(data.action === 'error') {
          closeAll()
        }else if(data.action === 'vad') {
          console.log('检测到返回vad信息', data.data);
          socket.send(endToken)
          closeAll()
        }else if(data.action === 'result') {
          console.log('收到语音结果', data.data);

        }
      });
    })


    document.querySelector('#start').addEventListener('click', function (e) {
      console.log('点击开始按钮', e);
      audioContext = new AudioContext();
      // createScriptProcessor is deprecated. Let me know if anyone find alternative
      processor = audioContext.createScriptProcessor(bufferSize, 1, 1);
      console.log('audioContext', audioContext.sampleRate);

      processor.connect(audioContext.destination);

      navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(handleMicStream).catch(err => {
        console.log('error from getUserMedia', err);
      });
    })

    function handleMicStream(streamObj) {
      // keep the context in a global variable
      stream = streamObj;

      input = audioContext.createMediaStreamSource(stream);

      input.connect(processor);

      processor.onaudioprocess = e => {
        microphoneProcess(e); // receives data from microphone
      };
    }


    function microphoneProcess(e) {
      console.log('e-----', e);

      const left = e.inputBuffer.getChannelData(0); // get only one audio channel
      const left16 = convertFloat32ToInt16(left); // skip if you don't need this
      console.log('left16', left16);

      // socket.emit('micBinaryStream', left16); // send to server via web socket
      // console.log('type', typeof (left16), 'buffuer', left16.buffer);
      // console.log('arrayBuffer', new ArrayBuffer(left));
      // 发送数据
      socket && socket.send(left16)

    }

```

#### AIUI支持的音频流的格式是哪些，前端能否满足是否需要编码转换

aiui 音频采样率仅支持16000和8000两种，Web端在收集音频数据时无法主动设置音频采集率只能固定48000 <br>
Web端需要手动进行音频数据的提取把48000的音频数据修改为符合条件的数据
```javascript
    // 把float32的48000的音频数据转化为16K的int数据(pcm)
    function convertFloat32ToInt16(buffer) {
      let l = buffer.length;
      const buf = new Int16Array(l / 3);

      while (l--) {
        if (l % 3 === 0) {
          buf[l / 3] = buffer[l] * 0xFFFF;
        }
      }
      return buf.buffer;
    }
```
