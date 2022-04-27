import { Item, User } from '~/types'

export interface StoreState {
  items: Record<number, Item>
  users: Record<number, User>
  feeds: Record<string, Record<number, number[]>>
}

export const useStore = () => useState<StoreState>('store', () => {
  return {
    items: {},
    users: {},
    feeds: Object.fromEntries(validFeeds.map(i => [i, {}]))
  }
})

export function fetchFeed ({ feed, page, prefetch }: { feed: string; page: number; prefetch?: boolean }) {
  const state = $(useStore())

  // Don't prioritize already fetched feeds
  if (state.feeds[feed][page] && state.feeds[feed][page].length) {
    prefetch = true
  }

  if (!prefetch) {
    // if (state.feedCancelSource) {
    //   state.feedCancelSource.cancel(
    //       `prioritize feed: ${feed} page: ${page}`,
    //   )
    // }
  }
  return lazyLoad(
    (items) => {
      const ids = items.map(item => item.id)
      state.feeds[feed][page] = ids
      items
        .filter(Boolean)
        .forEach((item) => { state.items[item.id] = item })
    },
    () => $fetch('/api/hn/feeds', { params: { feed, page } }),
    (state.feeds[feed][page] || []).map(id => state.items[id])
  )
}

export function fetchItem (id: string) {
  const state = $(useStore())

  return lazyLoad(
    (item) => {
      if (item) { state.items[item.id] = item }
    },
    () => $fetch('/api/hn/item', { params: { id } }),
    Object.assign({ id, loading: true, comments: [] }, state.items[id])
  )
}

export function fetchUser (id: string) {
  const state = $(useStore())

  return lazyLoad(
    (user) => {
      state.users[id] = user || false
    },
    () => $fetch('/api/hn/user', { params: { id } }),
    Object.assign({ id, loading: true }, state.users[id])
  )
}
