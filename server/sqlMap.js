var DB_NAME = 'game';

// sql语句
var sqlMap = {
	//数据库
	db: {
		   useDbSql : 'USE ' + DB_NAME
	},
    //用户
    student: {
        //插入一条数据到数据库
        insertUser_Sql : "INSERT INTO student(id,username,email,password,icon,level,star,sex,currentPassChapter) VALUES(0,?,?,?,'static/img/avatar00.png','1',0,'male','0')",

        //根据用户名得到已注册的用户名数量
        getUserNumByUsername_Sql : "SELECT COUNT(1) AS num FROM student WHERE username = ?",

        //根据邮箱名得到邮箱已注册的数量
        getUserNumByEmail_Sql : "SELECT COUNT(1) AS num FROM student WHERE email = ?",

        //根据邮箱名得到用户信息
        getUserByEmail_Sql : "SELECT * FROM student WHERE email = ?",

        //根据用户名得到用户信息
        getUserByUsername_Sql : "SELECT * FROM student WHERE username = ?",
		
		//由用户名获得通关关卡的数量
		getCurrentPassChapterByUsername_Sql : "SELECT currentPassChapter FROM student WHERE  username = ?",

        //修改用户的星星个数和通过关卡数
        updateStarCurrentPassChapterByUsername_Sql : "UPDATE student set star = ? ,currentPassChapter = ? Where Username = ?",
		
        //保存用户头像
        saveAlt_Sql : "UPDATE student SET icon = ? WHERE username = ?",	

        //修改个人资料
        updateInfoUsername_Sql : "UPDATE student SET username = ? WHERE username = ?",
		 
		//修改个人资料
        updateInfoEmail_Sql : "UPDATE student SET email = ? WHERE username = ?",
		 
		//修改个人资料
        updateInfoSex_Sql : "UPDATE student SET sex = ? WHERE username = ?",

        //修改密码
        updatePass_Sql : "UPDATE student SET password = ? WHERE username = ?",		
    },
    //教师
    teacher: {
         //插入一条数据到数据库
         insertUser_Sql : "INSERT INTO teacher(id,username,email,password,icon,level,star,sex,currentPassChapter) VALUES(0,?,?,?,'static/img/avatar00.png','1',0,'male','0')",

         //根据用户名得到已注册的用户名数量
         getUserNumByUsername_Sql : "SELECT COUNT(1) AS num FROM teacher WHERE username = ?",
 
         //根据邮箱名得到邮箱已注册的数量
         getUserNumByEmail_Sql : "SELECT COUNT(1) AS num FROM teacher WHERE email = ?",
 
         //根据邮箱名得到用户信息
         getUserByEmail_Sql : "SELECT * FROM teacher WHERE email = ?",
 
         //根据用户名得到用户信息
         getUserByUsername_Sql : "SELECT * FROM teacher WHERE username = ?",
		 
		 //由用户名获得通关关卡的数量
		 getCurrentPassChapterByUsername_Sql : "SELECT currentPassChapter FROM teacher WHERE  username = ?",
 
         //修改用户的星星个数和通过关卡数
        updateStarCurrentPassChapterByUsername_Sql : "UPDATE teacher set star = ? ,currentPassChapter = ? Where Username = ?",
 
         //保存用户头像
         saveAlt_Sql : "UPDATE teacher SET icon = ? WHERE username = ?",	
 
         //修改个人资料
         updateInfoUsername_Sql : "UPDATE teacher SET username = ? WHERE username = ?",
		 
		 //修改个人资料
         updateInfoEmail_Sql : "UPDATE teacher SET email = ? WHERE username = ?",
		 
		 //修改个人资料
         updateInfoSex_Sql : "UPDATE teacher SET sex = ? WHERE username = ?",
		 
 
         //修改密码
         updatePass_Sql : "UPDATE teacher SET password = ? WHERE username = ?",	

    },
    code: {
        //初始化用户的代码表
        initCodeByUsername_Sql : "INSERT INTO code(role, username, chapter, chapterCode) VALUES(?,?,'0','step 15')",
         
        //查询是否存在当前的关卡
        getNumByRoleUsernameChapter_Sql : "SELECT COUNT(*) AS num FROM code WHERE role = ? and username = ? and chapter = ?",
        
        //更新已存在关卡的代码
        updateChapterCodeByRoleUsernameChapter_Sql : "UPDATE code SET chapterCode = ? WHERE role = ? and username = ? and chapter = ?",	
        
        //保存新关卡的代码
        insertCodeByRoleUsernameChapter_Sql : "INSERT INTO code(role, username, chapter, chapterCode) VALUES(?,?,?,?)",
        
        //由身份和用户名获得已过关卡的数量
        //getChapterNumByRoleUsername_Sql : "SELECT COUNT(*) AS num FROM code WHERE role = ? and username = ?",
		
        
        //由身份和用户名和关卡获得对应关卡的代码
        getChapterCodeByRoleUsernameChapter_Sql : "SELECT chapterCode FROM code WHERE role = ? and username = ? and chapter = ?",
    },
    //教室
    class: {
        //学生根据用户名查询教室名
        getClassNameByusername_Sql : "SELECT className FROM class WHERE username = ?",

        //根据教室名得到教室里面学员信息
        getStudentInfoByClassName_Sql : "SELECT * FROM student WHERE username IN (SELECT username FROM class WHERE className = ?)",

        //根据教室名插入相应的学生
        insertClassNameStudentName_Sql : "INSERT INTO class(className, username) VALUES(?,?)",

        //根据教室名删除该教室
        deleteClassByClassName_Sql : "DELETE FROM class WHERE ClassName = ?",

        //修改教室名字
        updateClassName_Sql : "UPDATE class SET className = ? WHERE className = ?",

        //更改学生名字
        updateStudentName_Sql : "UPDATE class SET studentName = ? WHERE studentName = ?",


    },
    hasClass: {
                 
        //添加教室
        addClassName_Sql : "INSERT INTO hasClass(className, username, role) VALUES(?, ?, ?)",

        //查询教室名
        getClassIdClassNameByusername_Sql : "SELECT classId, className FROM hasClass WHERE username = ? and role = ?",

        //根据教室名查询是否存在
        getClassNameNumByClassName_Sql : "SELECT COUNT(1) AS num FROM hasClass WHERE className = ?",

        //删除了教室就要删除教师对应教室名的hasClass表
        deleteClassByClassName_Sql : "DELETE FROM hasClass WHERE ClassName = ?",

        //修改教室名字就更改教师拥有教室表中对应的教室名
        updateClassName_Sql : "UPDATE hasClass SET className = ? WHERE className = ?",

         //更改教师名字
         updateUsername_Sql : "UPDATE hasClass SET username = ? WHERE username = ?",

    },
    //管理员
    admin: {
        //插入一条数据到数据库
        insertUser_Sql : "INSERT INTO admin(id,username,email,password) VALUES(0,?,?,?)",

        //根据用户名得到已注册的用户名数量
        getUserNumByUsername_Sql : "SELECT COUNT(1) AS num FROM admin WHERE username = ?",

        //根据邮箱名得到邮箱已注册的数量
        getUserNumByEmail_Sql : "SELECT COUNT(1) AS num FROM admin WHERE email = ?",

        //根据邮箱名得到用户信息
        getUserByEmail_Sql : "SELECT * FROM admin WHERE email = ?",

        //根据用户名得到用户信息
        getUserByUsername_Sql : "SELECT * FROM admin WHERE username = ?"      
    },
}

module.exports = sqlMap;
