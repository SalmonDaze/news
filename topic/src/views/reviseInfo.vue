<template>
    <div class='container'>
        <vaild-form title='修改资料' formHeight='600'/>
    </div>
</template>
<script>
import vaildForm from '../components/vaildForm.vue'
export default {
    name: 'reviseInfo',
    components:{
        vaildForm
    },
    data(){
        return{
            sex:'',
            
        }
    },
}
</script>
<style lang="scss" scoped>
.container{
    background:skyblue;
    width:100%;
    height:100vh;
    padding-left:25%;
}
</style>
