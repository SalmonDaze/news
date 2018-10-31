<template>
    <div>
        empty page
        <router-link :to="{path:'/'}">home</router-link>
        <br/>
        <span>标题</span>:<input type='text' placeholder="请输入标题" v-model="title">
        <br/>
        <span>内容</span>:<input type='text' placeholder="请输入内容" v-model="content">
        <input type="button" value='提交' @click='postArticle'>
        <br/>
        <button @click='getData'>获得用户数据</button>
        <ul v-if='showList'>
            <li v-for='user in userList' :key='user._id'>
                <div>用户名 : {{user.username}}</div>
                <div v-for='arti in user.posts' :key='arti._id'>
                    发表主题 : {{arti.title}}
                    内容 : {{arti.content}}
                </div>
                <hr/>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex'
export default{
    name:'page',
    data(){
        return{
            userList:[],
            title:'',
            content:'',
            showList:false,
        }
    },
    created(){
        this.$http({
            url:'http://localhost:3000/api/getUser',
            method:'GET',
            headers:{
            'Content-Type' : 'application/x-www-form-urlencoded'
            },
        }).then(res=>{
                this.userList = res.data.data
        })
    },
    computed:mapState([
        '_id'
    ]),
    methods:{
        ...mapMutations([
            'logout'
        ]),
        postArticle: function(){
            let title = this.title
            let content = this.content
            this.$http({
                url:'http://localhost:3000/api/postArticle',
                method:'POST',
                data:{
                    title:title,
                    content:content,
                    _id:this._id
                },
                headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
                },
            }).then((res)=>{
                console.log(res)
            })
        },
        getData: function(){
            this.$http({
                url:'http://localhost:3000/api/getData',
                method:'GET',
                headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
                },
            }).then((res)=>{
                this.userList = res.data.doc
                this.showList = !this.showList
            })
        }
    }
}    
</script>
<style>

</style>
