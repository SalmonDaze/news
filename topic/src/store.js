import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: '',
    avatar: '',
  },
  mutations: {
    login(state, payload){
      state.token = payload.token
      state.username = payload.username
      state.avatar = payload.avatar
      sessionStorage.setItem('username', payload.username)
      sessionStorage.setItem('token', payload.token)
      sessionStorage.setItem('avatar', payload.avatar)
    },
    logout(state){
      state.token = ''
      state.username = ''
      state.avatar = ''
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('avatar')
    }
  },
  actions: {

  }
})
