<template>
  <div id="UpdateClassName_div">
    <div class="select">
        <el-select v-model="class_name" placeholder="请选择要修改名字的班级">
          <el-option
            v-for="item in itemData"
            :key="item.classId"
            :label="item.className"
            :value="item.className">
          </el-option>
        </el-select>
    </div>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
      <el-form-item label="新班级名称">
        <el-input v-model="formLabelAlign.newname" placeholder="请输入新的教室名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate">更改名字</el-button>
        <el-button  @click="resetInput">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        itemData:[],
        class_name:null,
        labelPosition: 'right',
        formLabelAlign: {
        newname: '',
        }
      };
    },
    methods:{
      resetInput(){
         this.formLabelAlign.newname = '';
      },
      onUpdate(){
        var oldClassName = this.class_name
        var newClassName = this.formLabelAlign.newname
        if(newClassName.trim() && newClassName != oldClassName){
          //验证后
          this.formLabelAlign.classNameError=''
          this.$ajax.post('/class/updateClassName', {
            oldClassName: oldClassName,
            newClassName: newClassName
          }, {emulateJSON: true}).then((response) => {
            if (response.data.status === '1') {
              alert(JSON.stringify(response.data.msg))
              this.class_name = this.formLabelAlign.newname 
              this.formLabelAlign.newname = ''
            }else if (response.data.status === '-1') {
              alert(JSON.stringify(response.data.msg))
            }
          }).catch((err) => {
            console.error(err)
          })
        }
        else{
          if(newClassName.trim().length == 0){
            this.formLabelAlign.classNameError = '教室名不能为空'
          }
        }
      }
    },
    mounted(){
      this.$ajax.post('/class/getClassName', {
          username : sessionStorage.username,
          role: sessionStorage.role,
        }, {emulateJSON: true}).then((response) => {
          if (response.data.status === '1') {
            //查询老师拥有的教室成功
            console.log(JSON.stringify(response.data.msg))
            this.itemData = response.data.classNameArr;
            console.log(this.itemData)     
          }else if (response.data.status === '-1') {
            alert(JSON.stringify(response.data.msg))
          }
        }).catch((err) => {
          console.error(err)
        })
    },
  }
</script>
<style>
.el-input__inner{
  width:50%;
}
  #UpdateClassName_div{
  margin-left:100px;
  margin-top:20px;
  }
  #UpdateClassName_div .el-select{
    width: 500px;
    padding-bottom: 30px;
  }
  .select{
    width: 50%;
  }
</style>
