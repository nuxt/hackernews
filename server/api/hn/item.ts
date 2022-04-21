import { createError, PHandle } from 'h3'
import { $fetch } from 'ohmyfetch/node'
import { withoutLeadingSlash } from 'ufo'

import { baseURL } from '.'

export interface Item {
  id: number
  url?: string
  title?: string
  type: 'job' | 'story' | 'comment' | 'poll'
  points: number
  user: string
  content?: string
  time: string
  comments_count?: number
  comments?: Item[]
}

export async function fetchItem(
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
      : [],
  }
}

const handler: PHandle = async req => {
  const itemId = withoutLeadingSlash(req.url)
  if (!itemId) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide a user ID.',
    })
  }
  return fetchItem(itemId, true)
}

export default handler
