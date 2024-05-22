// 現在は未使用（ダミーデータからチェス駒データ取得時、work-[id]ページに直接遷移をさせない目的で使用していた）
export default defineNuxtRouteMiddleware(async (route, from) => {
  console.log("from name:" + from.name?.toString())
  console.log("route name:" + route.name?.toString())
  if (from.name === undefined) {
    return navigateTo('/')
  }
})