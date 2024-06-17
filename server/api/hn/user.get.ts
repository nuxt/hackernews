import { $fetch } from 'ofetch'
import type { User } from '~~/types'

async function fetchUser(id: string): Promise<User> {
  const user = await $fetch(`${BASE_URL}/user/${id}.json`)
  return {
    id: user.id,
    karma: user.karma,
    created_time: user.created,
    about: user.about,
  }
}

export default defineEventHandler((event) => {
  configureSWRHeaders(event)
  const { id } = getQuery(event) as { id?: string }

  if (!id) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide a user ID.',
    })
  }
  return fetchUser(id)
})
