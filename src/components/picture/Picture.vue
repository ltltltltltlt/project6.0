<template>
  <div>
    <el-dialog title="头像修改" :visible.sync="dialogFormVisible" @close="hide" >
      <el-row>
        <el-col :span=10 class="left-img">
          <div id="imgUrl">
            <img :src="src" />
          </div>
        </el-col>
        <el-col :span=14>
          <div class="right-img">
            <table >
              <tr >
                <td v-cloak v-for="(item,index) in imgData1" class="picChange">
                  <img :src="item.url" @click="changeSrc(item.url)" >
                </td>
              </tr>
              <tr >
                <td v-cloak v-for="(item,index) in imgData2" class="picChange">
                   <img :src="item.url" @click="changeSrc(item.url)" >
                </td>
              </tr>
              <tr >
                <td v-cloak v-for="(item,index) in imgData3" class="picChange">
                    <img :src="item.url" @click="changeSrc(item.url)" >
                </td>
              </tr>
            </table>
            </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="hide">取 消</el-button>
      </div>
    </el-dialog>
   </div>
</template>
<script>
export default{
  data(){
    return{
      src:'/static/img/avatar00.png',
      imgData1:[
              {url:'/static/img/avatar00.png'},
              {url:'/static/img/avatar01.png'},
              {url:'/static/img/avatar02.png'},
              {url:'/static/img/avatar03.png'},
      ],
      imgData2:[
              {url:'/static/img/avatar04.png'},
              {url:'/static/img/avatar05.png'},
              {url:'/static/img/avatar06.png'},
              {url:'/static/img/avatar07.png'},
      ],
      imgData3:[
              {url:'/static/img/avatar08.png'},
              {url:'/static/img/avatar09.png'},
              {url:'/static/img/avatar10.png'},
              {url:'/static/img/avatar11.png'},
      ],
    }
  },
  //props:['pictureShow','user_name','role'],
  props:['pictureShow'],
    computed:{
        dialogFormVisible:{
        get:function(){
          return this.pictureShow;
        },
        set:function(){}
      }
    },
  methods:{
    changeSrc(img){
      this.src = img
    },
    hide(){
      this.$emit('pictureReceive');
    },
    save(){
     //这个图像提交到后台保存
	 var icon = document.getElementById("imgUrl").getElementsByTagName("img")[0];
	 this.$ajax.post('/Info/saveAlt', {
	            username:sessionStorage.username,
                icon:icon.src,
                role:sessionStorage.role
    }, {emulateJSON: true}).then((response) => {
          if (response.data.status === '1') {
		      //保存头像成功
          alert(JSON.stringify(response.data.msg))
			 
			   //修改sessionStorage的icon
			   sessionStorage.icon = icon.src;
         //this.$router.push({path: '/Personal',query: {src: icon.src}})
			    //this.$emit('src',icon.src);
			    this.$emit('pictureReceive');
          }
          else if (response.data.status === '-1') {
		        //保存头像失败
            alert(JSON.stringify(response.data.msg))
          }

        }).catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>
<style scoped>
.left-img{
text-align:center;
}
table{
border-spacing:20px;
}
td{
padding-right:20px;
width:80px;
height:80px;
}
.right-img img{
width:70px;
height:70px;
}
</style>
