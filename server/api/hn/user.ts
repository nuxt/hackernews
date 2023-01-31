import { createError } from 'h3'
import { $fetch } from 'ofetch'
import { parseURL, getQuery } from 'ufo'
import { User } from '~/types'
import { baseURL } from '~/server/constants'
import { configureSWRHeaders } from '~/server/swr'

async function fetchUser (id: string): Promise<User> {
  const user = await $fetch(`${baseURL}/user/${id}.json`)
  return {
    id: user.id,
    karma: user.karma,
    created_time: user.created,
    about: user.about
  }
}

export default defineEventHandler(({ req, res }) => {
  configureSWRHeaders(res)
  const { search } = parseURL(req.url)
  const { id } = getQuery(search) as { id: string }

  if (!id) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide a user ID.'
    })
  }
  return fetchUser(id)
})
