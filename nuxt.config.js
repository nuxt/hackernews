module.exports = {
  head: {
    titleTemplate: 'Nuxt HN | %s',
  },
  loading: {color: '#ff6600'},
  modules: [
    require('@nuxtjs/manifest'),
    require('@nuxtjs/meta'),
    require('@nuxtjs/workbox'),
    require('@nuxtjs/component-cache')
  ],
  plugins: [
    '~plugins/filters.js'
  ],
  build: {
    extractCSS: true,
    extend(config, {isClient}) {
      config.resolve.alias['create-api'] =
        `./create-api-${isClient ? 'client' : 'server'}.js`
    }
  },
  manifest: {
    theme_color: '#41B883'
  }
}
