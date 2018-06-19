<template>
 <div id="information">
  <div class="bg-img">
  </div>
  <PerEdit :editShow="editShow" @editReceive="editReceive"></PerEdit>
  <PerEditPass :editPassShow="editPassShow" @editPassReceive="editPassReceive"></PerEditPass>
   <AddClass :addClassShow="addClassShow" @addClassReceive="addClassReceive"></AddClass>
  <Picture :pictureShow="pictureShow" @pictureReceive="pictureReceive" v-on:src="showImg"></Picture>
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
          <el_menu :elShow="elShow"></el_menu>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="bg_information">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple ">
          <div class="picname_bg">
            <a href="javascript:;" @click="save">
              <img :src="src" class="picname"/>
			        <span>{{username}}</span>
            </a>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple-light ">
          <div class="star_bg">
            <img class="star" src="../assets/images/star_on.png"/>
            <div class="star_num">
              <h3>{{starNum}}</h3>
            </div>
          </div>
          <a href="javascript:;" @click="edit">
            <div class="edit">
              <span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;个人资料编辑</span>
            </div>
          </a>
          <a href="javascript:;" @click="editPass">
            <div class="edit">
              <span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;修改密码</span>
            </div>
          </a>
          <a href="javascript:;" @click="addClass" v-if ="!hasClass">
            <div class="edit">
              <span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;加入班级</span>
            </div>
          </a>
        </div>
      </el-col>
      <el-col :span="4">
          <div v-if="hasClass" class="className_bg">
            <span>教室</span>
            <div class="class_name">
              <h3>{{className}}</h3>
            </div>
          </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple unclock">
          <img src="/static/img/lock.png"/>
          <div class="unlock_message">
            只要再{{i}}<img width="40px" height="30px" src="../assets/images/star_on.png" />星星就能得到此称号
          </div>
          <div class="unclock_meter">
          </div>
          <router-link to="" @click.native="PerbackToGame">
            <div class="play-bt">
              <span style="font-size: 29px;">继续闯关</span>
            </div>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <div class="main">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <h3>我的成就称号</h3>
            <div class="user_achievement">
              <img src="/static/img/1.png"/>
            </div>
            <div class="user_achievement" v-cloak v-for="(item,index) in imgData" :key="index">
              <img :src="item.url"/>
            </div>
          </div>
        </el-col >
        <el-col :span="12">
          <div class="grid-content bg-purple-light " >
              <h3>游戏解答</h3>
          </div>
        </el-col>
      </el-row>
      </div>
  </div>
  </div>
</template>
<script>
	import '../assets/css/Personal.css'
	export default{
	  data(){
	    return{
	      imgData:[
               {url:'/static/img/lock.png'},
               {url:'/static/img/lock.png'},
               {url:'/static/img/lock.png'},
        ],
        starNum:sessionStorage.star,
        username:sessionStorage.username,
        i:'',
        role:sessionStorage.role,
        editShow:false,
		    editPassShow:false,
        addClassShow:false,
        pictureShow:false,
        src:sessionStorage.icon,
        hasClass:false,
        className:sessionStorage.className,
	    }
	  },
	  created(){
      if(sessionStorage.star<30){
        this.i=30-sessionStorage.star
      }
      if(sessionStorage.star>30 && sessionStorage.star<60){
        this.i=60-sessionStorage.star
        this.imgData[0].url="/static/img/2.png"
      }
      if(sessionStorage.star>=60 && sessionStorage.star<90){
        this.i=90-sessionStorage.star
        this.imgData[0].url="/static/img/2.png"
        this.imgData[1].url="/static/img/3.png"
      }
      if(sessionStorage.star>=90 && sessionStorage.star<120){
        this.imgData[0].url="/static/img/2.png"
        this.imgData[1].url="/static/img/3.png"
        this.imgData[2].url="/static/img/4.png"
      }
      if(sessionStorage.role == 'teacher'){
        this.hasClass = true;
      } else{
            this.$ajax.post('/class/getClassInfo', {
              username : sessionStorage.username,
            }, {emulateJSON: true}).then((response) => {
              if (response.data.status === '1') {
                //学生拥有的教室查询成功
                console.log(JSON.stringify(response.data.msg))
                this.className = response.data.ClassName
                this.hasClass = true
              }else if(response.data.status === '2'){
                //学生还没进入教室
                console.log(JSON.stringify(response.data.msg))
                this.hasClass = false
              }else if (response.data.status === '-1') {
                //读取教室错误
                alert(JSON.stringify(response.data.msg))
                this.hasClass = false
              }
            }).catch((err) => {
              console.error(err)
            })
      }
    },
	  methods:{
	    showImg:function(data){
	      this.src = data;
        },
	    edit(){
        this.editShow = true;
      },
      editReceive(){
		    this.username = sessionStorage.username;
        this.editShow = false;
      },
		  editPass(){
		    this.editPassShow = true;
		  },
		  editPassReceive(){
		    this.editPassShow = false;
		  },
      addClass(){
        this.addClassShow = true;
      },
      addClassReceive(data){
        this.addClassShow = false;
        if(data == 'true'){
          this.hasClass = true;
          this.className = sessionStorage.className;
        }
      },
      save(){
        this.pictureShow=true;
      },
      pictureReceive(){
		    this.src = sessionStorage.icon;
        this.pictureShow = false;
      },
      PerbackToGame(){
	  /*
		   //先判断是否有登录
		   if(sessionStorage.username){
          //已登录，就调用后台查询已经保存的关卡数,就跳到保存好的关卡数
          this.$ajax.post('/Info/queryChapter', {
                  username: sessionStorage.username,
                  role: sessionStorage.role
          }, {emulateJSON: true}).then((response) => {
          if (response.data.status === '1') {
            //获取该用户的游戏的数据，保存到sessionStorage里面
            console.log(JSON.stringify(response.data.msg));
            //将游戏关卡和对应的游戏代码放到sessionSession中
            sessionStorage.chapterCode = response.data.chapterCode;
            sessionStorage.levelNum = response.data.chapterNum;
            this.$router.push({path: '/Game'});
          }
          if (response.data.status === '-1') {
            //获取不到该用户的游戏的数据
            alert(JSON.stringify(response.data.msg))
          }
          }).catch((err) => {
            console.error(err)
          })
	      }
	  */
	  this.$router.push({path: '/Game'});
	  }
	  }
	}
</script>
<style>
  [v-cloak]{
    display: none;
  }

</style>
