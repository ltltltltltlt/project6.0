<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <img src="../../assets/images/btn_menu.png" id="menu_img"/>
    </span>
    <el-dropdown-menu slot="dropdown">
      <router-link to="/"><el-dropdown-item>首页</el-dropdown-item></router-link>
      <router-link to="/Course"><el-dropdown-item>课程页</el-dropdown-item></router-link>
      <router-link to="/Teacher" v-if="isTeacher"><el-dropdown-item>我是老师</el-dropdown-item></router-link>
      <router-link to="/Personal"><el-dropdown-item>个人主页</el-dropdown-item></router-link>
      <router-link to=""  @click.native="logout" tag = "a"><el-dropdown-item>注销</el-dropdown-item></router-link>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  data(){
    return{
      isTeacher:false,
    }
  },
  created(){
    if(sessionStorage.role == 'teacher'){
      this.isTeacher =  true;
    }
    
  },
  methods:{
    logout(){

       //即刻传到后台将后台保存的session标志和前台的cookie数据销毁
       this.$ajax.post('/users/logout', {}).then((response) => {
          if (response.data.status === '3000') {
            alert(JSON.stringify(response.data.msg))
            //清除sessionStorage里面的东西
            sessionStorage.clear()
            //回调
            this.$emit('elReceive');
            this.$router.push({path: '/'})
          }
       }).catch((err) => {
          console.error(err)
       })
    }


  },


}
</script>
<style>
  #menu_img{
  height:50px;
  }
  .el-dropdown-menu{
    width:150px;
    text-align:center;
  }
  .el-dropdown-menu__item{

    font-size:20px;
    font-color:#ffffff;
    height:50px;
    line-height:50px;
  }
  .el-dropdown-menu__item:hover{
   background: #99cc67;;
   font-color:#ffffff;
  }
</style>
