<template>
  <div class="home">
    <el-row :gutter="20" class='content'>
      <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <div>
            <router-link :to="{name:'crm'}">
              <el-button type='success' style='width:200px;height:50px;'>后台！！</el-button>
            </router-link>
            <div v-if='!token'>
              <index />
            </div>
            <div v-else>
              <div style='margin-top:350px;color:purple;'>
                <h3>{{username}} 欢迎登陆！</h3>
                <router-link :to="{path:'/'}" style='text-decoration:none;color:black;'>进入个人主页🏠</router-link>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import index from '@/components/index.vue'
import { mapState } from 'vuex';
export default {
  name: 'home',
  components: {
    index
  },
  computed:mapState({
    token: state => state.token,
    username: state => state.username,
  })
}
</script>
<style lang="scss" scoped>
.home{
  width:100%;
  height:100vh;
  background: url(../../assets/index_banner1.jpg);
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;
  
  .el-row{
    margin-left:0px;
    margin-right:0px;
  }
}
</style>

