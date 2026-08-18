export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
  ],

  // https://devtools.nuxt.com
  devtools: {
    enabled: true,
  },
  future: { compatibilityVersion: 4 },
  hub: {
    cache: true,
  },
  postcss: {
    plugins: {
      'postcss-nesting': {},
    },
  },
  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
})
