<script setup lang="ts">
const props = defineProps<{
  feed: string,
  page: number,
  maxPage: number
}>()

const hasMore = $computed(() => props.page < props.maxPage)
</script>

<template>
  <div class="news-list-nav">
    <NuxtLink v-if="page > 1" :to="`/${feed}/${page - 1}`">
      &lt; prev
    </NuxtLink>
    <span v-else class="disabled">&lt; prev</span>
    <span class="page">{{ page }}/{{ maxPage }}</span>
    <NuxtLink v-if="hasMore" :to="`/${feed}/${page + 1}`">
      more &gt;
    </NuxtLink>
    <span v-else class="disabled">more &gt;</span>
  </div>
</template>

<style lang="postcss">
.news-list-nav, .news-list {
  background-color: #fff;
  border-radius: 2px;
}

.news-list-nav {
  padding: 15px 30px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  user-select: none;

  a {
    margin: 0 1em;
  }

  .disabled {
    opacity: 0.5;
  }

  .page {
    width: 100px;
    display: inline-block;
    text-align: center;
  }
}
</style>
