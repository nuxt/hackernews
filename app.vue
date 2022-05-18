<script setup lang="ts">
useHead({
  titleTemplate: 'Nuxt HN | %s',
  meta: [
    { property: 'og:image', content: 'https://user-images.githubusercontent.com/11247099/169022756-cdb6ef6f-1299-4ce0-8f80-81fb6e86a2e1.png' },
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
