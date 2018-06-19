//执行与step有关函数
function beforeStep(str,obj){ 
  if(obj == turtle.obj){
    turtle.stepOnoff = true;
    var minX = obj.x-obj.width/2;
    var maxX = obj.x+obj.width/2;
    var minY = obj.y-obj.height/2-panda.obj.height/4;
    var maxY = obj.y+obj.height/2+panda.obj.height/4;
    if(panda.obj.x>=minX&&panda.obj.x<=maxX&&panda.obj.y>=minY&&panda.obj.y<=maxY){
       turtle.xOnoff = true;
       turtle.awayX = obj.x - panda.obj.x;
       turtle.awayY = obj.y - panda.obj.y;
    }
  }
  var distance = inFl(str)*20;                       //获取step步数
  if(distance==0){                                   //若step为0，直接跳过
    stepComplete(obj);
  }else{
    inputSym = getSymbol(distance);                  //获取step正负，是向前走还是向后走
    inputDis = getDistance(obj,distance);            //将step停止时x方向上的路程赋予inputDis
    x = obj.x;                                       //将出发时x坐标赋予x
    y = obj.y;                                       //将出发时y坐标赋予y
    conStepOnoff = true;                             //开启 停止step 监控开关
    startStep(obj,inputSym);                         //开始step
  } 
}
//判断step停止时x方向上的路程
function getDistance(obj,distance){
  var angle = obj.rotation*180/Math.PI;
  if(angle==0||angle==-180||angle==90||angle==-90){
    return Math.abs(distance);    
  }else{
    return Math.abs(distance*Math.cos(obj.rotation));
  }
}
//计算step的方向，并开始step
function startStep(obj,symbol){
  var angle = obj.rotation*180/Math.PI;
  var disSym = symbol;   //用户输入数值的符号
  var angSym = -getSymbol(angle);
  var tan = Math.tan(obj.rotation);
  var speed = 180;   //行走速度
  var num = disSym*angSym*speed;     
  if(obj == panda.obj){
    panda.walk.play();
  }else{
    turtle.walk.play();
  }
  if(angle==0||angle==-180){
    obj.body.velocity.set(num,0);
    walkAudio.play('',0,0.2,true);   
  }else if(angle==90||angle==-90){
    obj.body.velocity.set(0,num);
    walkAudio.play('',0,0.2,true);         
  }else if(tan>0){
    if(tan<=1){
      obj.body.velocity.set(num,num*tan);
      walkAudio.play('',0,0.2,true);
    }else{
      obj.body.velocity.set(num/tan,num);
      walkAudio.play('',0,0.2,true);
    }
  }else if(tan<0){ 
    if(Math.abs(tan)<=1){
      obj.body.velocity.set(-num,-num*tan);
      walkAudio.play('',0,0.2,true);
    }else{
      obj.body.velocity.set(num/tan,num);
      walkAudio.play('',0,0.2,true);
    }
  }  
}
//监控停止step
function controlStep(obj,inputDis,symbol,x){  
  if((symbol == 1&&(obj.rotation*180/Math.PI<-90||obj.rotation*180/Math.PI>90))||
  (symbol == -1&&obj.rotation*180/Math.PI<90&&obj.rotation*180/Math.PI>-90)){
    if(obj.x>=x+inputDis){
      stepComplete(obj);   
    }
  } 
  if((symbol == 1&&obj.rotation*180/Math.PI<90&&obj.rotation*180/Math.PI>-90)||
  symbol == -1&&(obj.rotation*180/Math.PI<-90||obj.rotation*180/Math.PI>90)){
    if(obj.x<=x-inputDis){
      stepComplete(obj); 
    }
  }
  if(symbol == 1&&obj.rotation*180/Math.PI==90||symbol == -1&&obj.rotation*180/Math.PI==-90){
    if(obj.y<=y-inputDis){
      stepComplete(obj);
    }
  }
  if(symbol == 1&&obj.rotation*180/Math.PI==-90||symbol == -1&&obj.rotation*180/Math.PI==90){
    if(obj.y>=y+inputDis){
      stepComplete(obj);
    }
  }  
}
//step停止执行的函数
function stepComplete(){
  panda.walk.stop();                             //停止动画
  if(turtle.obj){
    turtle.walk.stop();                            //停止动画
  }
  turtle.xOnoff = false;
  turtle.stepOnoff = false;
  walkAudio.stop();
  panda.obj.body.velocity.set(0,0);              //停止step
  if(turtle.obj){
    turtle.obj.body.velocity.set(0,0);
  }  
  num++;                                   //跳到下一行代码
  lineOnoff = true;                        //开启执行代码开关
  conStepOnoff = false;                    //关闭停止step的监控开关 
  //alert(banana.countLiving())
}