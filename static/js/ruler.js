function controlRuler(){
  //点击开启ruler
  if(rulerOnoff == true){
    ruler.frame = 1;                                                          //改变ruler精灵图帧数
    ruler.inputEnabled = false;                                               //关闭ruler事件操作
    ruler.input.useHandCursor = false;
    ruler.x = pointer.x-25;                                        //开启手型
    ruler.y = pointer.y-26;
    closeShowName();                             
    //game.physics.arcade.moveToPointer(ruler,4000);                            //ruler跟随指针移动
    // if (Phaser.Rectangle.contains(ruler.body, game.input.x, game.input.y))    
    // {
    //     ruler.body.velocity.setTo(0, 0);                                      //ruler靠近指针不再移动
    // }
    rulerBase.events.onInputUp.add(closeOnoff);                               //给rulerBase添加事件:点击rulerBase关闭ruler开关
    rulerBase.events.onInputOver.add(closeAddObj);                            //鼠标移入rulerBase不能测量，防止与关闭ruler开关事件冲突
    rulerBase.events.onInputOut.add(openAddObj);                              //鼠标移出rulerBase才能测量
  }else{
    //ruler关闭
    ruler.body.x = 2;
    ruler.body.y = 2;
    ruler.inputEnabled = true;
    ruler.input.useHandCursor = true;
    openShowName();
    rulerBase.events.onInputUp.remove(closeOnoff);
    rulerBase.events.onInputOver.remove(closeAddObj);                          
    rulerBase.events.onInputOut.remove(openAddObj);
  }
}
//开启ruler开关
function openOnoff(){                                                                  
  rulerOnoff = true;                                                     
}
//关闭ruler开关
function closeOnoff(){                 
  disOnoff = false;                    //关闭测量开关
  rulerOnoff = false;                  //关闭ruler开关
  game.debug.reset();                  //清除测量的距离
  if(disObj){ 
    disObj.destroy();                  //清除透明obj
  }
  if(circle){
    circle.destroy();
  }
}
//鼠标移入rulerBase 关闭测量
function closeAddObj(){
  game.input.onDown.remove(addObj);    
}
//鼠标移出rulerBase 才可以测量
function openAddObj(){
  game.input.onDown.add(addObj);          
}
//鼠标移入ruler 改变帧数
function overFrame(){
  ruler.frame = 1;      
}
//鼠标移出ruler 改变帧数
function outFrame(){
  ruler.frame = 0;
}
//选择测量起点
function addObj(){
  if(disObj){
    disObj.destroy();                                        //清除透明obj
  };
  
  disObj = game.add.image(pointer.x,pointer.y,'disObj');     //创建透明obj，期x,y为测量起点
  disOnoff = !disOnoff;                                      //测量开关
}
function openShowName(){
  panda.obj.inputEnabled = true;
  panda.obj.input.useHandCursor = true;
  if(turtle.obj){
    turtle.obj.inputEnabled = true;
    turtle.obj.input.useHandCursor = true; 
  }                                       
  banana.forEachExists(function(b){
    b.inputEnabled = true;
    b.input.useHandCursor = true;
  })
  if(bridge){
    bridge.forEachExists(function(b){
      b.inputEnabled = true;
      b.input.useHandCursor = true;
    })
  }
  if(island){
    island.forEachExists(function(i){
      i.inputEnabled = true;
      i.input.useHandCursor = true;
    })
  }
}
function closeShowName(){
  panda.obj.inputEnabled = false;
  if(turtle.obj){                                       
    turtle.obj.inputEnabled = false; 
  }                                       
  banana.forEachExists(function(b){
    b.inputEnabled = false;
  })
  if(bridge){
    bridge.forEachExists(function(b){
      b.inputEnabled = false;
    })    
  }
  if(island){
    island.forEachExists(function(i){
      i.inputEnabled = false;
    })
  }
}
