---
title:  axios 文件下载
---

# axios 文件下载
> 后台管理很多时候会遇到文件导出的操作， 总结一下文件下载的多种方式

- 服务端返回文件的base64字符串
- 服务端直接返回文件流
- 服务端返回文件的一个可下载地址

### 1. 服务端返回文件的base64字符串
> 服务端生成文件之后将文件转化为Base64的字符串传递给前端，前端接收后转化为需要的格式的文件

```javascript
        downloadFile(urlData) {
          // ...
          const { data } = await api(params)
          // 添加为xlsx格式
          const fileBase64String = `data:application/vnd.ms-excel;base64,${data.dataUrl}`;
              if ('msSaveOrOpenBlob' in navigator) {
                  // IE Edge
                  const blob = dataURLtoBlob(fileBase64String);
                  window.navigator.msSaveOrOpenBlob(blob, data.fileName);
              } else {
                  // 非IE
                  const blob = dataURLtoBlob(fileBase64String);
                  const aEle = document.createElement('a');
                  aEle.setAttribute('download', data.fileName);
                  aEle.setAttribute('href', URL.createObjectURL(blob));
                  aEle.click();
                  this.$message.success('导出成功，请稍候。。。');
              }
        },
```
### 2. 服务端直接返回文件流
> 服务端直接返回文件流的类型 观察请求返回的格式类型  设置axios接收的返回值的类型为blob： `responseType: 'blob'`


- get 方法 直接拼接参数open请求
```javascript
  window.open()
```
- post 方法 传参后下载
```javascript
        downloadFile(urlData) {
          // ...
          const { data } = await api(params, {responseType: 'blob'})
          // 添加为xlsx格式
          const blob = new Blob([res], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          console.log('blob', blob, URL.createObjectURL(blob));
          const aEle = document.createElement('a');
          aEle.setAttribute('href', URL.createObjectURL(blob));
          aEle.setAttribute('download', 'xxx.xlsx');
          aEle.click();
          this.$message.success('导出成功，请稍候。。。');
        },
```
### 3. 服务端返回文件的一个可下载地址
