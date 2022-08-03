import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  manifest: {
    name: 'Nuxt Hacker News',
    short_name: 'Nuxt HN',
    description: 'HackerNews clone built with Nuxt3',
    theme_color: '#2F495E',
    start_url: '/news'
  },

  modules: [
    '@nuxtjs/pwa'
  ],

  postcss: {
    plugins: {
      'postcss-nested': {}
    }
  },

  experimental: {
    reactivityTransform: true,
    viteNode: true
  }
})
