import Vue from 'vue'

const currentTime = new Date().getTime()

Vue.mixin({
  mounted () {
    if (
      '$fetch' in this &&
      (currentTime - this.$store.state.swr.time > 30000 ||
        Object.keys(this.$route.query).includes('refresh'))
    ) {
      this.$fetch()
    }
  }
})

export default function ({ store }) {
  store.registerModule('swr', {
    state: () => ({
      time: new Date().getTime()
    })
  })
}
