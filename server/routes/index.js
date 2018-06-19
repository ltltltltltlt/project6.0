var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  //判断是否有cookie,若是存在cookie的话就改写session的name的值,并将session的登录标志改成true
  if(req.cookies.login_name)
  {
    console.log('cookies:' + req.cookies.login_name);
    req.session.name = req.cookies.login_name;
    req.session.islogin = true;
    res.json({'status':'2000', 'msg':'已经登录'});
  }
  //判断是否有session,若是存在session的话就直接返回‘已经登录’的信息
  if(req.session.islogin)
  {
    console.log('session:' + req.session.name);
     res.json({'status':'2000', 'msg':'已经登录'});
  }
  //cookie和session都没有的话就直接返回‘未登录‘信息
  res.json({'status':'1000', 'msg':'未登录，请登录'});
});







module.exports = router;
