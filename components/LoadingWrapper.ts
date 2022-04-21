import { defineComponent, h } from 'vue'
import Spinner from './Spinner.vue'

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { slots }) {
    return () => {
      return props.loading
        ? h('div', { style: { 'text-align': 'center' } }, [
          h(Spinner)
        ])
        : slots.default?.()
    }
  }
})
