<template>
    <div class='container'>
        <vaild-form title='修改资料' :formHeight='600'>
            <template slot='body'>
                <div class='sex_group'>
                    
                    <el-radio v-model="sex" label="male">男</el-radio>
                    <el-radio v-model="sex" label="female">女</el-radio>
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
</style>
