<script setup lang="ts">
useSeoMeta({
  titleTemplate: 'Nuxt HN | %s',
  description: 'HackerNews clone built with Nuxt.',
  ogImage: 'https://hn.nuxt.dev/cover.jpg',
  ogImageAlt: 'Nuxt Hackernews',
  twitterImage: 'https://hn.nuxt.dev/cover.jpg',
  twitterSite: '@nuxt_js',
  twitterCreator: '@nuxt_js',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
