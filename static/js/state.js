function loadState(){
  this.preload = function(){
    game.load.image('progress','/static/img/game-img/progress.png');
    game.load.image('progressImg','/static/img/game-img/cover.png');
  }
  this.create = function(){
    game.state.start('state');
  }
}
function state(){
  var progressText;                    //百分比文字 
  var d = initData[levelNum];
  var bush;                            //灌木丛组
  var afterColliOnoff = false;         //碰撞后重新创建对象开关
  var distance;                        //尺子测量的距离
  var river;
  var river2;
  var splash;
  var splashAnim;
  var riverOnoff = true;               //panda与河流碰撞开关
  var lakeOnoff = true;                //panda与lake碰撞开关
  var allCollOnoff = true;             //所有的碰撞检测完后再测试是否通关
  var objName = {a:1};
  var bMap;
  var lMap;
  var shade;
  
  this.init = function(){   
    game.add.image(0,0,'progressImg');
    var progress = game.add.image(game.world.centerX,game.world.centerY,'progress')
    progress.anchor = {x:0.5,y:0.5};
    progressText = game.add.text(game.world.centerX+200,game.world.centerY+5,'0%',{fill:'#000',fontSize:'30px'})
    progressText.anchor = {x:0.5,y:0.5};
  }
  this.preload = function(){ 
    if (d.lM == true) {
      game.load.spritesheet('lake','/static/img/game-img/lake.png',600,720)
    }else{
      game.load.spritesheet('bg','/static/img/game-img/bg.png',600,720);
    }

    game.load.image('rulerBase','/static/img/game-img/ruler_base.png');
    game.load.image('disObj','/static/img/game-img/distanceobj.png',3,5);
    game.load.spritesheet('banana','/static/img/game-img/banana_w_frozen.png', 103,98)
    game.load.spritesheet('panda','/static/img/game-img/monkey_all.png',77,90);
    game.load.spritesheet('ruler','/static/img/game-img/new.png',58,56);
    game.load.audio('eatAudio','/static/audio/eat.wav');
    game.load.audio('walkAudio','/static/audio/walk.wav');

    if(d.iL == true){
      game.load.spritesheet('island','/static/img/game-img/island.png',74,68)
    }

    if (d.tA == true) {
      game.load.spritesheet('turtle','/static/img/game-img/turtle.png',160,106)
    }
    if(d.buA == true){
      game.load.image('bush','/static/img/game-img/bush.png');
    }
    if(d.rA == true){
      game.load.spritesheet('river','/static/img/game-img/river.png',600,110);
    }
    if (d.r2A == true) {
      game.load.spritesheet('river2','/static/img/game-img/river2.png',600,123);
      game.load.spritesheet('shade','/static/img/game-img/shade.png',600,200)
    }
    if(d.brA == true){
      game.load.image('bridge','/static/img/game-img/bridge.png');
    }    
    if(d.rA == true||d.r2A == true||d.lM == true){
      game.load.spritesheet('splash','/static/img/game-img/splash.png',83,108);
    }
    game.load.onFileComplete.add(function(progress){
      progressText.text = progress + '%';
    })
  }
  this.create = function(){
    if(d.lM == true){
      lMap = game.add.sprite(0,0,'lake');
      game.physics.enable(lMap, Phaser.Physics.ARCADE);
      lMap.inputEnabled = true;
      lMap.events.onInputOver.add(hideName);
    }else{
      bMap = game.add.sprite(0,0,'bg');
      game.physics.enable(bMap, Phaser.Physics.ARCADE);
      bMap.inputEnabled = true;         
      bMap.events.onInputOver.add(hideName); 
    }

    if(d.iL == true){
      island = game.add.group();
      island.enableBody = true;
      island.physicsBodyType = Phaser.Physics.ARCADE;
      for (var i = 0; i < d.iN; i++) {
        var il = island.create(d.iXY[i].iX,d.iXY[i].iY,'island');
        if(d.iN == 1){
          il.name = 'island';
        }else{
          il.name = 'island['+(i+1)+']';
        }
        il.anchor.setTo(0.5,0.5);
        il.inputEnabled = true;
        il.input.useHandCursor = true;              
        il.events.onInputOver.add(showName,this); 
        il.events.onInputOut.add(hideName);
      }
    }

    if(d.rA == true){
      river = game.add.sprite(d.rX,d.rY,'river');
      game.physics.enable(river, Phaser.Physics.ARCADE);
      //river.anchor.setTo(0.5,0.5);
      river.body.setSize(600,7,0,60)
    }

    if(d.r2A == true){
      shade = game.add.group();
      shade.enableBody = true;
      shade.physicsBodyType = Phaser.Physics.ARCADE;
      shade.create(0,d.tY+90,'shade');
      shade.create(0,d.tY-90,'shade');
      river2 = game.add.sprite(d.r2X,d.r2Y,'river2');
      game.physics.enable(river2, Phaser.Physics.ARCADE);
      river2.body.setSize(600,37,0,40);
    }

    if(d.brA == true){
      bridge = game.add.group();
      bridge.enableBody = true;
      bridge.physicsBodyType = Phaser.Physics.ARCADE;
      for (var i = 0; i < d.brN; i++) {
        var br = bridge.create(d.brXY[i].brX,d.brXY[i].brY,'bridge');
        if(d.brN == 1){
          br.name = 'bridge';
        }else{
          br.name = 'bridge['+(i+1)+']';
        }
        br.anchor.setTo(0.5,0.5);
        br.body.setSize(5, 102, 53, 0);
        br.inputEnabled = true;
        br.input.useHandCursor = true;              
        br.events.onInputOver.add(showName,this); 
        br.events.onInputOut.add(hideName);
      }
    }
    if (d.tA == true) {
      turtleMsg(d);
      //turtle.obj = game.add.sprite(d.tX,d.tY,'turtle',0);
    }

    bananaMsg(d);  

    if(d.buA == true){
      bush = game.add.group();
      bush.enableBody = true;
      bush.physicsBodyType = Phaser.Physics.ARCADE;
      for (var i = 0; i < d.buN; i++) {
        var bu = bush.create(d.buXY[i].buX,d.buXY[i].buY,'bush');
        bu.name = 'bush['+(i+1)+']';
        bu.anchor.setTo(0.5,0.5);
        bu.body.immovable = true;
        bu.body.setSize(33, 36, 12, 0);
        // bu.inputEnabled = true;         
        // bu.events.onInputOver.add(hideName); 
      }
    }
  
    pandaMsg(d);       

    if(d.rA == true||d.r2A == true||d.lM == true){
      splash = game.add.sprite(0,0,'splash');
      splash.exists = false;
      splashAnim = splash.animations.add('splashAnim',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);
      splashAnim.onComplete.add(fallRiver);
      function fallRiver(){          
        conStepOnoff = false;
        num = 0;          
        vm.runName = 'start';
        runOnoff = false;
        alert('别掉入河里');
        rebulidObj();
        riverOnoff = true;
        lakeOnoff = true;
        allCollOnoff = true;
      }
    }
    
    rulerBase = game.add.image(2,2,'rulerBase');
    rulerBase.inputEnabled = true;
    
    
    ruler = game.add.sprite(2,2,'ruler',0);
    game.world.moveUp(panda); 
    ruler.inputEnabled = true;                      //开启事件操作
    ruler.input.useHandCursor = true;               //手型
    ruler.events.onInputUp.add(openOnoff);          //鼠标开启ruler事件
    ruler.events.onInputOver.add(overFrame);        //鼠标移入ruler事件
    ruler.events.onInputOut.add(outFrame);          //鼠标移除ruler事件
  
    pointer = game.input.activePointer;
    
    soundManager = game.sound;
    eatAudio = game.add.audio('eatAudio');
    walkAudio = game.add.audio('walkAudio');
    
    game.physics.enable(ruler, Phaser.Physics.ARCADE);

    // panda.obj.body.newVelocity.set(0,100);
    // game.add.tween(panda.obj.body).to( { y: 100 } )
    
  };
  this.update = function(){   
    if (overlOnoff == true) {
      //监控碰撞        
      game.physics.arcade.overlap(panda.obj, banana, collisionHandler, null, this);                     
    }

    //湖泊与panda碰撞
    if(lMap&&!game.physics.arcade.overlap(panda.obj, turtle.obj, function(){}, null, this)&&!game.physics.arcade.overlap(panda.obj,island, function(){}, null, this)&&lakeOnoff == true){
      game.physics.arcade.overlap(panda.obj, lMap,function(){
        lakeOnoff = false;
        panda.walk.stop();
        panda.obj.body.velocity.set(0,0);
        walkAudio.stop();
        splash.x = panda.obj.body.x;
        splash.y = panda.obj.body.y;
        splash.exists = true;
        drown.play(30,false,true);        
        splashAnim.play(20,false); 
      }, null, this);
    }

    //河流碰撞
    if(turtle.obj){
      if(!game.physics.arcade.overlap(panda.obj, turtle.obj, function(){}, null, this)&&!game.physics.arcade.overlap(panda.obj, bridge, function(){}, null, this)&&riverOnoff == true)
      {      
        game.physics.arcade.overlap(panda.obj, river,drownComplete)
      }
      if(!game.physics.arcade.overlap(panda.obj, turtle.obj, function(){}, null, this)&&!game.physics.arcade.overlap(panda.obj, bridge, function(){}, null, this)&&riverOnoff == true)
      {      
        game.physics.arcade.overlap(panda.obj, river2,drownComplete)
      }
      if(turtle.stepOnoff&&shade){
        game.physics.arcade.overlap(turtle.obj, shade, function(){
          turtle.stepOnoff = false;
          turtle.obj.body.velocity.set(0,0);
          game.time.events.add(Phaser.Timer.SECOND * 2, stepComplete,this);          
        }, null, this);
        if(turtle.obj.y>291){
          turtle.obj.y=291;
        }
        if(turtle.obj.y<228){
          turtle.obj.y=228;
        }
      }
      // if(turtle.stepOnoff&&island){
      //   game.physics.arcade.overlap(turtle.obj, island, function(){
      //     turtle.stepOnoff = false;
      //     turtle.obj.body.velocity.set(0,0);
      //     stepComplete();          
      //   }, null, this);
      // }     
    }else{
      if(!game.physics.arcade.overlap(panda.obj, bridge, function(){}, null, this)&&riverOnoff == true)
      {      
        game.physics.arcade.overlap(panda.obj, river,drownComplete)
      }
      if(!game.physics.arcade.overlap(panda.obj, bridge, function(){}, null, this)&&riverOnoff == true)
      {      
        game.physics.arcade.overlap(panda.obj, river2,drownComplete)
      }
    }

    function drownComplete(p,r){
      riverOnoff = false;
      allCollOnoff = false;
      panda.walk.stop();
      panda.obj.body.velocity.set(0,0);
      walkAudio.stop();
      if(panda.obj.y+panda.obj.height>=r.y+r.height){
        splash.x = panda.obj.body.x-12;
        splash.y = panda.obj.body.y-26;
      }else{
        splash.x = panda.obj.body.x-10;
        splash.y = panda.obj.body.y-10;
      }
      
      splash.exists = true;
      drown.play(30,false,true);        
      splashAnim.play(20,false); 
    }
    
    
    //检测与灌木丛碰撞
    game.physics.arcade.collide(panda.obj, bush,function(){
      if(colliOnoff == true){
        allCollOnoff = false;
        colliOnoff = false;
        conStepOnoff = false;
        num = 0;
        walkAudio.stop();
        vm.runName = 'start';
        alert('请绕开草丛');
        afterColliOnoff = true;
        runOnoff = false;
      }
    });
    if(afterColliOnoff == true){
      afterColliOnoff = false;  
      allCollOnoff = true;    
      rebulidObj();
    }

    if(turtle.xOnoff == true){     
      panda.obj.x = turtle.obj.x - turtle.awayX;
      panda.obj.y = turtle.obj.y - turtle.awayY;
    }
    if(turtle.rOnoff == true){     
      panda.obj.angle = turtle.obj.angle - turtle.awayR;
    }
        
    controlRuler();    //监控ruler开启事件

    if(conStepOnoff == true){ 
      //监控step停止                           
      controlStep(runObj,inputDis,inputSym,x);    
    }

    //执行代码
    if(lineOnoff == true&&runOnoff == true){
      //执行代码
      run(arr);    
    }

    //代码执行完进行判断
    if(testOnoff==true&&bananaOnoff==true&&allCollOnoff==true){
      testOnoff = false;
      if(banana.countLiving()==0){
        vm.runName = 'start';
        soundManager.stopAll();       
        // var c = confirm('下一关吗');
        if(objName){
          hideName();
        }
        vm.fStar = true;
        vm.sStar = true;
        vm.tStar = true;
        vm.sussessDialogVisible = true;
        // if(c == true){
		  //levelNum从sessionStorage中读取到的话肯定是字符串类型，要转成数字类型
		  // var LNum = parseInt(levelNum) + 1;
      //     vm.taValue = taValueArr[LNum];
      //     levelNum++;
		  
		  //改变父页面的导航栏
		  // var papa = window.parent.document.getElementById("level").getElementsByTagName("span")[0];
		  // papa.innerHTML = levelNum;
		  
      //     closeOnoff();
      //     if(turtle.obj){
      //       turtle.obj = null;
      //     }     	  
      //     game.state.remove('state');
      //     game.state.add('state',state); 
      //     game.state.start('loadState');   
           
        // }else{
        //   vm.runName = 'start';
        //   if(objName){
        //     hideName();
        //   }
        //   rebulidObj();         
        // }
      }else if(banana.countLiving() != 0){
        vm.runName = 'start';
        vm.falseDialogVisible = true;
        if(objName){
          hideName();
        }     
       // rebulidObj();
      }
    }
    
  }
  this.render =function() {
    if(disOnoff == true){
      //渲染测量距离
      distance = Math.round((game.physics.arcade.distanceToPointer(disObj,pointer)-20)/20);    //计算和转化距离       
      if(distance < 0){
        distance = 0;
      }
      game.debug.pointer(pointer);                                                             //测量距离
      game.debug.text(distance,pointer.clientX+10,pointer.clientY+10,'#000','32px Simsun');    //显示距离 
      if(circle){
        circle.destroy();
      }
      if(levelNum>=7){
        debugAngle(panda.obj);
        if(turtle.obj){
          debugAngle(turtle.obj);
        }
      }         
    }else{
      game.debug.reset();
      if(circle){
        circle.destroy();
      }
    }
  }

  function debugAngle(obj){
    var minX = obj.x-70/2;
    var maxX = obj.x+70/2;
    var minY = obj.y-75/2;
    var maxY = obj.y+75/2;
    var debugAn;
    var cY = 40;
    if(disObj.x>=minX&&disObj.x<=maxX&&disObj.y>=minY&&disObj.y<=maxY){
      var an = game.physics.arcade.angleToPointer(obj, pointer) 
      debugAn = calcuAngle(an,obj);
      game.debug.text(debugAn,disObj.x+20,disObj.y-20,'#FFFFFF','22px Simsun');    //显示距离 
      if(debugAn<0){
        cY += 10;
      }
      if(Math.abs(debugAn)>=10){
        cY += 10;
      } 
      if(Math.abs(debugAn)>=100){
        cY += 10;
      }
      if(circle){
        circle.destroy();
      }
      circle = game.add.graphics(0,0);
      circle.lineStyle(1,0xFFFFFF)
      circle.drawCircle(disObj.x+cY,disObj.y-35,4);
    }
  } 
}
//当重新挑战时重新创建对象
function rebulidObj(){  
  if(turtle.obj){
    turtle.obj.destroy();
    turtleMsg(initData[levelNum]);
  }
  banana.destroy();
  bananaMsg(initData[levelNum]);

  panda.obj.destroy();
  pandaMsg(initData[levelNum]);
  
  game.world.bringToTop(ruler);         //将尺子带到这个的顶部 覆盖住新创建的panda
}
function showName(obj){
  if(obj ==  panda.obj){
    objName = game.add.text(obj.x-40,obj.y-54,obj.name);
  }else{
    objName = game.add.text(obj.x-50,obj.y-43,obj.name);
  }
  objName.fontSize = 28;
  objName.fill = '#FFFFFF';
}
function hideName(){
  try {
    if(objName){
      objName.destroy();
    }
  } catch (error) {
    
  }
}
function pandaMsg(d){
  panda.obj = game.add.sprite(d.pX,d.pY,'panda',0);
  panda.obj.name = 'panda';
  panda.obj.anchor.setTo(0.5, 0.5);  //设置中心点
  
  panda.obj.rotation = d.pR*Math.PI/180;      
  panda.walk = panda.obj.animations.add('walk',[0,1,2,3,4,5,6,7,8],30,true);
  drown = panda.obj.animations.add('drown',[11,12,13,14,15,16,17,18,19]);
  game.physics.enable(panda.obj, Phaser.Physics.ARCADE);
  panda.obj.enableBody = true;
  panda.obj.physicsBodyType = Phaser.Physics.ARCADE;
  panda.obj.body.setSize(66, 66, 14, 14);
  panda.obj.inputEnabled = true;
  panda.obj.input.useHandCursor = true;              
  panda.obj.events.onInputOver.add(showName,this); 
  panda.obj.events.onInputOut.add(hideName);

  // panda.obj.body.velocity.x = 10;
  // panda.obj.body.velocity.y = 10; 
  //panda.obj.pivot.y =100;
  //alert([panda.obj.body.x,panda.obj.body.y,panda.obj.width,panda.obj.height,])
}
function bananaMsg(d){
  banana = game.add.group();
  banana.enableBody = true;
  banana.physicsBodyType = Phaser.Physics.ARCADE;
  for (var i = 0; i < d.bN; i++) {
    var b = banana.create(d.bXY[i].bX,d.bXY[i].bY,'banana');
    b.name = d.bN == 1 ? 'banana' : 'banana['+i+']';
    b.anchor.setTo(0.5,0.5);
    b.body.setSize(46, 20, 34, 38);
    b.animations.add('alive',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],30,true);
    b.animations.play('alive');
    b.inputEnabled = true;
    b.input.useHandCursor = true;              
    b.events.onInputOver.add(showName,this); 
    b.events.onInputOut.add(hideName);
  }
}
function turtleMsg(d){
  turtle.obj = game.add.sprite(d.tX,d.tY,'turtle',0);
  turtle.walk = turtle.obj.animations.add('swim',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],30,true);
  turtle.obj.name = 'turtle';
  turtle.obj.anchor.setTo(0.5, 0.5);  //设置中心点
  turtle.obj.rotation = d.tR*Math.PI/180;      
  game.physics.enable(turtle.obj, Phaser.Physics.ARCADE);
  turtle.obj.enableBody = true;
  turtle.obj.physicsBodyType = Phaser.Physics.ARCADE;
  //turtle.obj.body.setSize(66, 66, 14, 14);
  turtle.obj.inputEnabled = true;
  turtle.obj.input.useHandCursor = true;              
  turtle.obj.events.onInputOver.add(showName,this); 
  turtle.obj.events.onInputOut.add(hideName);
}

