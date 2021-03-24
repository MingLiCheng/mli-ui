---
title: 'Webpack Loader 整理'
---

# Webpack Loader 整理
- 此篇整理介绍常用的 webpack loader 
- 首先要了解webpack的打包原理
  - 识别入口文件
  - 通过逐层识别模块依赖（Commonjs, amd或者es6的import, webpack都会对其进行分析，来获取代码依赖）
  - webpack做的是分析代码 --> 转换代码 --> 编译代码 --> 输出代码
  - 最终形成打包后的代码
- 其次要知道什么是loader， 以及loader 和 plugin 有什么区别
  -  loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。
  -  loader的执行顺序是和配置顺序相反的，最后一个loader最先执行，后执行的loader接受前一个loader处理后的源码
  -  plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务
  -  loader 针对项目代码文件或资源文件， plugin针对的是工程层面， 整个项目层面往往和源码无关，用来扩展工程，优化工程

### vue-loader
> 用于编译.vue 文件 vue 基础

```javascript
module.exports = {
 module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    }
}
```

### url-loader
> url-loader也是处理图片类型资源，只不过它与file-loader有一点不同，url-loader可以设置一个根据图片大小进行不同的操作，如果该图片大小大于指定的大小，则将图片进行打包资源，否则将图片转换为base64字符串合并到js文件里 <br>
> url-loader内部封装了file-loader。<br>
> url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader。<br>
> 通过上面的介绍，我们可以看到,<br>
> url-loader工作分两种情况：<br>
> 1.文件大小小于limit参数，url-loader将会把文件转为DataURL；<br>
> 2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。<br>
> 因此我们只需要安装url-loader即可<br>

```javascript
// npm install --save-dev url-loader
module.exports = {
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
      use: [{
        loader: "url-loader",
        options: {
          name: "[name]_[hash:8].[ext]",
          limit: 10240, // 这里单位为(b) 10240 => 10kb
          // 这里如果小于10kb则转换为base64打包进js文件，如果大于10kb则打包到dist目录
          fallback: {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]'
            }
          }
        }
      }]
    }]
  }
}
```

### less-loader
> 

```shell
npm install less less-loader --save-dev
```

```javascript
module.exports = {
  module: {
    rules: [{
      test: /\.less$/i,
      use: [{
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: false,
            importLoaders: 2,
            modules: {
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: false,
            plugins: [
              function () {
                /* omitted long function */ }
            ]
          }
        },
        {
          loader: "less-loader",
          options: {
            sourceMap: false,
            lessOptions: {
              javascriptEnabled: true
            }
          },
        },
      ],
    }],
  },
}
```

### ts-loader
> 

```shell
yarn add ts-loader typescript --dev
```

```javascript
module.exports = {
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
}
```


