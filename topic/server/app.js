const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database.js').connection
const router = express.Router()
const jwt = require('jsonwebtoken')
const fs = require('fs')
const multer = require('multer')

const SECRET = 'testjsonwebtoken'

let upload = multer({
    dest: './uploads'
})

app.set('secret', SECRET)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080")
    res.header("Access-Control-Allow-Headers", "*")
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})

let Sql = {
    addSql: 'INSERT INTO user(name, createAt, sex, avatar, admin ,password) VALUES(?,?,?,?,?,?)',
    getUserById : 'SELECT * From user WHERE name = ?',
    queryAll: 'SELECT * FROM user',
    updateSql: 'UPDATE user SET avatar = ? WHERE name = ?',
    updataInfoSql: 'UPDATE user SET sex = ? WHERE name = ?'
}

let resmsg = function(code, data, message = '返回成功'){
    let res = {
        code: code,
        data: data,
        message: message
    }
    return res
}

function formatTime(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${year}-${month}-${day}`
}

router.use(function(req, res, next) {
    var token = req.header('Authentication-token');
    if (token) {      
        
        jwt.verify(token, app.get('secret'), function(err, decoded) {      
              if (err) {
            return res.status(401).json({msg:{false:true,message:'token失效'}});    
              } else {
                
                req.decoded = decoded;  
                next();
          }
        });
      } else {
        next()
      }
});

router.post('/register', function(req, res){
    let data = JSON.parse(Object.keys(req.body)[0])
    if(/^[a-zA-Z0-9]{4,16}$/.test(data.account)){
        if( data.password === data.repassword ){
            let addParams = [data.account, formatTime(), 'male', data.avatar, 0, data.password]
            connection.query('select name from user', (err, rows, fields)=>{
                if(err) throw err
                let flag = false
                for(let i=0;i<rows.length;i++){
                    if(data.account == rows[i].name){
                        res.json(resmsg(1, null, '用户名已被注册'))
                        flag = true
                        return
                    }
                }
                if(!flag){
                    connection.query(Sql.addSql,addParams, (err, rows, fields)=>{
                        if(err) throw err
                        res.json(resmsg(200, null, '注册成功！'))
                    })
                }
            })
            
        }else{
            res.json(resmsg(1, null, '两次密码不一致！'))
        }
        
    }else{
        res.json(resmsg(1, null, '失败'))
    }
})

router.post('/login', function(req, res){
    let data = JSON.parse(Object.keys(req.body)[0])
    let flag = false
    connection.query('select name, password from user', (err, rows, fields)=>{
        if(err) throw err
        for(let i = 0 ; i < rows.length ; i++){
            if( rows[i].name === data.account ){
                if( rows[i].password === data.password){
                    flag = true
                }
            }
        }
        if(flag){
            let token = jwt.sign(data, app.get('secret'), {
                expiresIn : 60*60*24
            })
            res.json({msg:resmsg(200, {token: token}, '欢迎登陆！')})
            return
        }
        res.json({msg:resmsg(1, {}, '账号或者密码错误！')})
    })
})

router.post('/getUser', function(req, res){
    console.log(req.body)
    let data = JSON.parse(Object.keys(req.body)[0])
    connection.query(Sql.getUserById, [data.username], (err, rows, fields)=>{
        
        if(err) throw err

        res.sendFile( __dirname + '/uploads' + data.username + '.jpg' )
        res.json(rows)
    })
})

router.post('/getUserAvatar', function(req, res){
    let data = JSON.parse(Object.keys(req.body)[0])
    connection.query(Sql.getUserById, [data.username], (err, rows, fields)=>{
        if(err) throw err
        fs.readFile(__dirname + '/uploads/' + data.username + '.jpg', (err,sres)=>{
            if(err) {
                fs.readFile(__dirname + '/uploads/default.jpg', (err, rres)=>{
                    res.send(new Buffer(rres).toString('base64'))
                })
            }else{
            res.send(new Buffer(sres).toString('base64'))
            console.log(sres)
            }
        })

        
    })

})

router.post('/uploadAvatar', upload.single('imageFile'), function(req, res){
    let name = req.body.username
    fs.rename(req.file.path, 'uploads/' + name + '.jpg', function(err){
        if(err) throw err

        connection.query(Sql.updateSql, [`uploads/${name}.jpg`, name], (err, rows, fields)=>{
            if(err) throw err

            res.sendFile( __dirname + '/uploads/' + name + '.jpg' )
            res.json(rows)
            
            console.log('修改成功！')
        })
    })
})

router.post('/updateInfo', function(req, res){
    let data = JSON.parse(Object.keys(req.body)[0])
    connection.query(Sql.updataInfoSql, [data.sex, data.username], (err, rows)=>{
        if(err) throw err
        res.json(resmsg(200, {}, '修改成功！'))

    })
})

app.use('/api', router)

app.listen(3000,()=>{
    console.log('服务器已运行')
})