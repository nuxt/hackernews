<script setup lang="ts">
import { feedsInfo } from '~/composables/api'

definePageMeta({
  middleware: 'feed'
})

const route = useRoute()
const router = useRouter()
const page = $computed(() => +route.params.page || 1)
const feed = $computed(() => route.params.feed as string)
const isValidFeed = $computed(() => !!feedsInfo[feed])

// const transition = $ref('slide-right')
const pageNo = $computed(() => Number(page) || 1)
const displayedPage = ref(pageNo)

useHead({
  title: feedsInfo[feed]?.title
})

const state = $(useStore())

if (isValidFeed) {
  await fetchFeed({ page: pageNo, feed })
}
const items = $computed(() => getFeed(state, { page: pageNo, feed }) || [])
const loading = $computed(() => items.length === 0)

const maxPage = $computed(() => {
  return +(feedsInfo[feed]?.pages) || 0
})

function pageChanged (to: number, from = -1) {
  if (!isValidFeed) { return }

  if (to <= 0 || to > maxPage) {
    router.replace(`/${feed}/1`)
    return
  }

  // Prefetch next page
  fetchFeed({
    feed,
    page: page + 1
  }).catch(() => {})

  // transition = from === -1
  //   ? null
  //   : to > from
  //     ? 'slide-left'
  //     : 'slide-right'

  displayedPage.value = to
}

onMounted(() => pageChanged(page))
watch(() => page, (to, old) => pageChanged(to, old))
</script>

<template>
  <div class="view">
    <ItemListNav :feed="feed" :page="page" :max-page="maxPage" />

    <div :key="displayedPage" class="news-list">
      <Spinner v-if="loading" />
      <template v-else>
        <ul>
          <Item v-for="item in items" :key="item.id" :item="item" />
        </ul>
        <ItemListNav :feed="feed" :page="page" :max-page="maxPage" />
      </template>
    </div>
  </div>
</template>

<style lang="postcss">
.news-list {
  background-color: #fff;
  border-radius: 2px;
  position: absolute;
  top: 40px;
  left: 0;
  margin: 10px 0;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}

.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

.item-move, .item-enter-active, .item-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}

.item-leave-active {
  position: absolute;
  opacity: 0;
  transform: translate(30px, 0);
}

@media (max-width: 600px) {
  .news-list {
    margin: 10px 0;
  }
}
</style>
