<template>
  <div class="home">
    <el-row :gutter="20" class='content'>
      <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <index />
        </div>
      </el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import index from '@/components/index.vue'

export default {
  name: 'home',
  components: {
    index
  }
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

