var mysql = require('mysql');
var sqlMap = require('../sqlMap');
var pool = require('../dbPool.js');
var User = require('./user');

pool.on('connection', function(connection) {
    //让session每次自增长1
    connection.query('SET SESSION auto_increment_increment=1');
});


function Teacher(teacher){
    User.call(this,teacher,'teacher');
};

module.exports = Teacher;

pool.getConnection(function(err, connection) {
  
    connection.query(sqlMap.db.useDbSql, function (err) {
        if (err) {
          console.log("USEDb Error: " + err.message);
          return;
        }
        console.log('Teacher USEDb succeed');
    });

    //继承User类的原生链
    Teacher.prototype = Object.create(User.prototype);
    Teacher.prototype.constructor = Teacher;


   

    //释放连接
    connection.release();
});

