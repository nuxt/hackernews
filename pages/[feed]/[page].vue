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

let transition = $ref('slide-right')
const pageNo = $computed(() => {
  return Number(page) || 1
})
const store = useStore()
const displayedPage = ref(pageNo)

useHead({
  title: feedsInfo[feed]?.title
})

if (isValidFeed) {
  await store.fetchFeed({ page: pageNo, feed })
}

// TODO:
// validate({ params: { feed } }) {
//   return validFeeds.includes(feed)
// },

const maxPage = $computed(() => {
  return feedsInfo[feed]?.pages
})
const pageData = $computed(() => {
  return store.feeds[feed][pageNo] || []
})
const displayedItems = $computed(() => {
  return pageData.map(id => store.items[id])
})
const loading = $computed(() => {
  return displayedItems.length === 0
})

function pageChanged (to: number, from = -1) {
  if (!isValidFeed) { return }

  if (to <= 0 || to > maxPage) {
    router.replace(`/${feed}/1`)
    return
  }

  // Prefetch next page
  store
    .fetchFeed({
      feed,
      page: page + 1,
      prefetch: true
    })
    .catch(() => {})

  transition = from === -1
    ? null
    : to > from
      ? 'slide-left'
      : 'slide-right'

  displayedPage.value = to
}

// watch: {
//   feed: '$fetch',
//   page: 'pageChanged',
// },

onMounted(() => {
  // TODO:
  // if (!pageData.length)
  //   this.$fetch()

  pageChanged(page)
})

watch(() => page, (to, old) => pageChanged(to, old))
</script>

<template>
  <div class="view">
    <item-list-nav :feed="feed" :page="page" :max-page="maxPage" />

    <LoadingWrapper :loading="loading">
      <transition :name="transition" mode="out-in">
        <div :key="displayedPage" class="news-list">
          <ul>
            <item v-for="item in displayedItems" :key="item.id" :item="item" />
          </ul>
        </div>
      </transition>
      <item-list-nav :feed="feed" :page="page" :max-page="maxPage" />
    </LoadingWrapper>
  </div>
</template>

<style lang="postcss">
.news-list {
  background-color: #fff;
  border-radius: 2px;
}

.news-list {
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
