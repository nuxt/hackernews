import { createError } from 'h3'
import { $fetch } from 'ofetch'
import { parseURL, getQuery } from 'ufo'
import { baseURL } from '~/server/constants'
import { Item } from '~/types'
import { configureSWRHeaders } from '~/server/swr'

export async function fetchItem (
  id: string,
  withComments = false
): Promise<Item> {
  const item = await $fetch(`${baseURL}/item/${id}.json`)
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
          fetchItem(id, withComments)
        )
      )
      : []
  }
}

export default defineEventHandler(({ req, res }) => {
  configureSWRHeaders(res)
  const { search } = parseURL(req.url)
  const { id } = getQuery(search) as { id: string }

  if (!id) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide a item ID.'
    })
  }
  if (Number.isNaN(+id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Item ID mush a number but got ' + id
    })
  }

  return fetchItem(id, true)
})
