<template>
  <div>
    <el-dialog title="加入班级" :visible.sync="dialogFormVisible"  @close="hide" >

        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="班级名称">
            <el-input v-model="formLabelAlign.classname"></el-input>
          </el-form-item>
        </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addClass">确 定</el-button>
        <el-button @click="hide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        formLabelAlign: {
          classname: '',
        },
        formLabelWidth: '90px'
      }
    },
    props:['addClassShow'],
    computed:{
      dialogFormVisible:{
        get:function(){
          return this.addClassShow;
        },
        set:function(){
        }
      }
    },
    methods:{
      addClass(){
        var className = this.formLabelAlign.classname
        if(className.trim()){
          //验证后
          this.formLabelAlign.classNameError=''
          this.$ajax.post('/Info/JoinClass', {
                            className: className,
                            username: sessionStorage.username
          }, {emulateJSON: true}).then((response) => {
            if (response.data.status === '1') {
              alert(JSON.stringify(response.data.msg))
              sessionStorage.className = className;
              this.$emit('addClassReceive','true'); 
            } else if (response.data.status === '2') {
              //这个教室不存在
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
        //alert(this.class_id) // 将class_id传给后端，即加入班级
      },
      hide(){
        this.formLabelAlign.classname = '';
        this.$emit('addClassReceive','false');
      },

    }

  }
</script>
<style scoped>
  .el-input{
    width:93%;
  }
</style>

