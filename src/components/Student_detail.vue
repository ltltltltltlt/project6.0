<template>
  <div id="Student_div">
    <div class="classInfo">
      <div class="select">
        <el-select v-model="class_id" placeholder="请选择班级">
          <el-option
            v-for="item in itemData"
            :key="item.classId"
            :label="item.className"
            :value="item.className">
          </el-option>
        </el-select>
      </div>
      <div class="classAvg">
        <div width="180"><span>班级人数:</span><span>{{Class_number}}</span></div>
        <div width="180"><span>班级平均星星数:</span><span>{{Avg_star}}</span></div>
      </div>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%;font-size: 20px;">
      <el-table-column prop="Student_name" label="学员名字" width="180">
      </el-table-column>
      <el-table-column prop="Student_class" label="学员班级" width="180">
      </el-table-column>
      <el-table-column prop="Student_level" label="学员等级" width="180">
      </el-table-column>
      <el-table-column prop="Student_star_num" label="学员星星数数"  >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Class_number:0,
        Avg_star:0,
        tableData:[],
        class_id:null,
        itemData:[]
      }
    },
    created(){
      
    },
    watch:{
      class_id:function() {
        //调用后端接口，返回班级数据(tableData)并渲染
        if(this.class_id) {
           this.$ajax.post('/class/getStudentInfo', {
              className : this.class_id,
            }, {emulateJSON: true}).then((response) => {
              if (response.data.status === '1') {
                //教室里面的学生信息成功
                console.log(JSON.stringify(response.data.msg))
                var studentData = response.data.studentInfo
                var starSum = 0
                var student = []
                var that = this
                for(var k in studentData){
                  var obj = {}
                  obj.Student_name = studentData[k].username
                  obj.Student_class = that.class_id
                  obj.Student_level = studentData[k].level
                  obj.Student_star_num = studentData[k].star 
                  starSum += studentData[k].star
                  student[k] = obj
                } 
                //赋值给表格
                that.tableData = student

                if(k){
                   //更改班级人数，此处的-0是为了让k强转成数字类型，不然k直接加1是会强转成字符串类型
                    that.Class_number = k - 0 + 1
                   //更新班级平均星星数
                   that.Avg_star = starSum /that.Class_number
                }else{
                  that.Class_number = 0
                  that.Avg_star = 0
                }
               
              }else if (response.data.status === '-1') {
                alert(JSON.stringify(response.data.msg))
              }
            }).catch((err) => {
              console.error(err)
            })
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
  #Student_div{
    margin-top:20px;
    margin-left:100px;
  }
  #Student_div .el-select{
    width: 250px;
  }
  .classInfo{
    padding-bottom: 60px;
  }
  .classInfo div{
    float: left;
  }
  .select{
    width: 50%;
  }
  .classAvg div{
    width: 180px;
    padding-right: 50px;
  }
  .classAvg div span{
    padding-left: 10px;
  }
</style>
