---
title: '文件上传'
---

- 文件读取
- 文件类型判断， 后缀， 类型， 二进制头信息
- 文件分片
- 分片上传，断点续传，
- md5计算



## 图片类型判断
```javascript

  async isJpgImage(file: File) {
    const startbBStr = await this.blobToString(file.slice(0, 2))
    const endbBStr = await this.blobToString(file.slice(-2, file.size))
    const isJpg = startbBStr === 'FF D8' && endbBStr === 'FF D9'
    return isJpg
  }

  async isPngImage(file: File) {
    const bStr = await this.blobToString(file.slice(0, 8))
    const isPng = bStr === '89 50 4E 47 0D 0A 1A 0A'
    return isPng
  }

  async isGifImage(file: File) {
    const bStr = await this.blobToString(file.slice(0, 6))
    const isGif = bStr === '47 49 46 38 39 61' || bStr === '47 49 46 38 37 61'
    return isGif
  }

  async blobToString(blob: Blob): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = () => {
        const ret = (reader.result as string)
          .split('')
          .map(v => v.charCodeAt(0))
          .map(v => v.toString(16).toUpperCase())
          .map(v => v.padStart(2, '0'))
          .join(' ')
        resolve(ret)
      }
      reader.readAsBinaryString(blob)
    })
  }

```

## MD5 计算

- 分片异步计算
```javascript
  /**
   * 获取文件md5值
   * @param {*} file
   * @param {*} callback(md5)
   */
  getMd5(file, callback) {
    const fileSize = file.size; // 文件大小
    this.filesize = fileSize;
    const chunkSize = 1024 * 1024 * 10; // 切片的大小
    const chunks = Math.ceil(fileSize / chunkSize); // 获取切片个数
    const fileReader = new FileReader();
    const spark = new SparkMD5.ArrayBuffer();
    const bolbSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice;
    let currentChunk = 0;

    fileReader.onload = e => {
      const res = e.target.result;
      spark.append(res);
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        const md5 = spark.end();
        // this.getMd5Checked(md5);
        callback(md5);
      }
    };
    const loadNext = () => {
      const start = currentChunk * chunkSize;
      const end = start + chunkSize > file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(bolbSlice.call(file, start, end));
    };
    loadNext();
  },
```