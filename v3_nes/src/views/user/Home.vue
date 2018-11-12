<template>
  <div class="home">
    <navbar>
      <template slot='header'>
        <router-link :to="{path:'/'}"><span style='color:black;'>Neet 新闻网</span></router-link>
      </template>
      <template slot='footer'>
        <div v-if='!userCookie' class='status_bar'>
          请先<router-link :to="{path:'/login'}">登陆</router-link>或<router-link :to="{path:'/register'}">注册</router-link>
        </div>
        <div v-else class='status_bar'>
          {{userCookie.username}}
          <span>{{userCookie.isAdmin ? '管理员' : '普通用户'}}</span>
          <span v-if='userCookie.isAdmin' style='margin-left:30px;'><router-link :to="{path:'/admin/info'}">管理页面</router-link></span>
          <span><a style='margin-left:30px;' @click='logout'>用户登出</a></span>
        </div>
      </template>
    </navbar>
    <el-row type="flex" class='grid'>
      <el-col :span="4"></el-col>
      <el-col :span="16">
        <div id='article'>
            <div v-if='articleList.length == 0' class='none_article'>
              当前无内容
            </div>
            
            <div class='article_list_content' v-for='article in articleList' :key='article._id'>
              <router-link :to="{name:'article',params:{id:article._id}}">
                <el-container class='article'>
                    <el-header class='article_head'>{{article.title}}</el-header>
                    <el-main class='article_content' v-html='article.content'></el-main>
                    <el-footer class='article_info'>
                    <span>发布日期 {{article.create_at}}</span>
                    <span>  |  留言 {{article.comment.length}}</span>
                    <span>  |  浏览次数 {{article.views}}</span>
                    <span>  |  赞 {{article.like}}</span>
                    </el-footer>
                </el-container>
                </router-link>
            </div>
            <el-pagination :page-size='5' layout="prev, pager, next" :total="page" @current-change='changePage' background style='margin-bottom:20px;margin-top:10px;'>
            </el-pagination>
        </div>
      </el-col>
      <el-col :span="2">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navbar from '../../components/navbar.vue'
import articleList from './articleList.vue'
export default {
  name: 'home',
  components: {
    navbar,
    articleList,
  },
  data(){
    return{
      userCookie:'',
      title:'',
      content:'',
      articleList:[],
      page:0,
      avatar:'',
    }
  },
  created(){
    this.$http.get('/articleCount').then((res)=>{
            this.page = res.data.length
            console.log(res.data)
        })
    this.getData(0)
      this.$http({
      method:'GET',
      withCredentials: true,
      url:'/checkLogin'
    }).then((res)=>{
      if(res.data.code==200){
        this.userCookie = res.data.message
        this.$store.username = res.data.message.username
      }
    })
  },
  methods:{
    changePage(pages){
      this.getData(pages-1)
    },
    getData(pages){
      this.$http({
          url:'/getArticle',
          method:'POST',
          headers:{
              'Content-Type' : 'application/x-www-form-urlencoded'
          },
          data:{
              page:pages,
              limit:5,
              skip:5,
          }
          }).then((res)=>{
              this.articleList = res.data
              })
          },
    logout(){
      this.$http({
        method:'POST',
        withCredentials:true,
        url:'/logout'
      }).then(()=>{
        this.userCookie = !this.userCookie
        this.$store.commit('init')
      })
    },
    clickBtn(){
      this.$socket.emit('msg','123')
    }
    },
    sockets:{
      connect:function(){
        console.log('socket connected')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .home{
    a{
      color:rgb(22, 22, 22);
      text-decoration: none;
    }
    background: rgb(230,230,230);
    min-height:500px;
    .status_bar{
      margin-top:15px;
      font-size:1.2em;
      a{
        color:#67C23A;
        &:hover{
          cursor: pointer;
        }
      }
    }
    .none_article{
      background: white;
      height: 170px;
      text-align: center;
      padding-top: 130px;
      margin-top:5px;
    }
    .navbar{
      background: rgb(220, 220, 220);
    }
      .grid{
      margin-top:50px;
    }
    #article{
        width:100%;
        border-radius:10px;
        el-menu-time{
            width:100px;
        }
        .article_list_content{
            .article{
                margin-top:5px;
                text-align:left;
                width:100%;
                height:300px;
                background:white;
                .article_head{
                    padding-top:25px;
                    font-size:1.5em;
                }
                .article_content{
                    padding-top:30px;
                    padding-left:20px;
                }
                .article_info{
                  padding-top:25px;
                  font-size:0.9em;
                }
            }
        }
    }
  }
</style>

