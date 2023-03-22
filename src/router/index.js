import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Layout from '@/layout/Index'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true
  }

]

export const asyncRoutes = [
  {
    path: '/',
    name: '总览',
    component: Layout,
    meta: { icon: 'el-icon-s-home', notShowChildren: true, rolesAuths: ['ADMIN', 'USER', 'HOME'] },
    // 1. 父级路由需要完整包含所有子级路由权限（子级菜单显示依赖父级菜单）
    // 2.某页面的子页面(详情、编辑)权限与该页面相同
    // 3.每个页面的权限包含2类：角色 + 页面权限
    // 4.父级路由有权限才处理子页面权限，所以就算子页面的权限在用户的权限列表里也不会显示

    children: [
      {
        path: '',
        component: () => import('@/views/Home'),
        meta: { icon: 'el-icon-s-home', rolesAuths: ['ADMIN', 'USER', 'HOME'] }
      }
    ]
  },
  {
    path: '/monitor',
    name: '监控',
    component: Layout,
    meta: { icon: 'el-icon-data-line', rolesAuths: ['ADMIN', 'USER', 'DATAMONITOR'] },
    redirect: '/monitor/device',
    children: [
      {
        path: 'device',
        name: '设备',
        component: () => import('@/views/monitor/Device'),
        meta: { icon: 'el-icon-coin', rolesAuths: ['ADMIN', 'USER', 'DEVICEMONITOR'] }
      },
      {
        path: 'device/detail',
        name: '设备详情',
        component: () => import('@/views/monitor/Device'),
        meta: { icon: 'el-icon-coin', rolesAuths: ['ADMIN', 'USER', 'DEVICEMONITOR'] },
        hidden: true
      },
      {
        path: 'data',
        name: '数据',
        component: () => import('@/views/monitor/Data'),
        meta: { icon: 'el-icon-data-analysis', rolesAuths: ['ADMIN', 'USER', 'DATAMONITOR'] }
      }
    ]
  },
  {
    path: '/config',
    name: '配置',
    component: Layout,
    meta: { icon: 'el-icon-set-up', rolesAuths: ['ADMIN', 'USERCONFIG', 'ROLECONFIG'] },
    // redirect: '/config/user',
    children: [
      {
        path: 'user',
        name: '用户',
        meta: { icon: 'el-icon-s-custom', rolesAuths: ['ADMIN', 'USERCONFIG'] },
        component: () => import('@/views/config/User')
      },
      {
        path: 'role',
        name: '角色',
        meta: { icon: 'el-icon-s-opportunity', rolesAuths: ['ADMIN', 'ROLECONFIG'] },
        component: () => import('@/views/config/Role')
      },
      {
        path: 'other',
        name: '其他配置',
        meta: { icon: 'el-icon-s-operation', rolesAuths: ['ADMIN'] },
        // 4.父级路由有权限才处理子页面权限，所以就算子页面的权限在用户的权限列表里也不会显示
        component: () => import('@/views/config/other/Index'),
        children: [
          {
            path: 'system',
            name: '系统',
            meta: { icon: 'el-icon-setting', rolesAuths: ['ADMIN', 'SYSTEMCONFIG'] },
            component: () => import('@/views/config/other/System')
          }
        ]
      }
    ]
  },
  // 404页面也需要预先配置在路由表中
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }

]

export default new VueRouter({
  routes: constantRoutes
})

