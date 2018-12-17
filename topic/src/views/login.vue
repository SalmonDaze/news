<template>
    <div class='login_content'>
        <vaild-form class='vaild-form' title='用户登陆' :form-height=400>
            <template slot='body'>
                <div class='form_account'>
                    <span>用户名 : </span><el-input v-model="account" placeholder="请输入账号"></el-input>
                </div>
                <div class='form_passwd'>
                    <span>密 码 : </span><el-input v-model="password" placeholder="请输入密码"></el-input>
                </div>
                <el-button type="primary" class='login_btn'>登陆</el-button>
            </template>
            <template slot='footer'>
                <router-link :to="{name:'register'}" class='link_login'>还没账号？立刻注册</router-link>
                <span style='margin-left:10px;margin-right:10px;'>/</span>
                <router-link :to="{name:'home'}" class='link_login'>返回首页</router-link>
            </template>
        </vaild-form>
    </div>
</template>
<script>
import vaildForm from '../components/vaildForm.vue'
export default {
    name: 'login',
    data(){
        return{
            account:'',
            password:''
        }
    },
    components:{
        vaildForm,
    }
}
</script>
<style lang="scss" scoped>
.login_content{
    width:100%;
    height:100vh;
    background:url(../../assets/lr_background.jpg);
    display: flex;
    justify-content: center;
    align-items:center;
}
.vaild-form{
    width:500px;
    margin:0 auto;
    font-size:1.2rem;
    margin-top:50px;
    .form_passwd{
        margin-top:30px;
    }
    .el-input{
        margin-left:10px;
        width:300px;
    }
    .login_btn{
        margin-top:40px;
        width:200px;
        height:50px;
        margin-bottom: 30px;
    }
    .link_login{
        text-decoration: none;
        color:#409EFF;
    }
}
</style>
