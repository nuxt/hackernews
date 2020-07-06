import Vue from 'vue'

const currentTime = new Date().getTime()

Vue.mixin({
  beforeMount () {
    if ('$fetch' in this && currentTime - this.$store.state.swr.time > 30000) {
      this.$fetch()
    }
  }
})

export default function ({ store }) {
  store.registerModule('swr',{
    state: () => ({
      time: currentTime
    })
  })
}
