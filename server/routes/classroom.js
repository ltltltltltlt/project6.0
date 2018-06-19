var express = require('express');
var router = express.Router();
var sqlMap = require('../sqlMap');
var pool = require('../dbPool.js');
var crypto = require('crypto');


//增加教室
router.post('/addClass', function(req, res) {
	var params = req.body;
	console.log(params);			
	pool.getConnection(function(err, connection){		
		//先查询是否存在这个名字的教室	
		sql = eval("sqlMap.hasClass.getClassNameNumByClassName_Sql");
		connection.query( sql, [params.className], function(err, ExsitClassResult){
			if(err){
				console.log(" getClassNameNumByClassName_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'查询该教室是否存在失败'});
			}else if(ExsitClassResult[0].num == 1){
				//数据库中存在这个教室
				console.log(" getClassNameNumByClassName succeed,but this className has already exist");
				res.json({'status':'2','msg':'该教室存在,请重新输入别的教室名'});
			}else if(ExsitClassResult[0].num == 0){
				//数据库中不存在这个教室
				console.log(" getClassNameNumByClassName succeed");
				//就进行添加
	            sql = eval("sqlMap.hasClass.addClassName_Sql");
				connection.query( sql, [params.className, params.username, params.role], function(err, result){
					if(err){
						console.log(" addClassName_Sql Error: " + err.message);
						res.json({'status':'-1','msg':'添加教室失败'});
					}else{
						console.log(" addClassName succeed");
						res.json({'status':'1','msg':'添加教室成功'});
					}
				});
			}
		});
	    connection.release();
    });
});


//查询教室里面的学生信息
router.post('/getStudentInfo', function(req, res) {
	var params = req.body;
	console.log(params);			
	pool.getConnection(function(err, connection){		
	    sql = eval("sqlMap.class.getStudentInfoByClassName_Sql");
		connection.query( sql, [params.className], function(err, result){
			if(err){
				console.log(" getStudentInfoByClassName_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'获得教室学生信息失败'});
			}else{
				console.log(" getStudentInfoByClassName succeed");
                res.json({'status':'1','msg':'获得教室学生信息成功','studentInfo':result});
		    }
	    });
	    connection.release();
    });
});


//学生通过名字查询教室信息
router.post('/getClassInfo', function(req, res) {
	var params = req.body;
	console.log(params);			
	pool.getConnection(function(err, connection){		
	    sql = eval("sqlMap.class.getClassNameByusername_Sql");
		connection.query( sql, [params.username], function(err, result){
			if(err){
				console.log(" getClassNameByusername_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'获得教室名失败'});
			}else if(result == ''){
				console.log(" getClassNameByusername succeed");
                res.json({'status':'2','msg':'该学生没有教室','ClassName':''});
		    }else if(result != ''){
				console.log(" getClassNameByusername succeed");
                res.json({'status':'1','msg':'获得教室名成功','ClassName':result[0].className});
		    }
	    });
	    connection.release();
    });
});


//查询老师对应的教室id以及教室名字
router.post('/getClassName', function(req, res) {
	var params = req.body;
	console.log(params);			
	pool.getConnection(function(err, connection){		
	    sql = eval("sqlMap.hasClass.getClassIdClassNameByusername_Sql");
		connection.query( sql, [params.username, params.role], function(err, result){
			if(err){
				console.log(" getClassIdClassNameByusername_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'获得教室名字失败'});
			}else{
				console.log(" getClassIdClassNameByusername succeed");
                res.json({'status':'1','msg':'获得教室名字成功','classNameArr':result});
		    }
	    });
	    connection.release();
    });
});



//删除教室
router.post('/deleteClass', function(req, res) {
	var params = req.body;
	console.log(params);			
	pool.getConnection(function(err, connection){	
		//先查询是否存在这个名字的教室	
		sql = eval("sqlMap.hasClass.getClassNameNumByClassName_Sql");
		connection.query( sql, [params.className], function(err, ExsitClassResult){
			if(err){
				console.log(" getClassNameNumByClassName_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'查询该教室是否存在失败'});
			}else if(ExsitClassResult[0].num == 0){
				//数据库中存在这个教室
				console.log(" getClassNameNumByClassName succeed,but no this className");
				res.json({'status':'2','msg':'该教室不存在,请再次确认你输入的教室名'});
			}else if(ExsitClassResult[0].num == 1){
				//数据库中存在这个教室
				console.log(" getClassNameNumByClassName succeed");
		        //就开始在class表中删除这个教室	
				sql = eval("sqlMap.class.deleteClassByClassName_Sql");
				connection.query( sql, [params.className], function(err, result){
					if(err){
						console.log(" deleteClassByClassName_Sql Error: " + err.message);
						res.json({'status':'-1','msg':'删除教室失败'});
					}else{
						//删除了class表中的教室，还要删除教师表中对应的className字段
						sql = eval("sqlMap.hasClass.deleteClassByClassName_Sql");
						connection.query( sql, [params.className], function(err, result){
							if(err){
								console.log(" deleteClassByClassName_Sql Error: " + err.message);
								res.json({'status':'-1','msg':'删除老师表中对应的教室失败'});
							}else{
								//删除教室表中相应的教室成功
								console.log(" classTableDeleteClassByClassName succeed");
								//更新老师表中的教室字段为空成功
								console.log(" hasClassTableDeleteClassByClassName succeed");
								res.json({'status':'1','msg':'删除教室成功'});
							}
						});
					
					}
				});
			}
		});
	    connection.release();
    });
});


//更新教室名字
router.post('/updateClassName', function(req, res) {
	var params = req.body;
	console.log(params);			
	pool.getConnection(function(err, connection){	
		//先查询是否存在这个名字的教室	
		sql = eval("sqlMap.hasClass.getClassNameNumByClassName_Sql");
		connection.query( sql, [params.className], function(err, ExsitClassResult){
			if(err){
				console.log(" getClassNameNumByClassName_Sql Error: " + err.message);
				res.json({'status':'-1','msg':'查询该教室是否存在失败'});
			}else if(ExsitClassResult[0].num == 1){
				//数据库中存在这个教室
				console.log(" getClassNameNumByClassName succeed,but className exists");
				res.json({'status':'2','msg':'该教室名已存在,请再次输入别的教室名'});
			}else if(ExsitClassResult[0].num == 0){
				//数据库中不存在这个教室的重复名
				console.log(" getClassNameNumByClassName succeed");

				//开始更新教室名
				sql = eval("sqlMap.class.updateClassName_Sql");
				connection.query( sql, [params.newClassName, params.oldClassName], function(err, result){
					if(err){
						console.log(" updateClassName_Sql Error: " + err.message);
						res.json({'status':'-1','msg':'更改教室名失败'});
					}else{
						//更新了class表中的教室名，还要更新教师表中对应的className字段,因为教室名字唯一，就可以直接更新对应的
						sql = eval("sqlMap.hasClass.updateClassName_Sql");
						connection.query( sql, [params.newClassName, params.oldClassName], function(err, result){
							if(err){
								console.log(" updateClassName_Sql Error: " + err.message);
								res.json({'status':'-1','msg':'更新老师表中的教室名失败'});
							}else{
								//更新教室表中相应的教室成功
								console.log(" updateClassName succeed[class]");
								//更新老师表中的教室名成功
								console.log(" updateClassName succeed[hasClass]");
								res.json({'status':'1','msg':'更新教室名成功'});
							}
						});
               
		            }
				 });
			}
		});
	    connection.release();
    });
});





module.exports = router;