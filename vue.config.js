/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2021-01-26 11:43:46
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const Utils = require('./build/utils')
const webpackConfig = require('./build/webpack.config')
module.exports = {
  publicPath: webpackConfig.assetsPublicPath,
  outputDir: webpackConfig.assetsRoot,
  assetsDir: webpackConfig.assetsSubDirectory,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false, // 生产环境关闭 sourceMap
  pages: webpackConfig.spaMode ? { index: Utils.getSpaPage() } : Utils.getPages(),
  devServer: {
    port: 6060
  },
  css: {
    loaderOptions: {
      less: {
        // 开启less antd 需要
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  chainWebpack(config) {
    //   // config.when(process.env.NODE_ENV !== 'development', config => {
    config.when(true, config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          },
          antdvue: {
            name: 'chunk-antdvue', // split antdvue into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
          }
        }
      })
    })
  }
}
