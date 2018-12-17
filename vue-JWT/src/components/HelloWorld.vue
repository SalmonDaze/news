<template>
  <div class="hello">
    <div v-if='!username'>
      <label for="account">账号</label>
        <input id='account' type="text" v-model='account' />
      <label for="password">密码</label>
        <input type="password" v-model='password'>
        <input type="button" value='注册' @click='register'>
        <input type="button" value='登录' @click='login'>
        
        <br/>
    </div>
    <div v-else>
      <span>欢迎登陆{{username}}</span>
    </div>
        <router-link :to="{name:'page'}">have token?</router-link>
        <input type="button" value='log' @click='log'>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data(){
    return{
      account:'',
      password:'',
    }
  },
  computed:mapState({
    username:state => state.username
  }),
  methods:{
    log: function(){
      console.log(this.$store.state)
    },
    register: function(){
      let username = this.account
      let password = this.password
      this.$http({
        url:'http://localhost:3000/register',
        method:'POST',
        data:{
          username:username,
          password:password
        },
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
        this.$store.state.token = res.data.token
        })
    },
    login: function(){
      let token = this.$store.state.token
      let username = this.account
      let password = this.password
      this.$http({
        url:'http://localhost:3000/login',
        method:'POST',
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        data:{
          username:username,
          password:password,
        }
      }).then((res)=>{
        console.log(res)
        let username = res.data.user.username
        let token = res.data.token
        let _id = res.data.user._id
        this.$store.commit('add_login_user',{
          username:username,
          token:token,
          _id:_id
        })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
