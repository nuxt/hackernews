export default defineNuxtRouteMiddleware((from) => {
  if (from.path === '/') {
    return navigateTo(`/${validFeeds[0]}/1`)
  }
})
