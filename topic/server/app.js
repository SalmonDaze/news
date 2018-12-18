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

router.post('/register', function(req, res){
    console.log(req.body)
    res.json({
        code:200,
        message:'通过'
    })
})

app.use('/api', router)

app.listen(3000,()=>{
    console.log('服务器已运行')
})