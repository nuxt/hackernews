import { $fetch } from 'ofetch'
import type { User } from '~~/types'

async function fetchUser(id: string): Promise<User> {
  const user = await $fetch(`/user/${id}.json`, { baseURL: BASE_URL })
  return {
    id: user.id,
    karma: user.karma,
    created_time: user.created,
    about: user.about,
  }
}

export default defineCachedEventHandler((event) => {
  const { id } = getQuery(event) as { id?: string }

  if (!id) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide a user ID.',
    })
  }
  return fetchUser(id)
}, {
  name: 'api/hn',
  getKey(event) {
    const { id } = getQuery(event)
    return ['user', id].join('/')
  },
  swr: false,
  maxAge: 60,
})
