export default defineNuxtConfig({
  postcss: {
    plugins: {
      'postcss-nested': {}
    }
  },
  experimental: {
    reactivityTransform: true
  }
})
