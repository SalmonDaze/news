const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const router = express.Router()
let Schema = mongoose.Schema

const SECRET = 'badapple'

mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true})


let User = mongoose.model('User',new Schema({
    username: String,
    password: String,
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }],
}))

let Post = mongoose.model('Post',new Schema({
    poster:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title: String,
    content: String,

}))

router.post('/postArticle',(req,res,next)=>{
    let req_info = JSON.parse(Object.keys(req.body)[0])
    console.log(req_info)
    //存入发送者的_id 以便关联查询
    Post.create({title:req_info.title,content:req_info.content,poster:req_info._id}).then(result=>{
        console.log(result)
        User.findOne({_id:req_info._id}).then(doc=>{
            doc.posts.push(result._id)
            doc.save()
        })
        res.json({
            code:200,
            message:'发送成功！'
        })
    })
})

router.get('/getData',(req,res,next)=>{
    User.find({}).populate({path:'posts',select:{title:1,content:1}}).exec((err,doc)=>{
        if(err) console.log(err)
        res.json({
            code:200,
            message:'查询成功!',
            doc:doc
        })
    })
})



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
                expiresIn : 60*60*24// 授权时效24小时
          });
            res.json({message:'欢迎使用API',token:token,user:doc})
        }
    })
    
})

router.use(function(req, res, next) {
    var token = req.header('Authentication-token');
    if (token) {      
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token, app.get('secret'), function(err, decoded) {      
              if (err) {
            return res.status(401).json({false:true,message:'token失效'});    
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
