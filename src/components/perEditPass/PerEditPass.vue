<template>
  <div>
    <el-dialog title="密码修改" :visible.sync="dialogFormVisible" @close="hide" >
      <el-form :model="form">
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.pass" auto-complete="off" placeholder="请输入原来的密码"></el-input>
           <p>{{form.passError}}</p>
        </el-form-item>
		<el-form-item label="新密码:" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.newpass" auto-complete="off" placeholder="请输入新的密码"></el-input>
           <p>{{form.newpassError}}</p>
        </el-form-item>
		<el-form-item label="重复新密码:" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.repass" auto-complete="off" placeholder="请重复输入新的密码"></el-input>
           <p>{{form.repassError}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editPass">修改</el-button>
        <el-button @click="hide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default{
   data(){
      return{
        form: {
          pass: '',
		  newpass: '',
		  repass: '',
          passError: '',
		  newpassError: '',
		  repassError: '',		  
  		  role: sessionStorage.role
        },
        formLabelWidth: '90px'
      }
    },
    props:['editPassShow'],
    computed:{
        dialogFormVisible:{
        get:function(){
          return this.editPassShow;
        },
        set:function(){}
      }
    },
  methods:{
  hide(){
    this.$emit('editPassReceive');
  },
  editPass(){
    var pwd = this.form.pass
	var npwd = this.form.newpass
	var repwd = this.form.repass
    var role = this.form.role
    //var reg1= /^[a-zA-Z0-9_-]+$/ */      /*密码验证表达式 */
	
    /*if(pwd.trim() && pwd.trim().length>6){
        if(!reg1.test(pwd)){
          this.form.passError = '密码格式错误'
          return false
          }
        //验证后
        this.form.passError=''
		this.form.newpassError=''
		this.form.repassError=''*/
		alert(npwd);
        this.$ajax.post('/Info/updatePass', {
                          username: sessionStorage.username,
						  password: pwd,
                          newpass: npwd,
                          role: this.form.role
        }, {emulateJSON: true}).then((response) => {
        if (response.data.status === '1') {
		   //修改密码成功
           alert(JSON.stringify(response.data.msg));
           this.$emit('editPassReceive');
        }
        if (response.data.status === '-1') {
		  //修改密码失败
          alert(JSON.stringify(response.data.msg))
        }
      }).catch((err) => {
        console.error(err)
      })
    /*}
    else{
      if(pwd.trim().length<6){
        this.form.passError = '密码格式错误'
      }
    }*/
  }
  }
}

</script>

