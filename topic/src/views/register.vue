<template>
    <div class='register_content'>
        <vaild-form title='用户注册' :formHeight=460 >
            <template slot='body'>
                <div class='form_account'>
                    <span>账 号 : </span><el-input v-model="account" placeholder="请输入账号"></el-input>
                </div>
                <div class='form_passwd'>
                    <span>密 码 : </span><el-input type='password' v-model="passwd" placeholder="请输入密码"></el-input>
                </div>
                <div class='form_repasswd'>
                    <span>确认密码 : </span><el-input type='password' v-model="repasswd" placeholder="请输入密码"></el-input>
                </div>
                <el-button type="primary" class='register_btn' @click='register'>注册</el-button>
            </template>
            <template slot='footer'>
                <router-link :to="{name:'login'}" class='link-login'>已有账号，立刻登陆</router-link>
                <span style='margin-left:10px;margin-right:10px;'>/</span>
                <router-link :to="{name:'home'}" class='link-login'>返回首页</router-link>
            </template>
        </vaild-form>
    </div>
</template>
<script>
import vaildForm from '../components/vaildForm.vue'
import { api } from '../api.js'
export default {
    name: 'register',
    components:{
        vaildForm
    },
    data(){
        return{
            account:'',
            passwd:'',
            repasswd:'',
        }
    },
    methods:{
        async register(){
            let data = {
                account: this.account,
                password: this.passwd,
                repassword: this.repasswd,
                avatar:'uploads/default.jpg'
            }
            let res = await api.post('http://localhost:3000/api/register', data)
            if(res.code === 1){
                this.$message({
                    type:'error',
                    showClose: true,
                    message: res.message
                })
            }else{
                this.$message({
                    type:'success',
                    showClose: true,
                    message: res.message
                })
                this.$router.push('/login')
            }
        }
    },
    directives:{
        focus:{
            inserted: function(el){
                el.focus()
                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.register_content{
    background: url(../../assets/register_background.jpg);
    width:100%;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-input{
        width:300px;
        margin-left:10px;
    }
    .form_passwd{
        margin-top:30px;
    }
    .form_repasswd{
        margin-left:-27px;
        margin-top:30px;
    }
    .register_btn{
        margin-top:40px;
        width:200px;
        height:50px;
        margin-bottom: 30px;
    }
    .link-login{
        text-decoration: none;
        color:#409EFF;
        margin-top: 50px;
        font-size:1.2rem;
    }
}
</style>
