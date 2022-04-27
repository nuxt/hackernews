<script setup lang="ts">
useHead({
  titleTemplate: 'Nuxt HN | %s',
  meta: [
    { property: 'og:image', content: 'https://user-images.githubusercontent.com/904724/58238637-f189ca00-7d47-11e9-8213-ae072d7cd3aa.png' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:site', content: '@nuxt_js' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icon.png' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
