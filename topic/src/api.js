import axios from 'axios'

const api = {
    async get(url, data){
        try{
            let res = await axios.get(url, {params: data})
            res = res.data
            return new Promise((resolve, reject)=>{
                if (res.code === 0){
                    resolve(res)
                }else{
                    resolve(res)
                }
            })
        }catch(err){
            console.log(`服务器出错，出错信息${err}`)
        }
    },
    async post(url, data){
        try{
            let res = await axios({
                url: url,
                data: data
            })
            res = res.data
            return new Promise((resolve, reject)=>{
                if( res.code === 0 ){
                    resolve(res)
                }else{
                    resolve(res)
                }
            })
        }catch(err){
            console.log(`服务器出错，出错信息${err}`)
        }
    }
}

export { api }