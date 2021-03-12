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
      // { text: '面试', link: '/interview/' },
      { text: 'GitHub', link: 'https://github.com/MingLiCheng' }
    ],
    sidebar: {
      '/component/': [
        {
          title: '组件',
          collapsable: false,
          children: ['/component/', 'button', 'icon', 'radio', 'checkbox', 'message']
        }
      ],
      '/guide/': [{ title: '指南', collapsable: false, children: ['/guide/', 'directory-structure'] }],
      '/blog/': [
        { title: 'JavaScript', collapsable: false },
        { title: 'HTML', collapsable: false },
        { title: 'CSS', collapsable: false },
        {
          title: '博客',
          collapsable: false,
          children: [
            '/blog/',
            'promise',
            'closure',
            'fileupload',
            'quill',
            'call_apply_bind',
            'eventhub',
            'weapp-js-sdk'
          ]
        },
        {
          title: '微信',
          collapsable: false,
          children: [
            {
              title: '小程序',
              collapsable: false
            },
            'weixin/mini/charts'
          ]
        }
      ]
      // '/interview/': [{ title: '面试', collapsable: false, children: ['/interview/', 'html', 'css', 'promise'] }]
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
