import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/HelloWorld.vue'
import page from './components/anotherpage.vue'
import store from './store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path:'/another',
      name:'page',
      component:page,
      meta: { requiresAuth:true }
    }
  ]
})

if(sessionStorage.getItem('username')){
  store.commit('add_login_user',{
    username:sessionStorage.getItem('username'),
    token:sessionStorage.getItem('token'),
    _id:sessionStorage.getItem('_id')
  })
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.token) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
