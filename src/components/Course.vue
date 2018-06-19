<template>
	<div id='personal'>
		<div class="bg-img">
		</div>
    <div class="header">
    <el-row>
      <el-col :span="23">
        <div class="grid-content bg-purple">
          <img src="../assets/images/site_header_logo.png"/>
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
  <div class="welcom">
    <el-row>
      <el-col :span="24">
        <h1>欢迎回来,{{username}}</h1>
      </el-col>
    </el-row>
  </div>

  <div class="menu3">
    <el-row>
      <el-col :span="16">
        <div class="grid-content bg-purple main-progress-bg">
        </div>
      </el-col>
      <el-col :span="8">
      <div class="continue-module">
        <div class="grid-content bg-purple-light continue-bg">
          <router-link to="" @click.native="backToGame">
            <div class="continue-game">
              <span style="font-size: 29px;">继续游戏</span>
            </div>
          </router-link>
        </div>
      </div>
      </el-col>
    </el-row>
  </div>


    <Mymap :mapShow="mapShow" :base="base" :currentPass="currentPass" @mapReceive="mapReceive"></Mymap>
  <div class="menu4">
    <el-row>
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <section>
            <div class="title">
              <h1>游戏关卡</h1>
            </div>
            <div class="active-content">
              <a href="javascript:;" @click="map(0)">
                <div class="active">
                  <img src="../assets/images/dashboard_coding_adventure_part_ii.jpg"/>
                  <div class="active-name">编码冒险</div>
                  <div class="active-subtitle">第一部分基本原理</div>
                </div>
              </a>

            </div>
            <div class="active-content">
              <a href="javascript:;" @click="map(16)">
                <div class="active">
                  <img src="../assets/images/dashboard_coding_adventure_part.jpg"/>
                  <div class="active-name">编码冒险</div>
                  <div class="active-subtitle">第二部分进阶函数</div>
                </div>
              </a>

            </div>
          </section>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple-light">
          <div class="power-up">
           <div class="saying-header">名言警句</div>
           <div class="well-known-saying1">学习如同逆水行舟，</div>
           <div class="well-known-saying2">不进则退。</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
	import '../assets/css/Course.css'
	export default{
	  data(){
	    return{
	      username: '',
	      role:'',
        email:'',
        level:'',
        mapShow:false,
        base:0,
        currentPass:sessionStorage.currentPassChapter
	    }
	  },
    created(){
       this.username = sessionStorage.username;
       this.role = sessionStorage.role;
       this.email = sessionStorage.email;
       this.level = sessionStorage.level;

        //先判断是否有登录
		/*if(sessionStorage.username){

				//已登录，就调用后台查询已经保存的关卡数,就跳到保存好的关卡数

				this.$ajax.post('/Info/queryChapter', {
							  username: sessionStorage.username,
							  role: sessionStorage.role
				}, {emulateJSON: true}).then((response) => {
				if (response.data.status === '1') {
				    //获取该用户的游戏的数据，保存到sessionStorage里面
				    console.log(JSON.stringify(response.data.msg));
                    //将游戏关卡和对应的游戏代码放到sessionSession中
				    //sessionStorage.chapterCode = response.data.chapterCode;
				    //sessionStorage.levelNum = response.data.chapterNum;
					sessionStorage.currentPassChapter = response.data.currentPassChapter;
					sessionStorage.chapterCode = '';
					//如果不存在已过关数,就赋值保存
					if(sessionStorage.currentPassChapter == undefined && sessionStorage.levelNum != null){
					  sessionStorage.currentPassChapter = sessionStorage.levelNum;
					  this.currentPass = parseInt(sessionStorage.levelNum);
					}
					if(sessionStorage.currentPassChapter != null){
					  this.currentPass = parseInt(sessionStorage.currentPassChapter);
					}
          

				}
				if (response.data.status === '-1') {
				  //获取不到该用户的游戏的数据
				  alert(JSON.stringify(response.data.msg))
				}
			  }).catch((err) => {
				  console.error(err)
			  })

	        }*/
    },
    methods:{
      map(base){
        this.base = base
        this.mapShow = true;
      },
      mapReceive(){
        this.mapShow = false;
      },
       backToGame(){
	    sessionStorage.levelNum = sessionStorage.currentPassChapter;
	    this.$router.push({path: '/Game'});
	  }
    },
    mounted(){
        //若是玩超过了后台的关卡，就改变当前显示的关卡数
        if(sessionStorage.levelNum > sessionStorage.currentPassChapter){
          sessionStorage.currentPassChapter = sessionStorage.levelNum;
          this.currentPass = parseInt(sessionStorage.levelNum);
        }
    }
}
</script>
<style scoped>
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
</style>
