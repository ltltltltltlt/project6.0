//判断正负
function getSymbol(num){
  return num==0 ? 1 : num/Math.abs(num);
}
//判别小数.整数.left.right.
function inFl(str,obj){
  var reIn = /-?\d+\s*$/g; 
  var reFl = /-?\d+\.\d+\s*$/g;
  var reIndex = /\d+/g;
  var reLeft = /left/;
  var reRight = /right/;
  var reBanana = /banana/;
  var reBridge = /bridge/;
  var reIsland = /island/;
  var reTurtle = /turtle\s*$/;     
  var rePanda = /panda\s*$/;     
  if(reFl.test(str)){
    return parseFloat(str.match(reFl)[0]);
  }else if(reIn.test(str)){
    return parseFloat(str.match(reIn)[0]);
  }else if(reLeft.test(str)){
    return -90;
  }else if(reRight.test(str)){
    return 90;
  }else if(reBanana.test(str)){
    if(reIndex.test(str)){
      var index = parseInt(str.match(reIndex)[0]);
      return calcuAngle(game.physics.arcade.angleBetween(obj, banana.getChildAt(index)),obj);
    }else{
      return calcuAngle(game.physics.arcade.angleBetween(obj, banana.getChildAt(0)),obj);
    }
  }else if(reBridge.test(str)){
    return calcuAngle(game.physics.arcade.angleBetween(obj, bridge.getChildAt(0)),obj);
  }else if(reTurtle.test(str)){
    if(obj == turtle.obj){
      return 0
    }else{
      if(turtle.obj){
        return calcuAngle(game.physics.arcade.angleBetween(obj, turtle.obj),obj);
      }
    }   
  }else if(rePanda.test(str)){
    if(obj == panda.obj){
      return 0;
    }else{
      return calcuAngle(game.physics.arcade.angleBetween(obj, panda.obj),obj);
    }   
  }else if(reIsland.test(str)){
    if(reIndex.test(str)){
      var index = parseInt(str.match(reIndex)[0]);
      return calcuAngle(game.physics.arcade.angleBetween(obj, island.getChildAt(index)),obj);
    }else{
      return calcuAngle(game.physics.arcade.angleBetween(obj, island.getChildAt(0)),obj);
    }
  }
}
function  calcuAngle(an,obj){
  an = getSymbol((an*180)/Math.PI) == -1 ? 180+(an*180)/Math.PI : (an*180)/Math.PI-180;
  if(getSymbol(an) == getSymbol(obj.angle)){
    debugAn = an - obj.angle;
  }else if(Math.abs(-(obj.angle - an))<180){
    debugAn = -(obj.angle - an)
  }else{
    debugAn = -(obj.angle - an) < 0 ? 360-(obj.angle - an) : -(obj.angle - an)-360
  }
  debugAn = Math.round(debugAn);
  return debugAn;
}