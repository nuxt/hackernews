import { createError } from 'h3'
import { $fetch } from 'ofetch'
import { getQuery, parseURL } from 'ufo'

import { feedsInfo, validFeeds } from '~/composables/api'

import { baseURL } from '~/server/constants'
import { configureSWRHeaders } from '~/server/swr'

const feedUrls: Record<keyof typeof feedsInfo, string> = {
  ask: 'askstories',
  jobs: 'jobstories',
  show: 'showstories',
  newest: 'newstories',
  news: 'topstories'
}

async function fetchFeed (feed: string, page = '1') {
  const { fetchItem } = await import('./item')
  const entries = Object.values(
    await $fetch(`${baseURL}/${feedUrls[feed]}.json`)
  ).slice(Number(page) * 10, Number(page) * 10 + 10) as string[]
  return Promise.all(entries.map(id => fetchItem(id)))
}

export default defineEventHandler(({ req, res }) => {
  configureSWRHeaders(res)
  const { search } = parseURL(req.url)
  const { page = '1', feed = 'news' } = getQuery(search) as { page: string, feed: string }

  if (!validFeeds.includes(feed) || String(Number(page)) !== page) {
    throw createError({
      statusCode: 422,
      statusMessage: `Must provide one of ${validFeeds.join(', ')} and a valid page number.`
    })
  }

  return fetchFeed(feed, page)
})
