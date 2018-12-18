import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

if(sessionStorage.getItem('username')){
  store.commit('login',{
    username:sessionStorage.getItem('username'),
    token:sessionStorage.getItem('token'),
  })
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Authentication-Token'] = store.state.token

router.beforeEach((to, from, next)=>{
  const token = store.state.token
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(token){
      next()
    }else{
      next({
        path: '/login'
      })
    }
    
  }else{
    next()
  }
  return 
})


console.log(store.state)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
