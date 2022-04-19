export default defineNuxtRouteMiddleware((from) => {
  if (!from.params.feed || !validFeeds.includes(from.params.feed as string)) {
    return abortNavigation('not found')
  }
  if (!from.params.page) {
    return navigateTo(`/${from.params.feed}/1`)
  }
})
