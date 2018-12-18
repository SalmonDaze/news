import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import register from './views/register.vue'
import login from '@/views/login.vue'
import crm from '@/views/CRM.vue'
import store from './store'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/register',
      name: 'register',
      component: register
    },
    {
      path:'/login',
      name: 'login',
      component: login
    },
    {
      path:'/crm',
      meta: {
        requiresAuth: true
      },
      name: 'crm',
      component: crm
    }
  ]
})

