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
        {
          title: 'JavaScript',
          collapsable: false,
          children: [
            'javascript/object-visit',
            'javascript/objec_copy',
            'javascript/eventhub',
            'javascript/promise',
            'javascript/closure'
          ]
        },
        { title: '音视频', collapsable: false, children: ['audioAndVideo/webAudioApi']},
        { title: 'HTML', collapsable: false, children: ['html/url'] },
        { title: 'CSS', collapsable: false, children: ['javascript/objec_copy', 'css/variable'] },
        {
          title: 'Vue',
          collapsable: false,
          children: [
            'vue/vue_react',
            'vue/vue3_study',
            { title: 'element-ui', collapsable: false },
            'vue/element/table_header_icon',
            { title: 'axios', collapsable: false },
            'vue/axios/file_download'
          ]
        },
        {
          title: '插件',
          collapsable: false,
          children: ['plugins/webpack-loader', 'plugins/quill', 'fileupload', 'call_apply_bind']
        },
        {
          title: '技术型',
          collapsable: false,
          children: ['technology/qcode-login', 'technology/web-security']
        },
        {
          title: '微信',
          collapsable: false,
          children: [
            'weixin/weapp-js-sdk',
            {
              title: '小程序',
              collapsable: false
            },
            'weixin/mini/research',
            'weixin/mini/charts',
            'weixin/mini/jsencrypt'
          ]
        }
      ]
      // '/interview/': [{ title: '面试', collapsable: false, children: ['/interview/', 'html', 'css', 'promise'] }]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@styles': path.resolve(__dirname, './styles'),
        '@assets': path.resolve(__dirname, './public')
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
