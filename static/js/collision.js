//碰撞执行的函数
function collisionHandler(p,b){
  overlOnoff = false;           //关闭碰撞监控开关
  bananaOnoff = false;
  eatAudio.play('',0,0.2);
  var bDeadAnima = b.animations.add('kill',[18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]);
  bDeadAnima.onComplete.add(openColliOnoff,b);    
  bDeadAnima.play(30,false);            //执行碰撞后的动画 并杀死该精灵对象
}
//动画完成执行的函数
function openColliOnoff(b){ 
  b.kill(); 
  eatAudio.stop();
  overlOnoff = true;            //开启碰撞监控开关
  bananaOnoff = true;  
  //alert(banana.countLiving())
}

