export default defineNuxtRouteMiddleware((from) => {
  if (!from.params.feed || !validFeeds.includes(from.params.feed as string)) {
    return navigateTo('/')
  }
  if (!from.params.page) {
    return navigateTo(`/${from.params.feed}/1`)
  }
})
