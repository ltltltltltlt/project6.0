//开启旋转
function turn(str,obj){
  if(obj == turtle.obj){
    turtleTurn();
  }
  var inputAng = inFl(str,obj);                                           //获取输入旋转角度                                          
  var angle = obj.angle;                                             //获取旋转前角度                                          
  var angSum = angle + inputAng;                                       //计算旋转停止时角度
  var timer = game.time.create(); 
  var count = 0;              
  //创建定时器
  timer.loop(10,turnAngle,game,[timer,obj,inputAng,angSum]);        //添加旋转循环事件
  timer.start();                                                       //开始旋转
  //旋转定时器 监控停止旋转
  function turnAngle([timer,obj,inputAng,angSum]){
    if(getSymbol(inputAng) == 1){
      //输入旋转角度为正值，顺时针转  
      if((obj.angle+count*360) >= angSum){                            //当大于停止时角度 停止旋转
        turnComplete(obj,timer)
      }else{
        obj.angle += 5;                                               //每次旋转5度
        if(obj.angle>=-180&&obj.angle<-175){                       
          count++;                                                       //每转过180度时 加上一周期
        }      
      }
    }else{
      //输入旋转角度为负值，逆时针转
      if((obj.angle-count*360) <= angSum){                            //当小于停止时角度 停止旋转
        turnComplete(obj,timer);
      }else{
        if(obj.angle == -180){
          count++;
          obj.angle -= 5;
        }else{
          obj.angle -= 5;                                               //每次旋转5度
          if(obj.angle>175&&obj.angle<=180){
            count++;                                                       //每转过-180度时 减少一周期
          }
        }           
      }
    }
  }
  //旋转停止执行函数
  function turnComplete(obj,timer){
    obj.angle = angSum;    //当输入度数不是5的倍数时，令旋转度数变为输入度数
    if(turtle.rOnoff){
      turtle.rOnoff = false;
      panda.obj.pivot.x =0;
      panda.obj.pivot.y =0;
      panda.obj.x = panda.obj.body.x+22;
      panda.obj.y = panda.obj.body.y+31;      
    }
    timer.stop();             //停止定时器
    timer.removeAll();        //清除定时器事件 
    num++;                    //跳转到下一行代码
    count = 0;                //令周期回到初始值0
    lineOnoff = true;
  }
}
function turtleTurn(){
  var minX = turtle.obj.x-turtle.obj.width/2;
  var maxX = turtle.obj.x+turtle.obj.width/2;
  var minY = turtle.obj.y-turtle.obj.height/2-panda.obj.height/4;
  var maxY = turtle.obj.y+turtle.obj.height/2+panda.obj.height/4;
  if(panda.obj.x>=minX&&panda.obj.x<=maxX&&panda.obj.y>=minY&&panda.obj.y<=maxY){
    var x = Math.abs(turtle.obj.x - panda.obj.x);
    var y = Math.abs(turtle.obj.y - panda.obj.y);
    var an = game.physics.arcade.angleBetween(panda.obj,turtle.obj)*180/Math.PI-panda.obj.angle;
    if(an>180){
      while(an>180){
        an -= 180;
      }
      an = -180+an;
    }
    if(an<=-180){
      while(an<=-180){
        an += 180;
      }
      an = 180+an;
    }
    if(an>=0&&an<90){
      panda.obj.pivot.x =y+6;
      panda.obj.pivot.y =x;
    }else if(an>=90&&an<=180){
      panda.obj.pivot.x =-y-6;;
      panda.obj.pivot.y =x;
    }else if(an>-180&&an<=-90){
      panda.obj.pivot.x =-y-6;
      panda.obj.pivot.y =-x;
    }
    else if(an>-90&&an<0){
      panda.obj.pivot.x =y+6;
      panda.obj.pivot.y =-x;
    }
    panda.obj.x = turtle.obj.x
    panda.obj.y = turtle.obj.y            
    turtle.awayR = turtle.obj.angle - panda.obj.angle;
    turtle.rOnoff = true;
  }  
}


