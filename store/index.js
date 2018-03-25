import Vue from "vue"

import { validFeeds } from "~/common/api"
import { lazy } from "~/common/utils"
import { CancelToken } from "axios"

export default {
  // =================================================
  // State
  // =================================================
  state: () => {
    const state = {
      items: {
        /* [id: number]: Item */
      },
      users: {
        /* [id: string]: User */
      },
      feeds: {
        /* [page: number] : [ [id: number] ] */
      }
    }

    validFeeds.forEach(feed => {
      state.feeds[feed] = {}
    })

    return state
  },
  // =================================================
  // Actions
  // =================================================
  actions: {
    FETCH_FEED({ commit, state }, { feed, page, prefetch }) {
      // Don't priorotize already fetched feeds
      if (state.feeds[feed][page] && state.feeds[feed][page].length) {
        prefetch = true
      }
      if (!prefetch) {
        if (this.feedCancelSource) {
          this.feedCancelSource.cancel(
            "priorotize feed: " + feed + " page: " + page
          )
        }
        this.feedCancelSource = CancelToken.source()
      }

      return lazy(
        items => {
          const ids = items.map(item => item.id)
          commit("SET_FEED", { feed, ids, page })
          commit("SET_ITEMS", { items })
        },
        () =>
          this.$axios.$get(`/api/${feed}/${page}.json`, {
            cancelToken: this.feedCancelSource && this.feedCancelSource.token
          }),
        (state.feeds[feed][page] || []).map(id => state.items[id])
      )
    },

    FETCH_ITEM({ commit, state }, { id }) {
      return lazy(
        item => commit("SET_ITEM", { item }),
        () => this.$axios.$get(`/api/item/${id}.json`),
        Object.assign({ id, loading: true, comments: [] }, state.items[id])
      )
    },

    FETCH_USER({ state, commit }, { id }) {
      return lazy(
        user => commit("SET_USER", { id, user }),
        () => this.$axios.$get(`/api/user/${id}.json`),
        Object.assign({ id, loading: true }, state.users[id])
      )
    }
  },
  // =================================================
  // Mutations
  // =================================================
  mutations: {
    SET_FEED: (state, { feed, ids, page }) => {
      Vue.set(state.feeds[feed], page, ids)
    },
    SET_ITEM: (state, { item }) => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    },
    SET_ITEMS: (state, { items }) => {
      items.forEach(item => {
        if (item) {
          Vue.set(state.items, item.id, item)
        }
      })
    },
    SET_USER: (state, { id, user }) => {
      Vue.set(state.users, id, user || false) /* false means user not found */
    }
  }
}
