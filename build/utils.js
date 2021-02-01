/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2021-01-26 13:49:11
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const WebpackConfig = require('./webpack.config')
const glob = require('glob')

// 获取多页面的 入口实例
function getEntries() {
  const map = {}
  const entryFiles = glob.sync(WebpackConfig.entry(), { matchBase: true })
  for (let i = 0; i < entryFiles.length; i++) {
    // 截取文件夹的名字
    const moduleName = entryFiles[i].substring(entryFiles[i].indexOf('views/') + 6, entryFiles[i].lastIndexOf('/'))
    map[moduleName] = entryFiles[i]
  }
  return map
}
// 获取多页面的  HtmlTemplate
function getHtmlTemplates() {
  const map = {}
  const entryFiles = glob.sync(WebpackConfig.htmlTemplate(), { matchBase: true })
  for (let i = 0; i < entryFiles.length; i++) {
    // 截取文件名字
    const moduleName = entryFiles[i].substring(entryFiles[i].indexOf('views/') + 6, entryFiles[i].lastIndexOf('/'))
    map[moduleName] = entryFiles[i]
  }
  return map
}

exports.getSpaPage = function() {
  return {
    entry: WebpackConfig.entry(),
    template: WebpackConfig.htmlTemplate(),
    filename: WebpackConfig.viewOutputRoot() + 'index.html',
    chunks: ['chunk-vendors', 'chunk-common', 'chunk-antdvue', 'index'] // 这里的 chunk-vendors 和 chunk-common是 cli 3.x 自动 提取的 需要个splitChunks相同
    // cdn: WebpackConfig.cdn || {}
  }
}

// 生成 vue.WebpackConfig.js 需要的多页面pages 配置
exports.getPages = function() {
  const map = {}
  const entries = getEntries()
  const htmlTemplates = getHtmlTemplates()
  Object.keys(entries).forEach(key => {
    map[key] = {
      entry: entries[key],
      template: htmlTemplates[key],
      filename: WebpackConfig.viewOutputRoot() + key + '.html',
      title: key,
      cdn: WebpackConfig.cdn || {},
      chunks: ['chunk-vendors', 'chunk-common', key] // 这里的 chunk-vendors 和 chunk-common是 cli 3.x 自动 提取的
    }
  })
  return map
}

exports.getWebpackConfig = function() {
  return {}
}
