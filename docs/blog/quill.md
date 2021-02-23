---
title: quill 集成
---
# quill 集成以及自定义修改

> 后台管理类项目中需要一个帮助文档的管理模块，对移动端的帮助文档进行维护
>
> 产品需要一个富文本编辑器，选中了quill-editor 

涉及内容

- 安装集成quill： 安装集成，自定义toolbar
- 图片自定义上传：图片需要单独上传至 云服务器，转化为base64和内容一起上传的方式不行
- 增加自定义按钮：测试小姐姐需要直接从word复制粘贴就能显示的效果，前端不会写，所以甩给后端。。。上传word文件后台解析，将html甩给前端。
- 增加多种字体和大小：默认的只有三种字体和三种大小，可选择行过少，所以需要增加
- 增加拖拽图片上传：自定义图片上传不好用，不方面，产品要求增加
- 增加粘贴图片上传：自定义图片上传不好用，不方面，产品要求增加
- 增加图片大小调整：这个个人感觉是移动端显示，图片大小不需要可调整，但是。。。。



> 项目是基于webpack打包的工程化项目，框架使用公司自己的MVVM框架，语法和vue类似但是没有实现虚拟DOM,开发那是一个难用，各种限制。。。 

## quill

安装

```javascript
npm install quill
```

使用

```javascript
// 导入
import Quill from 'quill'
// 初始化
 var quill = new Quill('#editor', {
    modules: {
        toolbar: {
            container: '#toolbar'   // 这里选择的是使用 html的方式 初始化的工具栏
        }
    },
    placeholder: '请输入文本内容...',
    theme: 'snow'
});
```

> 使用 html的格式初始化的 工具栏 ， 因为 感觉 html 看着清楚

```html
<!-- toolbar 的html代码 ->
<div id="toolbar">
    <span class="ql-formats">
        <select class="ql-font"></select>
        <select class="ql-size"></select>
    </span>
    <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
    </span>
    <span class="ql-formats">
        <select class="ql-color"></select>
        <select class="ql-background"></select>
    </span>
    <span class="ql-formats">
        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
    </span>
    <span class="ql-formats">
        <button class="ql-header" value="1"></button>
        <button class="ql-header" value="2"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
    </span>
    <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
    </span>
    <span class="ql-formats">
        <button class="ql-direction" value="rtl"></button>
        <select class="ql-align"></select>
    </span>
    <span class="ql-formats">
        <button class="ql-link"></button>
        <button class="ql-image"></button>
    </span>
    <span class="ql-formats">
        <button class="ql-formula"></button>
        <button class="ql-clean"></button>
    </span>
</div>
```

## 图片自定义上传

> 图片需要单独上传至 图片资源服务器中，图片资源服务器会返回一个图片的资源链接
>
> 在初始化的modules下的toolbar中增加handlers 自定义处理工具栏的事件 
>
> 事件名 就是  按钮的 class名的后缀  例如 image 

```javascript
toolbar: {
    container: '#toolbar',
    handlers: {
        // image upload and insert quill
        'image': (value) => {
            if (value) {
                const inputEle = document.createElement('input');
                inputEle.type = 'file';
                inputEle.accept = "image/*";
                inputEle.click();
                inputEle.onchange = (e) => that.onInputChange(e.path[0].files);
            }
        
        }
    }
},

//  图片上传事件
onInputChange(file,index) {
    if (file[0].type.indexOf('image/') == -1) {
        alert({
            content: '请选择图片文件',
            type: 'warning'
        })
        return false;
    } else if (!(file[0].type === 'image/jpeg' || file[0].type === 'image/png')) {
        alert({
            content: '请选择jpg/png格式的图片',
            type: 'warning'
        })
        return false;
    } else if (file[0].size > 5120 * 1024) {
        // this.$message.error('所选文件需小于5m');
       alert({
            content: '所选文件需小于5m',
            type: 'warning'
        })
        return false;
    }
    const quill = vm.quill;
    // 不知道后面出现 了 获取不到 的情况，所以传递进来这个坐标
    var range = quill.getSelection() || {index: index}
    
    var form = new FormData()
    form.append('file', file[0]);
    $request({
        url: reqUrl + 'fileManagement/upload',//请求地址
        data: form,     //请求参数
        type: 'POST',   //请求类型
        dataType: 'json',//服务器返回的数据类型
        contentType: false,//没有设置任何内容类型头信息
        processData: false, //见jQuery_api详解
        beforeSend: function (XHR) {
            // 添加loading
            vm.set('isImageLoading', true)
        },
        success: function (res) { //成功时回调函数,obj表示服务器返回的数据
            vm.set('isImageLoading', false)
            if (res.operResult === 'SUCCESS') {
                quill.insertEmbed(range.index, 'image', res.message[0].newFileName);
                quill.setSelection(range.index + 1);
            }
        },
        error: function (err) {
            // 结束loading
            vm.set('isImageLoading', false)
            alert({
                content:`文件上传失败，网络错误`,
                type:'danger'
            })
            console.log('err',err)
        }
    });
},
```

## toolbar中增加自定义按钮

> 测试小姐姐需要直接从word复制粘贴就能显示的效果，前端不会写，所以甩给后端。。。上传word文件后台解析，将html甩给前端。

- 在HTML 中 增加 toolbar 的按钮  (在图片上传按钮后面增加了一个 word样式的图标)

```html
<span class="ql-formats">
    <button class="ql-link"></button>
    <button class="ql-image"></button>
    <button class="ql-word">
        <svg t="1565080255752" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="2066" width="16" height="16">
            <path
                d="M64 439.3h520v520H64v-520z m50 470h420v-420H114v420z m843-538.1V940H624.1v-50H907V391.9l-20.7-20.7H649.8V134.7L629.1 114H297v287.6h-50V64h402.8L957 371.2z m-120.7-50L699.8 184.7v136.5h136.5zM377.8 842.9h-53.6l-5.8-188.4-93.9 188.4h-54.7l-9.7-257.7H212l2.3 180.4 88.4-180.4h57.5l6 178.4 84.9-178.4h51.3L377.8 842.9z"
                fill="" p-id="2067"></path>
        </svg>
    </button>
</span>
```

-  在 modules下的toolbar中的 handlers  对象中 增加 word处理事件

```javascript
handlers: {
// image upload and insert quill
'image': (value) => {
    if (value) {
        const inputEle = document.createElement('input');
        inputEle.type = 'file';
        inputEle.accept = "image/*";
        inputEle.click();
        inputEle.onchange = (e) => that.onInputChange(e.path[0].files);
    }
},
'word':(value) => {
    if(value){
        const inputEle = document.createElement('input');
        inputEle.type = 'file';
        // inputEle.accept = "application/*";
        inputEle.click();
        inputEle.onchange = (e) => that.onInputChangeWord(e.path[0].files);
    }
}
```

- word文件上传事件 和 图片上传事件一致，success后直接把 替换 编辑器中的所有内容

```javascript
$('.ql-editor').empty().append(res.message)
```

## 增加多种字体和大小

> js 中注册 自定义 字体

```javascript
require('./font.css')
let Font = Quill.import('formats/font');
let FontSizeStyle = Quill.import('attributors/style/size');
FontSizeStyle.whitelist = ['10px', '12px', '14px', '16px', '20px', '24px', '36px', false];
var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', false]
Font.whitelist = fonts; //将字体加入到白名单
Quill.register(Font, true)
Quill.register(FontSizeStyle, true)
```

> 增加 html toolbar


```html
<span class="ql-formats">
    <select class="ql-font" style="width: 138px;">
        <option selected></option>
        <option value="SimSun">宋体</option>
        <option value="SimHei">黑体</option>
        <option value="Microsoft-YaHei">微软雅黑</option>
        <option value="KaiTi">楷体</option>
        <option value="FangSong">仿宋</option>
        <option value="Arial">Arial</option>
        <option value="Times-New-Roman">Times-New-Roman</option>
    </select>
    <select class="ql-size" style="width: 80px;">
        <option selected></option>
        <option value="10px">10px</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
        <option value="36px">36px</option>
    </select>
</span>
```

> font.css 文件

```css
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
    content: "宋体";
    font-family: "SimSun";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
    content: "黑体";
    font-family: "SimHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
    content: "微软雅黑";
    font-family: "Microsoft YaHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
    content: "楷体";
    font-family: "KaiTi";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
    content: "仿宋";
    font-family: "FangSong";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
    content: "Arial";
    font-family: "Arial";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before {
    content: "Times New Roman";
    font-family: "Times New Roman";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=sans-serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=sans-serif]::before {
    content: "sans-serif";
    font-family: "sans-serif";
}

.ql-font-SimSun {
    font-family: "SimSun";
}

.ql-font-SimHei {
    font-family: "SimHei";
}

.ql-font-Microsoft-YaHei {
    font-family: "Microsoft YaHei";
}

.ql-font-KaiTi {
    font-family: "KaiTi";
}

.ql-font-FangSong {
    font-family: "FangSong";
}

.ql-font-Arial {
    font-family: "Arial";
}

.ql-font-Times-New-Roman {
    font-family: "Times New Roman";
}

.ql-font-sans-serif {
    font-family: "sans-serif";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='10px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='10px']::before {
    content: '10px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='12px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='12px']::before {
    content: '12px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='14px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='14px']::before {
    content: '14px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='16px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='16px']::before {
    content: '16px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='20px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
    content: '20px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='24px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='24px']::before {
    content: '24px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='36px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='36px']::before {
    content: '36px';
}
```



## 增加拖拽图片上传

```javascript
quill.root.addEventListener('drop', function (e) {
    console.log('e',e)  // 这里打印出来看不到这个文件 下面直接 取 就可以拿到这个文件
    let index = quill.selection.savedRange.index
    if (!(e.dataTransfer && e.dataTransfer.items)) {
        return;
    }
    for (var i = 0, len = e.dataTransfer.items.length; i < len; i++) {
        var item = e.dataTransfer.items[i];

        if (item.kind === "string") {
            item.getAsString(function (str) {
                console.log(str);
            })
        } else if (item.kind === "file") {
            let f = []
            f[0] = item.getAsFile();
            console.log(f);
            vm.onInputChange(f, index)
        }
    }
    e.preventDefault()
},false)

quill.root.addEventListener('dropover', function (e) {
    e.preventDefault()
}, false)
```



## 增加粘贴图片上传

```javascript
quill.root.addEventListener('paste', function (e) {
    console.log('e',e)  //  
    let index = quill.selection.savedRange.index
    if (!(e.clipboardData && e.clipboardData.items)) {
        return;
    }
    for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
        var item = e.clipboardData.items[i];

        if (item.kind === "string") {
            item.getAsString(function (str) {
                console.log(str);
            })
        } else if (item.kind === "file") {
            let f = []
            f[0] = item.getAsFile();
            console.log(f);
            vm.onInputChange(f,index)
        }
    }
},false);
```



## 增加图片大小调整

- 下载并引入 quill-image-resize-module

```javascript
npm install quill-image-resize-module
```

```javascript
import Quill from 'quill'
import  ImageResize  from 'quill-image-resize-module'
Quill.register('modules/ImageResize', ImageResize)
```

- webpack 需要配置

```javascript
    plugins: [
        new webpack.ProvidePlugin({
            'window.Quill': 'quill/dist/quill.js',
            'Quill': 'quill/dist/quill.js'
        }),
    ]
```

- quill  初始化

```javascript
var quill = new Quill('#editor', {
    modules: {
        toolbar: {...},
        ImageResize: {
            // See optional "config" below
        }
    },
    placeholder: '请输入文本内容...',
    theme: 'snow'
    });
```
