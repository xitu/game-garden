import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)
console.log(routes)
// 重定向配置
const redirect = {
  path: '',
  redirect: routes[0].path,
}
// 开启默认重定向
routes.unshift(redirect)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router;
