<template>
  <div class="hello">
    <div class='login_content'>
      <router-link :to="{name:'register'}"><el-button type='primary' class='rg_btn'>注册账号</el-button></router-link>
      <router-link :to="{name:'login'}"><el-button  type='primary' class='rg_btn'>账号登陆</el-button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
}
</script>

<style scoped lang="scss">
.hello{
  margin-right:0px;
  margin-top:350px;
  margin-left:-80px;
  .login_content{
    width: 500px;
    margin:0 auto;
  }
  .rg_btn:nth-child(1){
    margin-left:40px;
  }
  .rg_btn{
    width:120px;
    height:40px;
  }
}
</style>
