<template>
    <div class='container'>
        <input type="file" @change='handleFile'>
        <div ref='form_list' style='margin-top:50px;position:absolute;'>

        </div>
    </div>
</template>
<script>
import xlsx,{ readFile } from 'xlsx'
export default {
    name: 'CRM',
    data(){
        return{

        }
    },
    created(){
        console.log(xlsx)
    },
    methods:{
        handleFile(e){
            let _this = this
            let files = e.target.files
            let f = files[0]
            let reader = new FileReader()
            reader.readAsArrayBuffer(f)

            reader.onload = (e) => {
                let data = new Uint8Array(reader.result)

                let wb = xlsx.read(data, {type: 'array'})

                let htmlstr = xlsx.write(wb, { type: 'string', bookType: 'html'})

                _this.$refs.form_list.innerHTML = htmlstr
                console.log(htmlstr)
            }
            
        },
    }
}
</script>
<style lang="scss" scoped>
.container{
    width:100%;

    display: flex;
    justify-content: center;
    align-content: center;
}
</style>
