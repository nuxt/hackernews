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
    color: '#ff6600'
  },
  manifest: {
    theme_color: '#41B883'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache'
  ],
  plugins: [
    '~plugins/filters.js'
  ]
}
