<template>
<div>
  <div v-show='!userCookie'>
    <div class="hello" v-if='toggle'>
      <input type="text" placeholder="请输入账号" v-model='username'>
      <br/>
      <input type="password" placeholder="请输入密码" v-model="password">
      <br/>
      <input type="button" value="注册！" @click='registry'>
      <a href="#" @click='toggle = !toggle'>已经有账号？去登陆</a>
      {{msg}}
    </div>
    <div v-else>
      <input type="text" placeholder="请输入账号" v-model='username'>
      <br/>
      <input type="password" placeholder="请输入密码" v-model="password">
      <br/>
      <input type="button" value="登陆！" @click='login'>
      {{msg}}
    </div>
  </div>
  <div v-show='userCookie'>
    欢迎登陆{{userCookie.username}}
    <input type='button' value='登出' @click='logout'>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
      username:'',
      password:'',
      userCookie:'',
      toggle:true,
    }
  },
  created() {
    this.$http({
      method:'GET',
      withCredentials: true,
      url:'http://localhost:3000/checklogin'
    }).then((res)=>{
      if(res.data.code==200){
        this.userCookie = res.data.message
      }
    })
  },
  methods:{
    registry(){
      let username = this.username
      let password = this.password
      this.$http({
        method:'POST',
        url:'http://localhost:3000/register',
        withCredentials: true,
        data:{
          username: username,
          password: password,
        },
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
        if(res.data.code == 1){
          this.msg = res.data.message
          return
        }else{
          this.msg = res.data.message
        }
      })
    },
    login(){
      let username = this.username
      let password = this.password
      this.$http({
        method:'POST',
        url:'http://localhost:3000/login',
        withCredentials:true,
        data:{
          username:username,
          password:password
        },
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
        if(res.data.code == 1){
          this.msg = res.data.message
          return
        }else{
          this.msg = res.data.message
          this.userCookie = res.data.userInfo
          console.log(this.userCookie)
        }
      })
    },
    logout(){
      this.$http({
        method:'GET',
        url:'http://localhost:3000/logout',
        withCredentials:true,
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
        this.userCookie = !this.userCookie
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
