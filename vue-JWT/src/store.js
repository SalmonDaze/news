import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    username:'',
    _id:''
  },
  mutations: {
    add_login_user(state,payload){
      state.username = payload.username
      state.token = payload.token
      state._id = payload._id
      sessionStorage.setItem('username',payload.username)
      sessionStorage.setItem('token',payload.token)
      sessionStorage.setItem('_id',payload._id)
    },
    logout(state){
      state.username = ''
      state.token = ''
      state._id = ''
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('_id')
    }
  },
  actions: {

  }
})
