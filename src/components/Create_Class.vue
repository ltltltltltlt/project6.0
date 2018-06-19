<template>
  <div id="Create_div">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="班级名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button  @click="resetInput">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
        }
      };
    },
    methods:{
      resetInput(){
         this.formLabelAlign.name = '';
      },
      onSubmit(){
        var className = this.formLabelAlign.name
        if(className.trim()){
          //验证后
          this.formLabelAlign.classNameError=''
          this.$ajax.post('/class/addClass', {
                            className: className,
                            role: sessionStorage.role,
                            username: sessionStorage.username
          }, {emulateJSON: true}).then((response) => {
            if (response.data.status === '1') {
              alert(JSON.stringify(response.data.msg))
                this.formLabelAlign.name = ''
            } else if (response.data.status === '2') {
              //这个教室名已经存在
              alert(JSON.stringify(response.data.msg))
            }else if (response.data.status === '-1') {
              alert(JSON.stringify(response.data.msg))
            }
          }).catch((err) => {
            console.error(err)
          })
        }
        else{
          if(className.trim().length == 0){
            this.formLabelAlign.classNameError = '教室名不能为空'
          }
        }
      }
    }
  }
</script>
<style>
.el-input__inner{
  width:50%;
}
  #Create_div{
  margin-left:100px;
  margin-top:20px;
  }
</style>
