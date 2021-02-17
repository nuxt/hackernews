import { createError, PHandle } from 'h3'
import { $fetch } from 'ohmyfetch/node'
import { withoutLeadingSlash } from 'ufo'

import { baseURL } from '.'

export interface User {
  id: string
  created_time: string
  karma: number
  about: string
}

async function fetchUser(id: string): Promise<User> {
  const user = await $fetch(`${baseURL}/user/${id}.json`)
  return {
    id: user.id,
    karma: user.karma,
    created_time: user.created,
    about: user.about,
  }
}

const handler: PHandle = async req => {
  const userId = withoutLeadingSlash(req.url)
  if (!userId) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide a user ID.',
    })
  }
  return fetchUser(userId)
}

export default handler
