let express = require('express')
let router = express.Router()
let Model = require('../data/module')

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

router.post('/register',(req,res,next)=>{
    let info = JSON.parse(Object.keys(req.body)[0])
    let username = info.username
    let password = info.password
    Model.User.findOne({username:username}).then((userInfo)=>{
        if(userInfo){
            res.json({
                code:1,
                message:'用户名已被注册'
            })
            return
        }else{
            Model.User.create({
                username: username,
                password: password
            }).then((newUserInfo)=>{
                res.cookie('name','pepsi',{maxAge:600000})
                res.json({
                    code:200,
                    message:'注册成功'
                })
            })
        }
    })
})
router.post('/login',(req,res,next)=>{
    let info = JSON.parse(Object.keys(req.body)[0])
    let username = info.username
    let password = info.password
    let userInfo = {
        username: username,
        password: password
    }
    Model.User.findOne({username:username,password:password}).then((userInfo)=>{
        if(!userInfo){
            res.json({
                code:1,
                message:'账号或者密码错误'
            })
            return
        }else{
            res.cookie('userInfo',userInfo,{maxAge:600000000})
            res.json({
                code:200,
                message:'登陆成功',
                userInfo: userInfo,
            })
        }
    })
})
router.get('/checklogin',(req,res,next)=>{
    if(req.cookies.userInfo){
        res.json({
            code:200,
            message:req.cookies.userInfo
        })
    }else{
        res.json({
            code:1,
            message:'未登陆'
        })
        return
    }
})
router.get('/logout',(req,res,next)=>{
    res.clearCookie('userInfo')
    res.json({
        code:200
    })
})
module.exports = router