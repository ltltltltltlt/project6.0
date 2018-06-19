<template>
  <div>
    <div class="header_teacher">
      <el-row>
        <el-col :span="23">
          <div class="grid-content bg-purple">
            <img src="../assets/images/site_header_logo.png" class="header_logo"/>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple btn_menu" >
            <!-- 下拉框 -->
            <el_menu :elShow=true></el_menu>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="4">
          <div class="Teacher_image">
            <img :src="src" >
          </div>
          <br>
          <el-menu router  default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <span style="font-size: 20px;">管理班级</span>
              </template>
              <el-menu-item-group >
                <el-menu-item index="/Teacher/Create_Class" >创建班级</el-menu-item>
                <el-menu-item index="/Teacher/Update_ClassName" >更改班级名字</el-menu-item>
                <el-menu-item index="/Teacher/Delete_Class" >删除班级</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <br><br>

          <el-menu router default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <span style="font-size: 20px;">查看学员</span>
              </template>
              <el-menu-item-group >
                  <el-menu-item index="/Teacher/Student_detail">班级详情</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
           </el-menu>
        </el-col>
        <el-col :span="20" class="showArea">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        src:sessionStorage.icon
      }
    },
    methods: {
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      },
    }
  }
</script>
<style scoped>

.header_teacher{
  background: #39261f;
  height:50px;
  margin-bottom: 20px;;
}
.bg-purple{
  height:50px;
}
.header_logo{
  height:80%;
  margin:5px;
}
.btn_menu{
 margin-left:11px;

}
.el-dropdown-menu{
  width:130px;
}
.el-dropdown-menu__item{
  font-color:#ffffff;
  font-size:20px;
}
.el-col-4{

}
.el-col-20{

}
.Teacher_image{
  height: 145px;
  width: 145px;
  margin:0 auto;
}
  .el-menu-item{
    font-size: 18px;
  }
</style>
