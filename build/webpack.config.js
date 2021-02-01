/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2021-01-26 13:49:02
 */
/* eslint-disable @typescript-eslint/no-var-requires*/
const path = require('path')
const env = process.env.NODE_ENV
console.log('env', env)

// 自定义配置
const config = {
  common: {
    // 是否为单页面模式
    spaMode: true,

    // 部署的输出函数为{'JAVA, 'NODE'}
    buildEnv: 'NODE',

    // 入口文件
    entry: function() {
      return this.spaMode ? 'src/main.ts' : 'src/views/**/*.ts'
    },

    // html 模板文件
    htmlTemplate: function() {
      return this.spaMode ? './public/index.html' : './src/views/**/*.html'
    },
    cdn: {
      css: [
        // 'https://cdn.jsdelivr.net/npm/vant@2.10.3/lib/index.css'
      ],
      js: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        // 'https://cdn.jsdelivr.net/npm/vant@2.10.3/lib/vant.js',
        'https://unpkg.com/vue-router@3.2.0/dist/vue-router.js',
        'https://unpkg.com/vuex@3.4.0',
        'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
      ]
    }
  },
  dev: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 静态资源文件夹
    assetsSubDirectory: 'assets',
    // 发布的 Paths
    assetsPublicPath: '/mliui/',
    // 试图输出总目录
    viewOutputRoot: function() {
      return this.spaMode ? '' : ''
    }
  },
  build: {
    // 存放根路径Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 二级目录，存放静态资源文件的目录，位于dist文件夹下
    assetsSubDirectory: 'assets',
    // 发布路径，设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
    assetsPublicPath: '/',
    // 试图输出总目录
    viewOutputRoot: function() {
      return this.buildEnv === 'JAVA' ? 'WEB-INF/views/' : this.spaMode ? '' : ''
    }
  }
}
module.exports = {
  ...config.common,
  ...config[env === 'development' ? 'dev' : 'build']
}
