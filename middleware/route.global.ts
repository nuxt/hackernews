export default defineNuxtRouteMiddleware((from) => {
  if (from.path === '/')
    return navigateTo('/news/1')
})
