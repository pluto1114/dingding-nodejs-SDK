import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/order-add',
      name: 'OrderAdd',
      component: () => import('./views/OrderAdd.vue')
    },
    {
      path: '/order-list',
      name: 'OrderList',
      component: () => import('./views/OrderList.vue')
    },
    {
      path: '/result',
      name: 'Result',
      component: () => import('./views/Result.vue')
    },
  ]
})
