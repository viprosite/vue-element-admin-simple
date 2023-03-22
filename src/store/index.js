import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { asyncRoutes, constantRoutes } from '@/router'

import { login, getInfo } from '@/apis/login'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    userInfo: null,
    roles: [],
    routes: [],
    app: {
      sideBarIsCollapse: false // 左侧菜单栏是否收起
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    roles(state) {
      return state.roles
    },
    routes(state) {
      return state.routes
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_INFO(state, data) {
      state.userInfo = data
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    },
    SET_ROUTES(state, roles) {
      roles = ['ADMIN', 'USER', 'HOME', 'USERCONFIG', 'ROLECONFIG', 'SYSTEMCONFIG']
      const routes = filterAsyncRoutes(asyncRoutes, roles)
      state.routes = routes.concat(constantRoutes)
      console.log(routes)
    },
    TOGGLE_SIDE_BAR(state) {
      state.app.sideBarIsCollapse = !state.app.sideBarIsCollapse
    },
    LOGOUT(state) {
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    loginFn({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          if (res?.data) {
            commit('SET_TOKEN', res.data)
            resolve(res.data)
            //   dispatch('getUserInfo', res.data)
          }
        })
      })
    },
    getUserInfo({ commit }, token) {
      return new Promise((resolve, reject) => {
        getInfo(token).then(res => {
          // console.log(res)
          if (res?.data) {
            commit('SET_INFO', res.data)
            commit('SET_ROLES', res.data.roles)
            // commit('SET_ROUTES', res.data.roles)
            resolve(res.data)
          }
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
})

function hasPermission(roles, route) {
  if (route.meta && route.meta.rolesAuths) {
    return roles.some(role => route.meta.rolesAuths.includes(role)) // rolesAuths只要包含roles中任意一个元素即满足 true
  } else {
    return true // 没写权限的默认允许  比如404
  }
}

function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) { // 父级路由有权限才处理子页面权限
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  // console.log(res)
  return res
}
