// @ts-ignore Import error workaround for module augmentation
import '@nuxtjs/color-mode'

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxtjs/color-mode'
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  // Module configurations
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  hub: {
    cache: true,
  },

  postcss: {
    plugins: {
      'postcss-nesting': {},
    },
  },

  devtools: {
    enabled: true,
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  compatibilityDate: '2025-05-06',

  nitro: {
    routeRules: {
      '/**': { cors: true }
    }
  },

  experimental: {
    headNext: true
  }
})