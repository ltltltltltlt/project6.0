<template>
  <div id="login">
    <el-dialog title="登录" :visible.sync="dialogFormVisible"  @close="hide" >
      <el-form :model="form">
        <el-form-item label="邮箱:" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
          <p>{{form.emailError}}</p>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
           <p>{{form.passError}}</p>
        </el-form-item>
		  <el-form-item label="身份:" :label-width="formLabelWidth">
        <el-radio v-model="form.role" label="student" auto-complete="off">学生</el-radio>
        <el-radio v-model="form.role" label="teacher" auto-complete="off">老师</el-radio>
        <!-- <el-radio v-model="form.role" label="admin" auto-complete="off">管理员</el-radio> -->
		<el-checkbox v-model="form.isRem" auto-complete="off" style="padding-left:100px;">记住登录</el-checkbox>
       </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">确 定</el-button>
        <el-button @click="hide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      form: {
        email: '',
        pass: '',
        emailError:'',
        passError:'',
		    role: 'student',
		    isRem: true
      },
      formLabelWidth: '80px'
    }
  },
  props:['loginShow'],
  computed:{
      dialogFormVisible:{
      get:function(){
        return this.loginShow;
      },
      set:function(){
      }
    }
  },
  methods:{
    hide(){
      this.$emit('loginReceive');
    },
	login () {
	    var email = this.form.email
      var pwd = this.form.pass
      var role = this.form.role
	    var isRem = this.form.isRem
      var reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/   //邮箱正则表达式
      var reg1= /^[a-zA-Z0-9_-]+$/       //密码验证表达式
      if(email.trim() && pwd.trim() &&email.trim().length>6 && pwd.trim().length>6){
          if(!reg.test(email)){
            this.form.emailError = '邮箱格式错误'
            return false
            }
          if(!reg1.test(pwd)){
            this.form.passError = '密码格式错误'
            return false
            }
          //验证后
          this.form.emailError=''
          this.form.passError=''
          this.$ajax.post('/users/login', {
                            email: email,
                            password: pwd,
                            role: role,
                            isRem: isRem
          }, {emulateJSON: true}).then((response) => {
          if (response.data.status === '2000') {
             alert(JSON.stringify(response.data.msg))
              this.form.email = ''
              this.form.pass = ''

              //sessionStorage只能储存字符串，储存为对象的话就不能修改了
              sessionStorage.id = response.data.user.id
			        sessionStorage.username = response.data.user.username
			        sessionStorage.email = response.data.user.email
			        sessionStorage.icon = response.data.user.icon
			        sessionStorage.level = response.data.user.level
			        sessionStorage.star = response.data.user.star
              sessionStorage.sex = response.data.user.sex
			  sessionStorage.currentPassChapter = response.data.user.currentPassChapter
              sessionStorage.role = role
              if(role == 'student'){
                 //学生的话就跳转到学生页面
                 this.$router.push({path: '/Course'})
              }else if(role == 'teacher'){
                 //老师的话就条转到老师页面
                 this.$router.push({path: '/Teacher'})
              }


          }
		      //邮箱有误
          else if (response.data.status === '2001') {
            alert(JSON.stringify(response.data.msg))
          }
		  //密码有误
          else if (response.data.status === '2002') {
            alert(JSON.stringify(response.data.msg))
          }
          else if (response.data.status === '2003') {
            alert(JSON.stringify(response.data.msg))
          }
        }).catch((err) => {
          console.error(err)
        })
      }
      else{
        if(email.trim().length<6){
          this.form.emailError = '邮箱格式错误'
        }
        if(pwd.trim().length<6){
          this.form.passError = '密码格式错误'
        }
      }


    }
  }
}
</script>
<style >
.el-input{
  width:93%;
}
#login .el-dialog{
    background-image: url("/static/img/login_bg.jpg");
    width:700px;
    height:500px;
    font-weight: bold;
  }
</style>

