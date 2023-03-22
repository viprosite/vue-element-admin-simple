import store from '@/store'
import router from '@/router'

import { login, getInfo } from '@/apis/login'

// 不需要鉴权的页面
const whitePagePaths = ['/login']

router.beforeEach((to, from, next) => {
  console.log(to, from)
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' }) // 如果是/login, 则跳转到 /, 该跳转动作依旧走一遍 router.beforeEach 逻辑
    } else {
      const roles = store.getters.roles
      if (roles.length > 0) {
        next()
      } else {
        // 如果只有token但是没有拿到userInfo（比如说刷新了页面），则重新获取一次
        store.dispatch('getUserInfo').then(res => {
          if (res) {
            const roles = res.roles
            store.commit('SET_ROUTES', roles)
            const routes = store.state.routes
            routes.forEach(item => {
              router.addRoute(item)
            })
            next(to.path)
          }
        }).catch(e => {
          console.log(e)
          localStorage.removeItem('token')
          store.dispatch('SET_TOKEN', '')
          router.push('/login')
        })
      }
    }
  } else {
    if (whitePagePaths.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.fullPaht || ''}`)
    }
  }
})
