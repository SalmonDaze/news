<template>
    <div>
        empty page
        <router-link :to="{path:'/'}">home</router-link>
        <br/>
        {{userList}}
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default{
    name:'page',
    data(){
        return{
            userList:[]
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
            if(res.data.false){
                this.logout()
                this.$router.push({path:'/'})
            }else{
                this.userList = res.data.data
            }
        })
    },
    methods:{
        ...mapMutations([
            'logout'
        ])
    }
}    
</script>
<style>

</style>
