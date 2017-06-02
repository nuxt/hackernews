module.exports = {
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
    ssr: {
      // TODO: make component-cache working in production
      cache: require('lru-cache')({
        max: 10000,
        maxAge: 1000 * 60 * 15
      })
    },
    extend(config, {isClient}) {
      config.resolve.alias['create-api'] =
        `./create-api-${isClient ? 'client' : 'server'}.js`
    }
  },
}
