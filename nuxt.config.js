module.exports = {
  build: {
    extractCSS: true,
    extend(config, {isClient}) {
      config.resolve.alias['create-api'] = `./create-api-${isClient ? 'client' : 'server'}.js`
    }
  },
  head: {
    titleTemplate: 'Nuxt HN | %s'
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
