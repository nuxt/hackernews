<template>
  <div class="news-view view">
    <item-list-nav :type="type" :page="page" :maxPage="maxPage"></item-list-nav>
    <transition :name="transition" mode="out-in">
      <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
        <transition-group tag="ul" name="item">
          <item v-for="item in displayedItems" :key="item.id" :item="item">
          </item>
        </transition-group>
      </div>
    </transition>
    <item-list-nav :type="type" :page="page" :maxPage="maxPage"></item-list-nav>
  </div>
</template>

<script>
import { watchList } from '../api'
import Item from './Item.vue'
import ItemListNav from './ItemListNav.vue'

export default {
  name: 'item-list',
  components: {
    Item,
    ItemListNav
  },
  props: {
    type: String
  },
  data() {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems
    }
  },
  computed: {
    page() {
      return Number(this.$route.params.page) || 1
    },
    maxPage() {
      const {itemsPerPage, lists} = this.$store.state
      return Math.ceil(lists[this.type].length / itemsPerPage)
    }
  },

  async beforeMount() {
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
    // watch the current list for realtime updates
    this.unwatchList = await watchList(this.type, ids => {
      this.$store.commit('SET_LIST', {type: this.type, ids})
      this.$store.dispatch('ENSURE_ACTIVE_ITEMS').then(() => {
        this.displayedItems = this.$store.getters.activeItems
      })
    })
  },

  beforeDestroy() {
    this.unwatchList()
  },

  watch: {
    page(to, from) {
      console.log('Page changed', to, from)
      this.loadItems(to, from)
    }
  },

  methods: {
    loadItems(to = this.page, from = -1) {
      this.$nuxt.$loading.start()
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: this.type
      }).then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace(`/${this.type}/1`)
          return
        }
        this.transition = from === -1
          ? null
          : to > from ? 'slide-left' : 'slide-right'
        this.displayedPage = to
        this.displayedItems = this.$store.getters.activeItems
        this.$nuxt.$loading.finish()
      })
    }
  }
}
</script>

<style lang="stylus">
.news-list
  background-color #fff
  border-radius 2px

.news-list
  margin 10px 0
  width 100%
  transition all .3s cubic-bezier(.55, 0, .1, 1)
  ul
    list-style-type none
    padding 0
    margin 0

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55, 0, .1, 1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

@media (max-width 600px)
  .news-list
    margin 10px 0
</style>
