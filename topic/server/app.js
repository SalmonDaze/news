const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const router = express.Router()

app.get('/hello',(req, res)=>{
    res.send('Hello World')
})

app.listen(3000,()=>{
    console.log('服务器已运行')
})