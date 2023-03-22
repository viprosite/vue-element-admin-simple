import Vue from 'vue'
import App from './App.vue'
import VueRouter from '@/router'
import Store from '@/store'

import './permission'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

Vue.use(ElementUI)

const vm = new Vue({
  render: h => h(App),
  router: VueRouter,
  store: Store
}).$mount('#app')

console.log(vm)
