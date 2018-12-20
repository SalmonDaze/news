<template>
    <div class='container'>
        <vaild-form title='修改资料' :formHeight='600'>
            <template slot='body' style='float:'>
                <div style='text-align:left;margin-left:180px;'>
                    <div style='margin-top:30px;'>
                        <span>用户名：</span><el-input
                            :placeholder="name"
                            :disabled="true" style='width:150px;'>
                            </el-input>
                            <p style='margin-top:20px;'>
                                <span>UID：</span>{{UID}}
                            </p>
                            <p style='margin-top:20px;'>
                                <span>注册日期：</span>{{createAt.slice(0,createAt.indexOf('T'))}}
                            </p>
                            <p style='margin-top:20px;'>
                                <span>当前用户组：</span>{{ admin ? '管理员' : '普通用户'}}
                            </p>
                            <div class='sex_group'>
                                <span>请选择性别：</span>
                                <el-radio v-model="sex" label="male">男</el-radio>
                                <el-radio v-model="sex" label="female">女</el-radio>
                            </div>
                            <div>
                                <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                    </div>
                </div>
            </template>
        </vaild-form>
    </div>
</template>
<script>
import vaildForm from '../components/vaildForm.vue'
import { api } from '../api.js'
import { mapState } from 'vuex'
export default {
    name: 'reviseInfo',
    components:{
        vaildForm
    },
    data(){
        return{
            sex:'',
            name:'',
            UID:'',
            createAt:'',
            avatar: '',
            admin: '',
        }
    },
    methods:{
        async getInfo(){
            let res = await api.post('http://localhost:3000/api/getUser', {username: this.username})
            this.name = res[0].name
            this.UID = res[0].ID
            this.createAt = res[0].createAt
            this.avatar = res[0].avatar
            this.sex = res[0].sex
            this.admin = res[0].admin
        }
    },
    created(){
        this.getInfo()
    },
    computed:mapState({
        username: state => state.username
    })
}
</script>
<style lang="scss" scoped>
.container{
    background:skyblue;
    width:100%;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sex_group{
    margin-top:20px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #272727;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 2px dashed #cecccc;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    margin-top:20px;
  }
  .avatar-uploader-icon:hover{
    border-color: #409EFF;
  }
  .avatar {
    border: 1px dashed #272727;
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
