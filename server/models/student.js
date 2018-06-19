var mysql = require('mysql');
var sqlMap = require('../sqlMap');
var pool = require('../dbPool.js');
var User = require('./user');

pool.on('connection', function(connection) {
    //让session每次自增长1
    connection.query('SET SESSION auto_increment_increment=1');
});


//学生类
function Student(student){
    User.call(this,student,'student');
};

module.exports = Student;

pool.getConnection(function(err, connection) {
  
connection.query(sqlMap.db.useDbSql, function (err) {
        if (err) {
          console.log("USEDb Error: " + err.message);
          return;
        }
        console.log('Student USEDb succeed');
      });

    //继承User类的原生链
    Student.prototype = Object.create(User.prototype);
    Student.prototype.constructor = Student;





    // //根据用户名得到已注册的用户名数量
    // Student.getUserNumByUsername = function getUserNumByUsername(username, callback) {

    //     connection.query(sqlMap.student.getUserNumByUsername_Sql, [username], function (err, result) {
    //         if (err) {
    //             console.log("getUserNumByUsername Error: " + err.message);
    //             return;
    //         }

    //         //connection.release();
           
    //         console.log("getUserNumByUsername succeed");
    //         callback(err,result);
        
    //     });
       
    // };


    // //根据邮箱名得到邮箱已注册的数量
    // Student.getUserNumByEmail = function getUserNumByEmail(email, callback){

    //     connection.query(sqlMap.student.getUserNumByEmail_Sql, [email], function (err, result) {
    //         if (err) {
    //             console.log("getUserNumByEmail Error: " + err.message);
    //             return;
    //         }

    //         //connection.release();

    //         console.log("getUserNumByEmail succeed");
    //         callback(err,result);
        
    //     });
        
    // };

    // //根据邮箱名得到用户信息
    // Student.getUserByEmail = function getUserNumByEmail(email, callback) {
        
    //     connection.query(sqlMap.student.getUserByEmail_Sql, [email], function (err, result) {
    //         if (err) {
    //             console.log("getUserByEmail Error: " + err.message);
    //             return;
    //         }

    //         //connection.release();
    //         console.log("getUserByEmail succeed");
    //         callback(err,result);
          
    //     });
       
    // };


    // //根据用户名得到用户信息
    // Student.getUserByUsername = function (username, callback) {

    //     connection.query(sqlMap.student.getUserByUsername_Sql, [username], function (err, result) {
    //         if (err) {
    //             console.log("getUserByUsername Error: " + err.message);
    //             return;
    //         }

    //         //connection.release();

    //         console.log("getUserByUsername succeed");
    //         callback(err,result);
          
    //     });
        
    // };

    // //修改用户信息
    // Student.UpdateUserByUsername = function (student, callback) {

    //   connection.query(sqlMap.student.UpdateUserByUsername_Sql, [username], function (err, result) {
    //         if (err) {
    //             console.log("getUserByUsername Error: " + err.message);
    //             return;
    //         }

    //         //connection.release();

    //         console.log("getUserByUsername succeed");
    //         callback(err,result);
          
    //     });
    // }

    //释放连接
    connection.release();
});



