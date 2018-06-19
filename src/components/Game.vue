<template>
  <div>
    <!-- 提示框 -->
    <Tips :tipsShow="tipsShow" @tipsReceive="tipsReceive"></Tips>
    <!-- 登录框 -->
    <Login :loginShow="loginShow" @loginReceive="loginReceive"></Login>
    <!-- 注册框 -->
    <Reg :regShow="regShow" @regReceive="regReceive"></Reg>

    <!-- 导航条 -->
  <div id="nav">
    <div class="header">
      <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <img src="../assets/images/site_header_logo.png"/>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="challenge">
              <h1 id="level" >第<span v-cloak>{{levelNum}}</span>关挑战</h1>
            </div>
          </el-col>

          <el-col :span="4" v-show="isShow1" >
            <div class="grid-content bg-purple">
              <a href="javascript:;" @click="login">登录</a>
            </div>
          </el-col>
          <el-col :span="4" v-show="isShow1" >
            <div class="grid-content bg-purple">
              <a href="javascript:;" @click="reg">注册</a>
            </div>
          </el-col>

          <el-col :span="8" v-show="isShow2">
            <div class="grid-content bg-purple btn_menu" >
              <!-- 下拉框 -->
              <el_menu :elShow="elShow"></el_menu>
            </div>
          </el-col>
      </el-row>
    </div>
  </div>
	<div class="gameIframe">
	   <iframe src="/static/html/game.html" width="100%" height="800px" frameborder="0" id="external-frame" scrolling="no"></iframe>
	</div>

</div>
</template>

<script>
export default {
  data(){
    return{
	    //levelNum:"",
      tipsShow:false,
      elShow:true,
      loginReg:true,
      loginShow:false,
      regShow:false,
      canvasHeight:700,
      isShow1:true,
      isShow2:false
    }
  },
  computed:{
      //先计算levelNum的值
     levelNum: function() {
      if(sessionStorage.levelNum){
		return parseInt(sessionStorage.levelNum);
      }else{
        return 0;
      }
    }
  },
  created(){
        if(this.levelNum == 0){
          //如果是第0关，就显示引导提示关，其他关卡就不显示了
          //给提示框设置定时器
          setTimeout(() => {
            this.tipsShow=true;
        }, 800)
        }
        if(sessionStorage.username){
          //已登录
          this.isShow1 = false;
          this.isShow2 = true;
        }

  },
  methods:{

    login(){
      this.loginShow = true;
    },
    reg(){
      this.regShow = true;
    },
    loginReceive(){
      this.loginShow = false;
    },
    regReceive(){
      this.regShow = false;
    },
    tipsReceive(){
      this.tipsShow = false;

    }




  },
  mounted(){


  }
}
</script>
<style scoped>
 [v-clock]{
    display:none
}
#nav{
  height: 50px;
  background-color: #409EFF;
  position: relative;
}
.header{
  width: 100%;
  background-color: #39261f;
  border-bottom: 4px solid #000;
  border-top: 1px solid #000;
}
.challenge{
  width: 180px;
  display:inline-block;
  height: 60px;
  line-height: 50px;
  font-size:22px;
  color:#fff;
  background:url("../assets/images/header_bg.png");
  background-size:180px 50px;
  background-repeat:no-repeat;
}
.el-col-10{
text-align:center;
}
.el-col-8{
 padding-left:30%;
}
.bg-purple,.bg-purple a{
  display:inline-block;
  height: 60px;
  width:70px;
  line-height: 50px;
  font-size:22px;
  color: #fff;
  text-shadow: 1px 3px 3px #ffff33;
}
a:hover{
  font-size: 120%;
  color:#fdd834;
  text-shadow: 0px 0px 0px #fff;
}
.bg-purple a{
margin-left:150px;
}
#inp textarea{
   font-size: 30px;
}
.gameIframe{
  width:100%;
  overflow:hidden;
}

</style>
