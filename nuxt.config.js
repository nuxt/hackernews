module.exports = {
  build: {
    extend (config, { isClient }) {
      config.resolve.alias['create-api'] = `./create-api-${isClient ? 'client' : 'server'}.js`
    }
  },
  head: {
    titleTemplate: 'Nuxt HN | %s',
    meta: [
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
    theme_color: '#2B8358'
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
      setHeaders (res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', 'public, max-age=0')
        }
      }
    }
  }
}
