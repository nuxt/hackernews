import { $fetch } from 'ofetch'
import type { Item } from '~~/types'

export async function fetchItem(
  id: string,
  withComments = false,
): Promise<Item> {
  const item = await $fetch(`/item/${id}.json`, { baseURL: BASE_URL })
  item.kids = item.kids || {}
  return {
    id: item.id,
    user: item.by,
    points: item.score,
    time: item.time,
    content: item.text,
    url: item.url,
    type: item.type,
    title: item.title,
    comments_count: Object.values(item.kids).length,
    comments: withComments
      ? await Promise.all(
        Object.values(item.kids as string[]).map(id =>
          fetchItem(id, withComments),
        ),
      )
      : [],
  }
}

export default defineCachedEventHandler((event) => {
  const { id } = getQuery(event) as { id?: string }

  if (!id) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide a item ID.',
    })
  }
  if (Number.isNaN(+id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Item ID mush a number but got ' + id,
    })
  }

  return fetchItem(id, true)
}, {
  name: 'api/hn',
  getKey(event) {
    const { id } = getQuery(event)
    return ['item', id].join('/')
  },
  swr: false,
  maxAge: 60,
})
