export default defineEventHandler((event) => {
  const query = getQuery(event)

  if (typeof query.csr !== 'undefined') {
    event.req.headers['x-nuxt-no-ssr'] = 'true'
  }
})
