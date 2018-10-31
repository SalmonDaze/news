const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = express.Router()

const SECRET = 'badapple'

mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true})

let Schema = mongoose.Schema

let User = mongoose.model('user',new Schema({
    username: String,
    password: String,
}))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
})

app.set('secret',SECRET)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



app.post('/register',function(req,res){
    let userInfo = (JSON.parse(Object.keys(req.body)[0]))
    User.create({username:userInfo.username,password:userInfo.password}).then(()=>{
        res.json({
            message:'创建成功',
            token:token
        })
    })
}) 

app.post('/login',(req,res)=>{
    let userInfo = (JSON.parse(Object.keys(req.body)[0]))
    User.findOne({username:userInfo.username,password:userInfo.password}).then((doc)=>{
        if(!doc) res.json({message:'账户或密码错误'})
        else{
            let token = jwt.sign(userInfo, app.get('secret'), {
                expiresIn : 10// 授权时效24小时
          });
            res.json({message:'欢迎使用API',token:token,user:doc})
        }
    })
    
})

router.use(function(req, res, next) {
    // 拿取token 数据 按照自己传递方式写
    var token = req.header('Authentication-token');
    if (token) {      
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token, app.get('secret'), function(err, decoded) {      
              if (err) {
            return res.json({ false: true, message: '无效的token.' });    
              } else {
                // 如果验证通过，在req中写入解密结果
                req.decoded = decoded;  
                //console.log(decoded)  ;
                next(); //继续下一步路由
          }
        });
      } else {
        // 没有拿到token 返回错误 
        return res.json({code:1,message:'未找到'})
      }
});

router.get('/getUser',function(req,res,next){
    User.find({}).then((doc)=>{
        res.json({
            message:'查找成功',
            data:doc
        })
    })
})



app.use('/api',router)

app.listen(3000)