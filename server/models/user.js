var sqlMap = require('../sqlMap');
var pool = require('../dbPool.js');

//用于保存调用角色的sql语句
var sql;

pool.on('connection', function(connection) {
    //让session每次自增长1
    connection.query('SET SESSION auto_increment_increment=1');
});


function User(user,role){
    this.username = user.username;
    this.email = user.email;
    this.pwd = user.pwd;
    this.role = role;
};



module.exports = User;

pool.getConnection(function(err, connection) {
    //使用数据库
      connection.query(sqlMap.db.useDbSql, function (err) {
        if (err) {
          console.log("USEDb Error: " + err.message);
          return;
        }
        console.log('User USEDb succeed');
      });
    
    

    //保存数据
    User.prototype.save = function (callback) {
        var user = {
            username:this.username,
            email: this.email,
            pwd: this.pwd
        };
        sql = eval("sqlMap." + this.role + ".insertUser_Sql");
        connection.query(sql, [user.username,user.email, user.pwd], function (err,result) {
            if (err){
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }

            //connection.release();

            console.log(" insertUser succeed");
            callback(err,result);
            
        });
       
    };
    


    //根据用户名得到已注册的用户名数量
    User.prototype.getUserNumByUsername = function (username, callback) {
   
        sql = eval("sqlMap." + this.role + ".getUserNumByUsername_Sql");
        connection.query(sql, [username], function (err, result) {
            if (err) {
                console.log(" getUserNumByUsername Error: " + err.message);
                return;
            }

            //connection.release();
           
            console.log(" getUserNumByUsername succeed");
            callback(err,result);
        
        });
       
    };


    //根据邮箱名得到邮箱已注册的数量
    User.prototype.getUserNumByEmail = function (email, callback){

        sql = eval("sqlMap." + this.role + ".getUserNumByEmail_Sql");
        connection.query(sql, [email], function (err, result) {
            if (err) {
                console.log(" getUserNumByEmail Error: " + err.message);
                return;
            }

            //connection.release();

            console.log(" getUserNumByEmail succeed");
            callback(err,result);
        
        });
        
    };

    //根据邮箱名得到用户信息
    User.prototype.getUserByEmail = function (role, email, callback) {
        
        sql = eval("sqlMap." + role + ".getUserByEmail_Sql");
        connection.query(sql, [email], function (err, result) {
            if (err) {
                console.log(" getUserByEmail Error: " + err.message);
                return;
            }

            //connection.release();
            console.log(" getUserByEmail succeed");
            callback(err,result);
          
        });
       
    };


    //根据用户名得到用户信息
    User.prototype.getUserByUsername = function (role, username, callback) {
        sql = eval("sqlMap." + role + ".getUserByUsername_Sql");
        connection.query(sql, [username], function (err, result) {
            if (err) {
                console.log(" getUserByUsername Error: " + err.message);
                return;
            }

            //connection.release();

            console.log(" getUserByUsername succeed");
            callback(err,result);
          
        });
        
    };
	
	
	//初始化用户的代码表
	User.prototype.InitCodeByUsername = function (role, username, callback) {
        console.log(role)
        console.log(username)
		sql = eval("sqlMap.code.initCodeByUsername_Sql");
        connection.query(sql, [role, username], function (err, result) {
            if (err) {
                console.log(" InitCodeByUsername Error: " + err.message);
                return;
            }

            //connection.release();

            console.log(" InitCodeByUsername succeed");
            callback(err,result);
          
        });
	}


    //释放连接
    connection.release();
});

