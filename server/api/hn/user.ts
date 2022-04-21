import { createError } from 'h3'
import { $fetch } from 'ohmyfetch'
import { withoutLeadingSlash } from 'ufo'
import { baseURL } from '../../constants'
import { User } from '~/types'

async function fetchUser (id: string): Promise<User> {
  const user = await $fetch(`${baseURL}/user/${id}.json`)
  return {
    id: user.id,
    karma: user.karma,
    created_time: user.created,
    about: user.about
  }
}

export default defineEventHandler(({ req }) => {
  const userId = withoutLeadingSlash(req.url)
  if (!userId) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide a user ID.'
    })
  }
  return fetchUser(userId)
})
