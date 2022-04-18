import { defineStore } from 'pinia'
import { $fetch } from 'ohmyfetch'

interface Item {
  id: number
}
interface User {

}

interface StoreState {
  items: Record<number, Item>
  users: Record<number, User>
  feeds: Record<string, Record<number, number[]>>
}

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', () => {
  const state: StoreState = reactive({
    items: {},
    users: {},
    feeds: {},
  })

  validFeeds.forEach((feed) => {
    state.feeds[feed] = {}
  })

  function fetchFeed({ feed, page, prefetch }: { feed: string; page: number; prefetch?: boolean }) {
    // Don't prioritize already fetched feeds
    if (state.feeds[feed][page] && state.feeds[feed][page].length)
      prefetch = true

    if (!prefetch) {
      // if (state.feedCancelSource) {
      //   state.feedCancelSource.cancel(
      //       `prioritize feed: ${feed} page: ${page}`,
      //   )
      // }
    }
    return lazy(
      (items) => {
        const ids = items.map(item => item.id)
        state.feeds[feed][page] = ids
        items
          .filter(Boolean)
          .forEach(item => state.items[item.id] = item)
      },
      () => $fetch(`https://api.hackerwebapp.com/${feed}?page=${page}`),
      (state.feeds[feed][page] || []).map(id => state.items[id]),
    )
  }

  function fetchItem(id: string) {
    return lazy(
      (item) => {
        if (item)
          state.items[item.id] = item
      },
      () => $fetch(`https://api.hackerwebapp.com/item/${id}`),
      Object.assign({ id, loading: true, comments: [] }, state.items[id]),
    )
  }

  function fetchUser(id: string) {
    return lazy(
      (user) => {
        state.users[id] = user || false
      },
      () => $fetch(`https://api.hackerwebapp.com/user/${id}`),
      Object.assign({ id, loading: true }, state.users[id]),
    )
  }

  return {
    ...toRefs(state),
    fetchFeed,
    fetchItem,
    fetchUser,
  }
})
