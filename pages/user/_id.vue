<template>
  <div class="user-view view">
    <template v-if="user">
      <h1>User : {{ user.id }}</h1>
      <lazy-wrapper :loading="user.loading">
        <ul class="meta">
          <li>
            <span class="label">Created:</span> {{ user.created_time | timeAgo }} ago
          </li>
          <li>
            <span class="label">Karma:</span> {{ user.karma || '-' }}
          </li>
          <li v-if="user.about" class="about" v-html="user.about" />
        </ul>
      </lazy-wrapper>
      <p class="links">
        <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">submissions</a> |
        <a :href="'https://news.ycombinator.com/threads?id=' + user.id">comments</a>
      </p>
    </template>
    <template v-else>
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
import LazyWrapper from '~/components/LazyWrapper'

export default {
  name: 'UserView',

  components: { LazyWrapper },

  computed: {
    user() {
      return this.$store.state.users[this.$route.params.id]
    }
  },

  head() {
    return {
      title: this.user ? this.user.id : 'User not found'
    }
  },

  fetch({ store, route: { params: { id } } }) {
    return store.dispatch('FETCH_USER', { id })
  }
}
</script>

<style lang="stylus">
.user-view {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em;

  h1 {
    margin: 0;
    font-size: 1.5em;
  }

  .meta {
    list-style-type: none;
    padding: 0;
  }

  .label {
    display: inline-block;
    min-width: 4em;
  }

  .about {
    margin: 1em 0;
  }

  .links a {
    text-decoration: underline;
  }
}
</style>
