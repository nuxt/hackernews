module.exports = {
  build: {
    extractCSS: true,
    extend(config, { isClient }) {
      config.resolve.alias['create-api'] = `./create-api-${isClient ? 'client' : 'server'}.js`
    }
  },
  head: {
    titleTemplate: 'Nuxt HN | %s',
    meta: [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Nuxt.js HackerNews' },
      { property: 'og:description', content: 'HackerNews clone built with Nuxt.js' },
      {
        property: 'og:image',
        content: 'https://cloud.githubusercontent.com/assets/904724/26784102/0d2f8000-49fc-11e7-8091-2b66901c73ee.png'
      },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@nuxt_js' },
    ]
  },
  loading: {
    color: '#66e8ad'
  },
  manifest: {
    name: 'Nuxt Hacker News',
    description: 'HackerNews clone built with Nuxt.js',
    theme_color: '#41b883',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon'
      },
      {
        src: '/logo_192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/logo_512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache'
  ],
  plugins: [
    '~plugins/vuex-router-sync.js',
    '~plugins/filters.js'
  ],
  render: {
    static: {
      maxAge: '1y',
      setHeaders: function (res, path) {
        if (path.includes('sw.js') || path.includes('workbox-sw.')) {
          res.setHeader('Cache-Control', 'public, max-age=0')
        }
      }
    }
  }
}
