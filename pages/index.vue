<script>
import { validFeeds } from '~/common/api'

export default {
  fetch({ redirect }) {
    redirect('/' + validFeeds[0])
  }
}
</script>
