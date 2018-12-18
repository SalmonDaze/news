const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database.js').connection
const router = express.Router()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})

let resmsg = function(code, data, message = '返回成功'){
    let res = {
        code: code,
        data: data,
        message: message
    }
    return res
}

router.post('/register', function(req, res){
    let data = JSON.parse(Object.keys(req.body)[0])
    if(/^[a-zA-Z0-9]{4,16}/.test(data.account)){
        console.log('匹配')
    }else{
        res.json(resmsg(1, null, '失败'))
    }
})

router.post('/login', function(req, res){

})

app.use('/api', router)

app.listen(3000,()=>{
    console.log('服务器已运行')
})