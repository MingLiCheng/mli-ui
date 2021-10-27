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
  /**
  * @description: base64 -> blob
  * @param {type}base64String: base64字符串
  * @return:
  */
  export function dataURLtoBlob(base64String) {
      var arr = base64String.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
  }
```
### 2. 服务端直接返回文件流
> 服务端直接返回文件流的类型 观察请求返回的格式类型  设置axios接收的返回值的类型为blob： `responseType: 'blob'`


- get 方法 直接拼接参数open打开新页下载
```javascript
  window.open()
```
- post 方法 传参后下载
  Response Headers
    Content-Type: application/octet-stream;charset=utf-8
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
> 现在很多公司都有静态云存储服务， 我们项目选择直接服务端生成文件传送到云存储上，然后返回该静态资源的连接
> 可以保存该文件， 但是文件名字前端无法操作

```javascript
  const aEle = document.createElement('a')
  aEle.setAttribute('download', 'xxx')
  aEle.setAttribute('href', res.message)
  aEle.click()
```

### 4. 常用 mime type 
```javascript
{".3gp",    "video/3gpp"},   
{".apk",    "application/vnd.android.package-archive"},   
{".asf",    "video/x-ms-asf"},   
{".avi",    "video/x-msvideo"},   
{".bin",    "application/octet-stream"},   
{".bmp",    "image/bmp"},   
{".c",  "text/plain"},   
{".class",  "application/octet-stream"},   
{".conf",   "text/plain"},   
{".cpp",    "text/plain"},   
{".doc",    "application/msword"},   
{".docx",   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},   
{".xls",    "application/vnd.ms-excel"},    
{".xlsx",   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},   
{".exe",    "application/octet-stream"},   
{".gif",    "image/gif"},   
{".gtar",   "application/x-gtar"},   
{".gz", "application/x-gzip"},   
{".h",  "text/plain"},   
{".htm",    "text/html"},   
{".html",   "text/html"},   
{".jar",    "application/java-archive"},   
{".java",   "text/plain"},   
{".jpeg",   "image/jpeg"},   
{".jpg",    "image/jpeg"},   
{".js", "application/x-javascript"},   
{".log",    "text/plain"},   
{".m3u",    "audio/x-mpegurl"},   
{".m4a",    "audio/mp4a-latm"},   
{".m4b",    "audio/mp4a-latm"},   
{".m4p",    "audio/mp4a-latm"},   
{".m4u",    "video/vnd.mpegurl"},   
{".m4v",    "video/x-m4v"},    
{".mov",    "video/quicktime"},   
{".mp2",    "audio/x-mpeg"},   
{".mp3",    "audio/x-mpeg"},   
{".mp4",    "video/mp4"},   
{".mpc",    "application/vnd.mpohun.certificate"},          
{".mpe",    "video/mpeg"},     
{".mpeg",   "video/mpeg"},     
{".mpg",    "video/mpeg"},     
{".mpg4",   "video/mp4"},      
{".mpga",   "audio/mpeg"},   
{".msg",    "application/vnd.ms-outlook"},   
{".ogg",    "audio/ogg"},   
{".pdf",    "application/pdf"},   
{".png",    "image/png"},   
{".pps",    "application/vnd.ms-powerpoint"},   
{".ppt",    "application/vnd.ms-powerpoint"},   
{".pptx",   "application/vnd.openxmlformats-officedocument.presentationml.presentation"},   
{".prop",   "text/plain"},   
{".rc", "text/plain"},   
{".rmvb",   "audio/x-pn-realaudio"},   
{".rtf",    "application/rtf"},   
{".sh", "text/plain"},   
{".tar",    "application/x-tar"},      
{".tgz",    "application/x-compressed"},    
{".txt",    "text/plain"},   
 {".wav",    "audio/x-wav"},   
{".wma",    "audio/x-ms-wma"},   
{".wmv",    "audio/x-ms-wmv"},   
{".wps",    "application/vnd.ms-works"},   
{".xml",    "text/plain"},   
{".z",  "application/x-compress"},   
{".zip",    "application/x-zip-compressed"},   
{"",        "*/*"}     

```
