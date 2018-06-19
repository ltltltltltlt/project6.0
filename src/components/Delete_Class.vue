<template>
  <div id="Create_div">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="删除班级">
        <el-input v-model="formLabelAlign.Delname" placeholder="请输入你想要删除的班级名称"></el-input>
      </el-form-item>
      <div class="error">{{ formLabelAlign.classNameError}}</div>
      <el-form-item>
        <el-button type="primary" @click="doDel">删除</el-button>
        <el-button @click="resetInput">取消</el-button>
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
          Delname: '',
          classNameError: ''
        }
      };
    },
    methods:{
      resetInput(){
        this.formLabelAlign.Delname = '';
      },
      doDel(){
        var className = this.formLabelAlign.Delname
        //var classLevel = this.formLabelAlign.level
        if(className.trim()){
          //验证后
          this.formLabelAlign.classNameError=''
         // this.formLabelAlign.classLevelError=''
          var that = this;
          this.$ajax.post('/class/deleteClass', {
              className: className,
          }, {emulateJSON: true}).then((response) => {
            if (response.data.status === '1') {
              //存在该教室并删除成功
              alert(JSON.stringify(response.data.msg))
              that.formLabelAlign.Delname = ''
            }else if(response.data.status === '2'){
              //不存在该教室
              alert(JSON.stringify(response.data.msg))
            }else if (response.data.status === '-1') {
              //数据库错误
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
  .error{
    color: red;
    font-size: 10px;
  }
</style>
