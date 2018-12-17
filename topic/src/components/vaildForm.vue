<template>
    <div class='form_container' :style="{height:formHeight + 'px'}">
        <div class='form_title'>
            {{title}}
        </div>
        <div class='hr'></div>
        <div class='form_body'>
            <slot name='body'></slot>
        </div>
        <div class='form_footer'>
            <slot name='footer'></slot>
        </div>
    </div>
</template>
<script>
export default {
    name:'vaildForm',
    props:{
        title:{
            type: String,
            default:'表单'
        },
        formHeight:{
            type: Number,
            default: 400
        }
    }
}
</script>
<style lang="scss" scoped>
.form_container{
    background:white;
    width:600px;
    border-radius: 10px;
    box-shadow: 2px 10px 3px 1px #313131;
    padding-top:20px;
    .form_title{
        font-size:2rem;
        letter-spacing: 8px;
    }
    .hr{
        width:90%;
        height:3px;
        background: skyblue;
        margin-left:25px;
        margin-top:20px;
    }
    .form_body{
        margin-top:40px;
    }
}

</style>
