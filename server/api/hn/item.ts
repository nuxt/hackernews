import { createError } from 'h3'
import { $fetch } from 'ohmyfetch'
import { withoutLeadingSlash } from 'ufo'
import { baseURL } from '../../constants'
import { Item } from '~/types'

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

export default defineEventHandler(({ req }) => {
  const itemId = withoutLeadingSlash(req.url)
  if (!itemId) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide a user ID.'
    })
  }
  return fetchItem(itemId, true)
})
