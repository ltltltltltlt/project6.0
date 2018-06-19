var express = require('express');
var router = express.Router();
var Student = require('../models/student.js');
var Teacher = require('../models/teacher.js');
var Admin = require('../models/admin.js');
var crypto = require('crypto');

var newUser;
var userRole;





//注册新用户
router.post('/register', function(req, res, next){

  var params = req.body;
  console.log(params);

  //对密码进行加密
  var pwd = params.password;
  md5 = crypto.createHash('md5');
  //digest()是crypto加密模块中的一个方法，用来计算传入数据的摘要值，参数是编码方式，可以有 'hex'、'binary'或者'base64'
  pwd = md5.update(pwd).digest('hex');





  //判断要注册的身份是学生，老师还是管理员
  if(params.role == 'student'){
    //调用用户的构造函数
     newUser = new Student({
        username: params.username,
        email: params.email,
        //要保存加密之后的密码
        pwd: pwd

    });
    userRole = Student;

  }else if(params.role == 'teacher'){
    //调用用户的构造函数
     newUser = new Teacher({
        username: params.username,
        email: params.email,
        //要保存加密之后的密码
        pwd: pwd

    });
    userRole = Teacher;

  }else if(params.role == 'admin'){
    //调用用户的构造函数
     newUser = new Admin({
        username: params.username,
        email: params.email,
        //要保存加密之后的密码
        pwd: pwd

    });
    // userRole = Admin;

  }




  //检查用户名是否已被注册
  newUser.getUserNumByUsername(newUser.username, function(err, UsernameResults){
    if(UsernameResults != null && UsernameResults[0]['num'] > 0){
        err = '用户名已被注册';
    }
    if(err){
        res.locals.error = err;
        res.json({'status':'1001','err':err});
        return;
    }else{
        //检查邮箱是否已经被注册
        newUser.getUserNumByEmail(newUser.email, function(err, EmailResults){

            if (EmailResults != null && EmailResults[0]['num'] > 0){
                err = '邮箱已被注册';
            }
            if(err){
                res.locals.error = err;
                res.json({'status':'1002','err':err});
            }else{

              //保存新用户信息，头像，等级，星星数目,性别以及通关数目都默认设置为初始值
              newUser.save(function(err, result){
                if(err){
                  res.locals.error = err;
                  res.sendStatus(404);
                  return;
                }else{
                  //保存了新用户之后还要初始化代码表，插入相应的第一关和第一关的默认代码
                  newUser.InitCodeByUsername(params.role, newUser.username, function(err,result){
                    if(err){
                      res.json({'status':'-1','err':err});
                    }
                    //res.json({'status':'1000','success':'注册成功'});
                    //保存完直接登录
                    newUser.getUserByUsername(params.role, newUser.username, function(err, result){
                      res.json({'user':result[0],'status':'1000','msg':'注册并登录成功'});
                    });
                  });
                }
              });  
            }
        });
    }
  });
});

//用户登录
router.post('/login', function(req, res){
  var params = req.body;
  console.log(params);

  isRem = params.isRem;
  console.log(isRem);

  //判断要登录的身份是学生，老师还是管理员
  if(params.role == 'student'){
    userRole = Student;
  }else if(params.role == 'teacher'){
    userRole = Teacher;
  }else if(params.role == 'admin'){
    userRole = Admin;
  }

  userRole.prototype.getUserByEmail(params.role, params.email, function (err, result){

    //检查用户是否存在
    if(result == '')
    {
      //res.locals.error= '邮箱有误';
      res.json({'status':'2001','msg':'邮箱有误'});
    } else {

        //对密码进行加密
        var pwd = params.password;
        md5 = crypto.createHash('md5');
        //digest()是crypto加密模块中的一个方法，用来计算传入数据的摘要值，参数是编码方式，可以有 'hex'、'binary'或者'base64'
        pwd = md5.update(pwd).digest('hex');

      //检查密码是否正确
      if(result[0].password != pwd){
        //res.locals.error = '密码有误';
        res.json({'status':'2002','msg':'密码有误'});
      }
      else{
		  
        //如果勾选了记住登录，将username和身份的值写入cookie,有效时间7天，即7*24*60*60*1000
        if(isRem)
        {
          res.cookie('login_name', result[0].username, { maxAge: 7*24*60*60*1000 });
          res.cookie('login_role', params.role, { maxAge: 7*24*60*60*1000 });
        }
        //写入session
         req.session.islogin = true;
         req.session.name = result[0].username;
         res.json({'user':result[0],'status':'2000','msg':'登录成功'});
      }
    }

  });



});




//注销登录
router.post('/logout',function(req, res){
  //清除session和cookie
  delete req.session;
  res.clearCookie('login_name');
  res.clearCookie('login_role');
  res.json({'status':'3000','msg':'退出登录成功'});
});



module.exports = router;
