<template>
  <div id="m">
    <el-dialog  :visible.sync="dialogFormVisible" @close="hide" >
      <div class="map">
        <el-col :span="6"   v-for="x in 16" :key="x">
            <div v-if="base + x -1 <= currentPass " class="chapter">
              <a @click="jmpToGame(base + x-1)" >{{base + x - 1}}</a>
            </div>
          <div v-else><img src="/static/img/lock.png" alt="未通关"></div>
        </el-col>
      </div>


    </el-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        // currentPass:0,
      }
    },
    props: ['mapShow','base','currentPass'], //currentPass表示当前第几关 base传一个底数，低级教程为0 高级教程为16
    computed: {
      dialogFormVisible: {
        get: function () {
          return this.mapShow;
        },
        set: function () {
        }
      },
    },
    methods:{
      hide(){
        this.$emit('mapReceive');
      },
      jmpToGame(levelNum){
        if(levelNum == sessionStorage.currentPassChapter){   
		      sessionStorage.levelNum = levelNum;
		      sessionStorage.chapterCode = '';
          this.$router.push({path: '/Game'});
        }
        else if(sessionStorage.username != null){
          //将点击的关卡数保存到sessionStorage中
          sessionStorage.levelNum = levelNum;
          //已登录，就调用后台查询已经保存的关卡数,就跳到保存好的关卡数
          this.$ajax.post('/Info/queryLevelChapter', {
                  username: sessionStorage.username,
                  role: sessionStorage.role,
                  chapter : levelNum
          }, {emulateJSON: true}).then((response) => {
            if (response.data.status === '1') {
              //获取该用户的游戏的数据，保存到sessionStorage里面
              console.log(JSON.stringify(response.data.msg));
              //将游戏关卡和对应的游戏代码放到sessionSession中
              sessionStorage.chapterCode = response.data.chapterCode;
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
     
        
      }
    },
  }
</script>
<style scoped>
#m .el-dialog{
    /*背景去除*/
    background: transparent;
    background:rgba(255,255,255,0);
    -moz-box-shadow:0 rgba(0,0,0,0);
    -webkit-box-shadow:0 rgba(0,0,0,0);
    box-shadow:0 0 0 rgba(0,0,0,0);
    margin-left: 30%;
}
.map{
   height: 400px;
   /* background-image: url(/static/img/map.png) ; */
   /* background-repeat: no-repeat; */
   background-size: contain;
}
.chapter{
   font-size: 30px;
   line-height: 70px;
   text-align:center;
   margin-bottom:3px;
   height: 80px;
   width: 100px;
   /* background-color: #7fffa0; */
   background-image: url(/static/img/gk.png) ;
   background-repeat: no-repeat;
   cursor: pointer;
}

</style>
