<template>
  <div id="t">
    <el-dialog  :visible.sync="dialogFirstVisible"  @close="hideFirst" class="tips">
      <div class="animated bounceInLeft tipscode" id="tipscode">
        <img src="../../assets/images/arrow.png">
        <div class="tipsWord" >这个输入框可以输入js代码让小熊猫吃到香蕉哦</div>
        <el-button type="primary" @click="hideFirst" class="tipsKnow">我知道啦</el-button>
      </div>
    </el-dialog>
    <el-dialog  :visible.sync="dialogSecondVisible"  @close="hide" class="tips">
      <div class="animated bounceInLeft tipsRun" id="tipsRun">
        <img src="../../assets/images/arrow.png">
        <div class="tipsWord">记得要点击这里运行，不然小熊猫就不会走</div>
        <el-button type="primary" @click="hide" class="tipsKnow">我知道啦</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import "../../assets/css/animate.min.css"
export default {
  data(){
    return{
      dialogSecondVisible:false,
	  }
  },
  props:['tipsShow'],
  computed:{
      dialogFirstVisible:{
      get:function(){
        return this.tipsShow;
      },
      set:function(){
      }
    }
  },
  methods:{
    hideWord(){
      var tipsCode = document.getElementById("tipscode");
      tipsCode.setAttribute("class","cannotSee");
    },
    hideTips(){
      var tipsCode = document.getElementById("tipsRun");
      tipsRun.setAttribute("class","cannotSee");
    },
    hideFirst(){
      //关闭模态框
      this.dialogFirstVisible = false;
      //隐藏文字
      this.hideWord();
      //打开第二个模态框
      this.dialogSecondVisible = true;
    },
    hide(){
      this.dialogSecondVisible = false;
      // this.hideTips();
      this.$emit('tipsReceive');
    },

  }
}
</script>
<style>
.el-input{
  width:93%;
}
#t .el-dialog{
    /*提示框背景去除*/
    /*background: transparent;*/
    background:rgba(255,255,255,0);
    -moz-box-shadow:0 rgba(0,0,0,0);
    -webkit-box-shadow:0 rgba(0,0,0,0);
    box-shadow:0 0 0 rgba(0,0,0,0);
    margin-left: 30%;
}
.tipscode{
    position: absolute;
    width: auto;
    height: 300px;
    margin-top:50px;
}
.tipscode img{
    width: 200px;
    margin-left: 130px;
    transform:rotate(270deg);
    -ms-transform:rotate(270deg); 	/* IE 9 */
    -moz-transform:rotate(270deg); 	/* Firefox */
    -webkit-transform:rotate(270deg); /* Safari 和 Chrome */
    -o-transform:rotate(270deg); 	/* Opera */
}
.tipscode div{
    padding-top: 30px;
}
.tipsWord{
  color:#fff;
  font-size:30px;
  margin-top:50px;
}
.tipsKnow{
  margin-top:20px;
  margin-left:180px;
  background-color: #333300;
}
.tipsRun{
  position: absolute;
  width:800px;
  margin-left: 50%;
}
.tipsRun img{
    width: 200px;
    margin-left: 160px;
}
.cannotSee{
  display:none !important;
}
</style>

