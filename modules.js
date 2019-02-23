// This is a temporary workaround to only enable modules for build time
module.exports = function () {
  if (this.options._start) {
    console.log('Skipping Modules...') // eslint-disable-line no-console
    return
  }
  this.requireModule('@nuxtjs/pwa')
  this.requireModule('@nuxtjs/axios')
}
