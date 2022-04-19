<script setup lang="ts">
import LazyWrapper from '~/components/LazyWrapper'
import { host, timeAgo } from '~/plugins/filters'

const route = useRoute()
const store = useStore()
const id = $computed(() => route.params.id as string)
const item = $computed(() => store.items[id])

useHead({
  title: item?.title,
})

store.fetchItem(id)

function isAbsolute(url: string) {
  return /^https?:\/\//.test(url)
}
</script>

<template>
  <div class="item-view view">
    <div class="item-view-header">
      <template v-if="isAbsolute(item.url)">
        <a :href="item.url" target="_blank" rel="noopener"><h1 v-text="item.title" /></a>
        <span class="host"> ({{ host(item.url) }})</span>
      </template>
      <template v-else>
        <h1 v-text="item.title" />
      </template>
      <p class="meta">
        {{ item.points }} points | by
        <RouterLink :to="'/user/' + item.user">
          {{ item.user }}
        </RouterLink>
        {{ timeAgo(item.time ) }} ago
      </p>
    </div>
    <div class="item-view-comments">
      <LazyWrapper :loading="item.loading">
        <p class="item-view-comments-header">
          {{ item.comments ? item.comments.length + ' comments' : 'No comments yet.' }}
        </p>
        <ul class="comment-children">
          <comment v-for="comment in item.comments" :key="comment.id" :comment="comment" />
        </ul>
      </LazyWrapper>
    </div>
  </div>
</template>

<style lang="stylus">
.item-view-header {
  background-color: #fff;
  padding: 1.8em 2em 1em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  h1 {
    display: inline;
    font-size: 1.5em;
    margin: 0;
    margin-right: 0.5em;
  }

  .host, .meta, .meta a {
    color: #595959;
  }
  .meta a:hover {
    color: #00C48D;
  }

  .meta a {
    text-decoration: underline;
  }
}

.item-view-comments {
  background-color: #fff;
  margin-top: 10px;
  padding: 0 2em 0.5em;
}

.item-view-comments-header {
  margin: 0;
  font-size: 1.1em;
  padding: 1em 0;
  position: relative;

  .spinner {
    display: inline-block;
    margin: -15px 0;
  }
}

.comment-children {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

@media (max-width: 600px) {
  .item-view-header {
    h1 {
      font-size: 1.25em;
    }
  }
}
</style>
