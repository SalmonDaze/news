import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    username:'',
  },
  mutations: {
    add_login_user(state,payload){
      state.username = payload.username
      state.token = payload.token
      sessionStorage.setItem('username',payload.username)
      sessionStorage.setItem('token',payload.token)
    },
    logout(state){
      state.username = ''
      state.token = ''
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('token')
    }
  },
  actions: {

  }
})
