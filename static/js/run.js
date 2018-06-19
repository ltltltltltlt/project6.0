function run(arr){ 
  console.log(arr) 
  colliOnoff = true;
  lineOnoff = false;
  var macObject = /^turtle\./;
  var macAction = /step|turn|To/;
  var macTurtle = /^\s*turtle/;
  var macSpace = /^\s*$/;
  if(arr[num]){
    if(macSpace.test(arr[num])){
      num++;                                   //跳到下一行代码
      lineOnoff = true;
    }else{
      runObj = macTurtle.test(arr[num]) == true ? turtle.obj : panda.obj;
      switch(arr[num].match(macAction)[0]){
        case 'step':               
          beforeStep(arr[num],runObj);
          break;
        case 'turn':
          turn(arr[num],runObj);
          break;
        case 'To':
          turn(arr[num],runObj);
          break;
        default:
          alert('111')
      }
    }        
  }else{
    num = 0;
    testOnoff = true;
    runOnoff = false;        
  }
}
function codeArr(id){
  var oTa = document.getElementById(id);
  var str = oTa.value;
  var arr1 = str.split('\n');
  var reLoop = /times/;
  var reD = /\d+/;
  var reSpace = /^\s/;
  var arr2 = [];
  for(var i=0;i<arr1.length;i++){
    if(reLoop.test(arr1[i])){
      var times = parseInt(arr1[i].match(reD)[0]);
      for (var j = 1; j < times; j++) {
        var num = i+1;
        while(reSpace.test(arr1[num])){
          arr2.push(arr1[num]);
          num++;
        }
      }      
    }else{
      arr2.push(arr1[i]);
    }
  }
  arr = arr2;
  lineOnoff = true;
}

