export default {
  head: {
    titleTemplate: 'Nuxt HN | %s',
    meta: [
      { property: 'og:image', content: 'https://user-images.githubusercontent.com/904724/58238637-f189ca00-7d47-11e9-8213-ae072d7cd3aa.png' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@nuxt_js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  buildModules: [
    '@nuxt/nitro/compat',
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],

  plugins: [
    '~/plugins/swr',
    '~/plugins/filters'
  ],

  serverMiddleware: [
    {
      handler: 'server/api/hn/index.ts',
      path: '/api/hn'
    },
    'server/api/swr.ts',
    'server/redirect.js'
  ],

  loading: {
    color: '#00C48D'
  },

  axios: {
    baseURL: 'http://localhost:3000/api/hn',
    browserBaseURL: '/api/hn'
  },

  manifest: {
    name: 'Nuxt Hacker News',
    short_name: 'Nuxt HN',
    description: 'HackerNews clone built with Nuxt.js',
    theme_color: '#2F495E',
    start_url: '/news'
  }
}
