var express = require('express');
var router = express.Router();
var sqlMap = require('../sqlMap');
var pool = require('../dbPool.js');
var crypto = require('crypto');
//var async = require('async');




//更改头像
router.post('/saveAlt', function(req, res,next) {
  var params = req.body;
  console.log(params);
 	pool.getConnection(function(err, connection){
	  sql = eval("sqlMap." + params.role + ".saveAlt_Sql");
    connection.query( sql, [params.icon, params.username], function(err){
			if(err){
				console.log(" saveAlt_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'保存头像失败'});
			}else{
				console.log(" saveAlt succeed");
				res.json({'status':'1','msg':'保存头像成功'});
			}
    });
    connection.release();
  });
});


//由用户名和身份以及关卡数获得该关卡的代码
router.post('/queryLevelChapter', function(req, res, next) {
  var params = req.body;
  console.log(params);
	pool.getConnection(function(err, connection){  
		//由身份和用户名和关卡获得对应关卡的代码
		sql = eval("sqlMap.code.getChapterCodeByRoleUsernameChapter_Sql");
		connection.query( sql, [params.role, params.username, params.chapter], function(err, result){
			if(err){
				console.log(" getChapterCodeByRoleUsernameChapter_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'获取相应关卡的代码失败'});
			}else{
				console.log(" getChapterCodeByRoleUsernameChapter succeed");	
				res.json({'chapterCode': result[0].chapterCode, 'status':'1','msg':'获取相应关卡的代码成功'});
			}
		});
    connection.release();
   });
});


//由用户名和身份获得已经过关的关卡数
/*router.post('/queryChapter', function(req, res, next) {
  var params = req.body;
  console.log(params);
	pool.getConnection(function(err, connection){
	    sql = eval("sqlMap.code.getChapterNumByRoleUsername_Sql");
      connection.query( sql, [params.role, params.username], function(err, result){
        if(err){
          console.log(" getChapterNumByRoleUsername_Sql Error: " + err.message);
          res.json({'status':'-1','msg':'获取关卡数失败'});
        }else{
	
					//输出查询数据库关卡数目成功语句
					console.log(" getChapterNumByRoleUsername succeed");
					
					//存在关卡数，再次查询获得相对应的关卡代码
					//保存总共已经过了的关卡数,因为是从第0关开始，我们要查询到第（总数-1）关的代码
					var chapterResult = result[0].num - 1;
			    //由身份和用户名和关卡获得对应关卡的代码
			    sql = eval("sqlMap.code.getChapterCodeByRoleUsernameChapter_Sql");
          connection.query( sql, [params.role, params.username,chapterResult], function(err, result){
		        if(err){
							console.log(" getChapterCodeByRoleUsernameChapter_Sql Error: " + err.message);
							res.json({'status':'-1','msg':'获取相应关卡的代码失败'});
			    	}else{
							console.log(" getChapterCodeByRoleUsernameChapter succeed");	
							res.json({'chapterNum': chapterResult, 'chapterCode': result[0].chapterCode, 'status':'1','msg':'获取相应关卡的代码成功'});
			      }
		    	});
        }
      });
    connection.release();
   });
});*/

//由用户名和身份获得已经过关的关卡数
router.post('/queryChapter', function(req, res, next) {
  var params = req.body;
  console.log(params);
	pool.getConnection(function(err, connection){
	  sql = eval("sqlMap.code.getCurrentPassChapterByUsername_Sql");
      connection.query( sql, [params.username], function(err, result){
        if(err){
          console.log(" getCurrentPassChapterByUsername_Sql Error: " + err.message);
          res.json({'status':'-1','msg':'获取关卡数失败'});
        }else{
	
		  //输出查询数据库关卡数目成功语句
		  console.log(" getCurrentPassChapterByUsername succeed");
		  res.json({'status':'1','msg':'获取相应关卡的代码成功'});
        }
      });
    connection.release();
   });
});


//保存新关卡的代码
router.post('/saveCode', function(req, res, next) {
  var params = req.body;
  console.log(params);	
	pool.getConnection(function(err, connection){
	  //先对数据库是否存在对应关卡进行查询
	  sql = eval("sqlMap.code.getNumByRoleUsernameChapter_Sql");
    connection.query( sql, [params.role, params.username, params.chapter], function(err,result){
			if(err){
				console.log(" getNumByRoleUsernameChapter_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'查询数据库是否存在相应的关卡失败'});
			}else if(result[0].num == '0'){
				//输出查询成功语句
				console.log(" getNumByRoleUsernameChapter succeed,no result");
				//数据库中不存在相应的关卡,就插入相对应的关卡以及代码
				sql = eval("sqlMap.code.insertCodeByRoleUsernameChapter_Sql");
				connection.query( sql, [params.role, params.username, params.chapter, params.chapterCode], function(err){
					if(err){
						console.log(" insertCodeByRoleUsernameChapter_Sql Error: " + err.message);
						res.json({'status':'-1','msg':'保存代码失败'});
					}else{
						console.log(" insertCodeByRoleUsernameChapter succeed");
						//保存代码成功之后要判别一下这是不是已经过了的关卡，没有玩过就加星星
						  if(params.alreadyPlay == "false"){
							//相对应的修改一下星星数量,成功就加3颗星，并且修改当前通过关卡数,通过这一关下一关就加一
							sql = eval("sqlMap." + params.role + ".updateStarCurrentPassChapterByUsername_Sql");
							var star = parseInt(params.star) + 3;
							connection.query( sql, [star,params.chapter-0+1, params.username], function(err){
								if(err){
									console.log(" updateStarCurrentPassChapterByUsername_Sql Error: " + err.message);
									res.json({'status':'-1','msg':'星星数目和当前通关关卡更新失败'});
								}else{
									console.log(" updateStarCurrentPassChapterByUsername succeed");
									res.json({'status':'1','msg':'相应关卡代码更新成功，星星数目和当前通关关卡更新成功','star':star});
								}
							})
						  }
						
					}
			    });
		    }else if(result[0].num == '1'){		
				//输出查询成功语句
				console.log(" getNumByRoleUsernameChapter succeed,has result");
				//数据库中存在相应的关卡,就更新相对应的关卡的代码
				sql = eval("sqlMap.code.updateChapterCodeByRoleUsernameChapter_Sql");
				connection.query( sql, [params.chapterCode, params.role, params.username, params.chapter], function(err){
					if(err){
						console.log(" updateChapterCodeByRoleUsernameChapter_Sql Error: " + err.message);
						res.json({'status':'-1','msg':'相应关卡代码更新失败'});
					}else{
						console.log(" updateChapterCodeByRoleUsernameChapter succeed");
					  //保存代码成功之后要判别一下这是不是已经过了的关卡，没有玩过就加星星
					  if(params.alreadyPlay == "false"){
						//相对应的修改一下星星数量,成功就加3颗星，并且修改当前通过关卡数,通过这一关下一关就加一
						sql = eval("sqlMap." + params.role + ".updateStarCurrentPassChapterByUsername_Sql");
						var star = parseInt(params.star) + 3;
						connection.query( sql, [star,params.chapter-0+1, params.username], function(err){
							if(err){
								console.log(" updateStarCurrentPassChapterByUsername_Sql Error: " + err.message);
								res.json({'status':'-1','msg':'星星数目和当前通关关卡更新失败'});
							}else{
								console.log(" updateStarCurrentPassChapterByUsername succeed");
								res.json({'status':'1','msg':'相应关卡代码更新成功，星星数目和当前通关关卡更新成功','star':star});
							}
						})
					  }
					}
				})		
			}else{
				//查询出来的结果是大于1的
				console.log(" getNumByRoleUsernameChapter failed,table named code has some row repeated");
				res.json({'status':'-1','msg':'数据库关卡重复'});
			}
		});  
    connection.release();
  });
});

//更改密码
router.post('/updatePass', function(req, res) {
    var params = req.body;
		console.log(params);
				
	  pool.getConnection(function(err, connection){
	  	
	  sql = eval("sqlMap." + params.role + ".getUserByUsername_Sql");
      connection.query( sql, [params.username], function(err, result){
        if(err){
          console.log(" getUserByUsername_Sql Error: " + err.message);
          res.json({'status':'-1','msg':'查询密码失败'});
        }else{
				//检查用户是否存在
				if(result == '')
				{
					res.json({'status':'-2','msg':'用户名有误'});
				}
				else{
					//对密码进行加密
					var pwd = params.password;
					md5 = crypto.createHash('md5');
					//digest()是crypto加密模块中的一个方法，用来计算传入数据的摘要值，参数是编码方式，可以有 'hex'、'binary'或者'base64'
					pwd = md5.update(pwd).digest('hex');
					
					
					//检查密码是否正确
					if(result[0].password != pwd){

					res.json({'status':'-3','msg':'原密码有误'});
					}else{
						/*密码正确，将新密码插入数据库*/
						
					
						//首先要将新的密码进行加密
						var npwd = params.newpass;
						md5 = crypto.createHash('md5');
						//digest()是crypto加密模块中的一个方法，用来计算传入数据的摘要值，参数是编码方式，可以有 'hex'、'binary'或者'base64'
						npwd = md5.update(npwd).digest('hex');    
				
						//新密码插入数据库
						sql = eval("sqlMap." + params.role + ".updatePass_Sql");
						connection.query( sql, [npwd, params.username], function(err){
							if(err){
								console.log(" updatePass_Sql Error: " + err.message);
								res.json({'status':'-4','msg':'密码修改失败'});
							}else{
								console.log(" updatePass succeed");
								res.json({'status':'1','msg':'密码修改成功'});
							}
						});				
					} 
				}
      }
    });
    connection.release();
   });
});


//加入教室
router.post('/JoinClass', function(req, res) {
	var params = req.body;
	console.log(params);			
	pool.getConnection(function(err, connection){
		//查询是否存在该教室
	  sql = eval("sqlMap.hasClass.getClassNameNumByClassName_Sql");
		connection.query( sql, [params.className], function(err, result){
			if(err){
				console.log(" getClassNameNumByClassName_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'查询存在该教室失败'});
			}else{
				//该教室不存在
				if(result[0].num == 0)
				{
					console.log(" getClassNameNumByClassName succeed,but this class exists");
					res.json({'status':'2','msg':'不存在该教室，请再次检查一下输入的教室名'});
				}
				//该教室存在
				else if((result[0].num == 1)){
					//将学生的用户名加入教室
					sql = eval("sqlMap.class.insertClassNameStudentName_Sql");
					connection.query( sql, [params.className, params.username], function(err){
						if(err){
							console.log(" insertClassNameStudentName_Sql Error: " + err.message);
							res.json({'status':'-1','msg':'学生加入教室失败'});
						}else{
							console.log(" insertClassNameStudentName succeed");
							res.json({'status':'1','msg':'学生加入教室成功'});
						}
					});	
				}
		    }
		});			
	    connection.release();
    });
});


//通过cookie进入的可以直接通过用户名和身份进行查询
router.post('/cookieQuery',function(req, res){
  var params = req.body;
  console.log(params);
  pool.getConnection(function(err, connection){
    sql = eval("sqlMap." + params.role + ".getUserByUsername_Sql");
    console.log(sql);
    connection.query( sql, [params.username], function(err,result){
		if(err){
			console.log(" getUserByUsername_Sql Error: " + err.message);
			res.json({'status':'-1','msg':'通过cookie获得信息失败'});
		}else{
			console.log(" getUserByUsername succeed");
			res.json({'status':'1','msg':'通过cookie获得信息成功','user': result[0]});
		}
    });
    connection.release();
  });
});



//更新用户信息
router.post('/updateInfo', function(req, res, next) {
	var params = req.body;
	console.log(params);
	pool.getConnection(function(err, connection){
		
		//保存原来的用户名，若是用户名进行修改了则赋予新用户名的值
		var username = params.username;
		
		//用户名有修改就查询新的用户名是否存在，若是不存在则进行更新
		if(params.newUsername != params.username){
			//若是用户名有修改，修改了旧的用户名之后用新的用户名进行其他信息的修改
			username = params.newUsername;
			//有修改就先判断新的用户名在数据库中是否已存在
			sql = eval("sqlMap." + params.role + ".getUserNumByUsername_Sql");
			connection.query( sql, [params.newUsername], function(err,UsernameResult){
				if(err){
					console.log(" getUserNumByUsername_Sql Error: " + err.message);
					res.json({'status':'-1','msg':'获得用户名失败'});
				}else if(UsernameResult[0].num == 1){
					//数据库中已经存在该新输入的用户名
					console.log(" getUserNumByUsername succeed,but username exists");
					res.json({'status':'2','msg':'该用户名已存在'});
				}else if(UsernameResult[0].num == 0){
					//数据库中不存在该新输入的用户名
					console.log(" getUserNumByUsername succeed");
					
					//新的用户名数据库中都不存在重复的，就开始进行修改用户名
					sql = eval("sqlMap." + params.role + ".updateInfoUsername_Sql");
					connection.query( sql, [params.newUsername,params.username], function(err){
						if(err){
							console.log(" updateInfoUsername_Sql Error: " + err.message);
							res.json({'status':'-1','msg':'资料用户名修改失败'});
						}else{
							console.log(" updateInfoUsername succeed");
						}

					});
					
				}
			});
		}
		
		//判断邮箱是否有修改
		if(params.newEmail != params.email){
			//开始查询邮箱是否存在相同的
			sql = eval("sqlMap." + params.role + ".getUserNumByEmail_Sql");
			connection.query( sql, [params.newEmail], function(err,EmailResult){
				if(err){
					console.log(" getUserNumByEmail_Sql Error: " + err.message);
					res.json({'status':'-1','msg':'获得邮箱失败'});
				}else if(EmailResult[0].num == 1){
					//数据库中已经存在该新输入的邮箱
					console.log(" getUserNumByEmail succeed,but username exists");
					res.json({'status':'3','msg':'该邮箱已经存在'});
				}else if(EmailResult[0].num == 0){
					//数据库中不存在该新输入的邮箱
					console.log(" getUserNumByEmail succeed");

					//新的用户名和邮箱在数据库中都不存在重复的，就开始进行修改
					sql = eval("sqlMap." + params.role + ".updateInfoEmail_Sql");
					connection.query( sql, [params.newEmail, username], function(err){
						if(err){
							console.log(" updateInfoEmail_Sql Error: " + err.message);
							res.json({'status':'-1','msg':'资料邮箱修改失败'});
						}else{
							console.log(" updateInfoEmail succeed");
							//res.json({'status':'1','msg':'资料修改成功'});
						}
					});	
				}
			});
		}
		//修改性别
		sql = eval("sqlMap." + params.role + ".updateInfoSex_Sql");
		//此处用params.username而不是用username这个定义好的变量的原因是：上面的异步操作比这个速度慢，还没修改好新的用户名就已经执行这里了，所以此处传的是旧的用户名
		//想要传递新的用户名也是可以的，采用if...else来判断，用括号让它等待新用户名更新完毕之后再进行性别的更新
		connection.query( sql, [params.sex, params.username], function(err){
			if(err){
				console.log(" updateInfoSex_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'资料性别修改失败'});
			}else{
				console.log(" updateInfoSex succeed");
				res.json({'status':'1','msg':'资料修改成功'});
			}
		});
	  connection.release();
	});
});









module.exports = router;