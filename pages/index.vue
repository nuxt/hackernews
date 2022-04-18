<script>
import { validFeeds } from '~/composables/api'

export default {
  fetch({ redirect }) {
    redirect(`/${validFeeds[0]}`)
  },
}
</script>
