import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: '',
  },
  mutations: {
    login(state, payload){
      state.token = payload.token
      state.username = payload.username
      sessionStorage.setItem('username', payload.username)
      sessionStorage.setItem('token', payload.token)
    },
    logout(state){
      state.token = ''
      state.username = ''
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('token')
    }
  },
  actions: {

  }
})
