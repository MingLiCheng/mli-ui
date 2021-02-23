const path = require('path')

module.exports = {
  locales: { '/': { lang: 'zh-CN' } },
  title: 'MliUI',
  description: 'MliUI,Hello MliUI,Vue,UI',
  head: [['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `./favicon.ico` }]],
  themeConfig: {
    logo: '/images/logo.png',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/component/' },
      { text: '博客', link: '/blog/' },
      { text: 'GitHub', link: 'https://github.com/MingLiCheng' }
    ],
    sidebar: {
      '/component/': [{ title: '组件', collapsable: false, children: ['/component/', 'button'] }],
      '/guide/': [{ title: '指南', collapsable: false, children: ['/guide/', 'directory-structure'] }],
      '/blog/': [{ title: '博客', collapsable: false, children: ['/blog/', 'fileupload', 'quill'] }]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@styles': path.resolve(__dirname, './styles')
      }
    }
  },
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // ts-loader 的所有配置项
          // reportFiles: ['docs/**/*'],
          transpileOnly: true,
          appendTsSuffixTo: ['\\.vue$'],
          happyPackMode: false
        }
      }
    ],
    ['demo-container']
  ]
}