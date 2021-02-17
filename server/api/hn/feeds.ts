import { createError, PHandle } from 'h3'
import { $fetch } from 'ohmyfetch/node'
import { getQuery, parseURL, withoutLeadingSlash } from 'ufo'

import { feeds, validFeeds } from '../../../common/api'

import { baseURL } from '.'

const feedUrls: Record<keyof typeof feeds, string> = {
  ask: 'askstories',
  jobs: 'jobstories',
  show: 'showstories',
  newest: 'newstories',
  news: 'topstories',
}

async function fetchFeed(feed: string, page = '1') {
  const { fetchItem } = await import('./item')
  const entries = Object.values(
    await $fetch(`${baseURL}/${feedUrls[feed]}.json`)
  ).slice(Number(page) * 10, Number(page) * 10 + 10) as string[]
  return Promise.all(entries.map(id => fetchItem(id)))
}

const handler: PHandle = async req => {
  const { pathname, search } = parseURL(req.url)
  const feed = withoutLeadingSlash(pathname)
  const { page = '1' } = getQuery(search)

  if (!validFeeds.includes(feed) || String(Number(page)) !== page) {
    throw createError({
      statusCode: 422,
      statusMessage: `Must provide one of ${validFeeds.join(
        ', '
      )} and a valid page number.`,
    })
  }

  return fetchFeed(feed, page)
}

export default handler
