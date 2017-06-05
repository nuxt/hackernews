module.exports = {
  build: {
    extractCSS: true,
    extend(config, {isClient}) {
      config.resolve.alias['create-api'] = `./create-api-${isClient ? 'client' : 'server'}.js`
    }
  },
  head: {
    titleTemplate: 'Nuxt HN | %s',
    meta: [
      { hid: 'description', name: 'description', content: 'HackerNews clone built with Nuxt.js' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Nuxt.js HackerNews' },
      { property: 'og:description', content: 'HackerNews clone built with Nuxt.js' },
      { property: 'og:image', content: 'https://cloud.githubusercontent.com/assets/904724/26784102/0d2f8000-49fc-11e7-8091-2b66901c73ee.png' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@nuxt_js' },
    ]
  },
  loading: {
    color: '#66e8ad'
  },
  manifest: {
    theme_color: '#41b883'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache'
  ],
  plugins: [
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
