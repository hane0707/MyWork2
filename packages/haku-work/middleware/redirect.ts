export default defineNuxtRouteMiddleware(async (route, from) => {
  console.log("from name:" + from.name?.toString())
  console.log("route name:" + route.name?.toString())
  if (from.name === undefined) {
    return navigateTo('/')
  }
})