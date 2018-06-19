var taValueArr = [
  'step 15','step 10','step 0','turn left\nstep 15','turn left\n','turn left\nstep 5','','turn -30\nstep 14','','step -5','',
  'turnTo banana\nstep 10','turnTo banana\nstep 15\nturnTo bridge','turtle.step 10','\nturtle.step 10\nstep 5','','turnTo ',
  'turtle.turn left','turtle.turnTo ','','','2.times ->\n   turn left\n   step 15','5.times ->\n    step 6\n    turn -38',
  '5.times ->\n   turn -60\n   ','','3.times ->\n   turn left\n   step 5\n   ','\n3.times ->\n    turtle.step 10\n    turtle.turn right',
  '2.times ->\n    step 10\n    step -10','3.times ->\n    step 8\n    turn -45\n    ',
  'turtle.step 5\nstep 3\n2.times ->\n   turtle.step 10\n   turtle.turn left\nturn left\n'
];

var courseArr = [
  {course:"编程的世界里是从0开始数的。右边的代码区输入代码熊猫使移动并且吃到香蕉。按start按钮运行一下看一下效果吧！"
,errorTips:"检查步数是否对了，用尺子量一下吧！"},
 {course:"右边的代码区有step 15内容，step指的是步数,这句代码的意思就是指要走15步。左上角有个尺子，在熊猫和香蕉上分别点一下就可以知道步数。记得将尺子放回原位哦!"
,errorTips:"检查步数是否对了，用尺子量一下吧！"},
  {course:"左上角有个尺子，在熊猫和香蕉上分别点一下就可以知道步数啦。start again!"
    ,errorTips:"检查步数是否对了，用尺子量一下吧！"},
  {course:"turn指熊猫向转动，这句代码意思指熊猫向右转。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"turn left指熊猫左转。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"熊猫得避开草丛才能吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"熊猫得经过小桥才能吃到香蕉，小心落水。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"turn -30指熊猫逆时针旋转30度。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，模仿上一关卡使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"step -5是指熊猫向后走5步。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，模仿上一关卡使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"turnTo banana指的是一个熊猫旋转45度的函数,45为变量，变量可以更改为你想要的度数。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"turnTo bridge指的是一个熊猫穿过小桥的函数。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"turtle.step指的是一个乌龟移动的函数，后面跟的是变量。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，模仿上一关卡使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"turtle.turn left指的是乌龟向左转，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"turtle.turnTo指的是乌龟旋转函数，后面接度数变量，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},


  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
  {course:"学以致用，结合所学知识使熊猫吃到香蕉。start again!"
    ,errorTips:"检查转向、步数是否对了，用尺子量一下吧！"},
]
//pX：主角起始x坐标
//pY：主角起始y坐标
//pR：主角起始角度
//bN：起始竹子数量
//bXY：储存每个竹子起始坐标
//buA：灌木丛是否存在
//buN: 灌木丛数量
//buXY：每个灌木丛起始坐标
//rA: 河流是否存在
//rX: 河流起始X坐标
//rY: 河流起始Y坐标
//brA: 桥是否存在
//brN:  桥数量
//brXY: 桥起始坐标
//lM: 湖地图
//is: 陆地
var initData = [
  {pX:300,pY:500,pR:90,bN:1,bXY:[{bX:300,bY:180}]},
  {pX:300,pY:500,pR:90,bN:1,bXY:[{bX:300,bY:180}]},
  {pX:100,pY:300,pR:-180,bN:1,bXY:[{bX:520,bY:300}]},
  {pX:100,pY:300,pR:90,bN:1,bXY:[{bX:420,bY:300}]},
  {pX:400,pY:300,pR:90,bN:1,bXY:[{bX:80,bY:300}]},
  {pX:100,pY:500,pR:-180,bN:1,bXY:[{bX:420,bY:180}],buA:true,buN:5,buXY:[{buX:200,buY:280},{buX:250,buY:310},{buX:300,buY:340},{buX:350,buY:370},{buX:400,buY:400}]},
  {pX:420,pY:400,pR:90,bN:1,bXY:[{bX:420,bY:80}],rA:true,rX:0,rY:200,brA:true,brN:1,brXY:[{brX:300,brY:270}]},
  {pX:200,pY:400,pR:-180,bN:1,bXY:[{bX:420,bY:180}],buA:true,buN:2,buXY:[{buX:200,buY:180},{buX:420,buY:400}]},
  {pX:450,pY:500,pR:-180,bN:3,bXY:[{bX:450,bY:180},{bX:130,bY:180},{bX:130,bY:500},],buA:true,buN:7,buXY:[{buX:280,buY:270},{buX:280,buY:340},{buX:280,buY:410},{buX:280,buY:480},{buX:280,buY:550},{buX:280,buY:620},{buX:280,buY:690}]},
  {pX:300,pY:500,pR:0,bN:2,bXY:[{bX:80,bY:500},{bX:520,bY:500}],rA:true,rX:0,rY:200},
  {pX:300,pY:460,pR:135,bN:3,bXY:[{bX:300,bY:140},{bX:80,bY:140},{bX:520,bY:140}],rA:true,rX:0,rY:200,brA:true,brN:1,brXY:[{brX:300,brY:270}]},
  {pX:500,pY:500,pR:90,bN:1,bXY:[{bX:150,bY:260}]},
  {pX:300,pY:460,pR:20,bN:1,bXY:[{bX:420,bY:140}],rA:true,rX:0,rY:200,brA:true,brN:1,brXY:[{brX:300,brY:270}]},
  {pX:100,pY:260,pR:-180,r2A:true,r2X:0,r2Y:200,tA:true,tX:100,tY:260,tR:-180,bN:1,bXY:[{bX:500,bY:260}]},
  {pX:100,pY:120,pR:-90,r2A:true,r2X:0,r2Y:200,tA:true,tX:100,tY:260,tR:-180,bN:2,bXY:[{bX:300,bY:260},{bX:300,bY:360}]},
  {pX:300,pY:140,pR:-90,r2A:true,r2X:0,r2Y:200,tA:true,tX:100,tY:260,tR:-180,bN:1,bXY:[{bX:300,bY:460}],buA:true,buN:6,buXY:[{buX:200,buY:50},{buX:200,buY:110},{buX:200,buY:170},{buX:400,buY:50},{buX:400,buY:110},{buX:400,buY:170}],},
  {pX:460,pY:480,pR:-45,r2A:true,r2X:0,r2Y:200,tA:true,tX:460,tY:260,tR:0,bN:2,bXY:[{bX:300,bY:260},{bX:140,bY:480}],buA:true,buN:10,buXY:[{buX:300,buY:340},{buX:300,buY:380},{buX:300,buY:420},{buX:300,buY:460},{buX:300,buY:500},{buX:300,buY:540},{buX:300,buY:580},{buX:300,buY:620},{buX:300,buY:660},{buX:300,buY:700}]},
  {pX:100,pY:480,pR:90,r2A:true,r2X:0,r2Y:200,tA:true,tX:100,tY:260,tR:90,bN:1,bXY:[{bX:520,bY:260}]},
  {pX:300,pY:480,pR:90,r2A:true,r2X:0,r2Y:200,tA:true,tX:100,tY:260,tR:45,bN:1,bXY:[{bX:520,bY:260}]},
  {lM:true,pX:500,pY:400,pR:90,iL:true,iN:1,iXY:[{iX:50,iY:450}],tA:true,tX:500,tY:400,tR:90,bN:7,bXY:[{bX:500,bY:300},{bX:500,bY:200},{bX:500,bY:100},{bX:410,bY:170},{bX:320,bY:240},{bX:230,bY:310},{bX:140,bY:380},]},
  {lM:true,pX:300,pY:400,pR:90,iL:true,iN:1,iXY:[{iX:300,iY:400}],tA:true,tX:100,tY:100,tR:90,bN:1,bXY:[{bX:500,bY:100}]},
  {pX:450,pY:500,pR:-180,bN:3,bXY:[{bX:450,bY:180},{bX:130,bY:180},{bX:130,bY:500},],buA:true,buN:7,buXY:[{buX:280,buY:270},{buX:280,buY:340},{buX:280,buY:410},{buX:280,buY:480},{buX:280,buY:550},{buX:280,buY:620},{buX:280,buY:690}]},
  {pX:240,pY:500,pR:-180,bN:9,bXY:[{bX:360,bY:500},{bX:440,bY:430},{bX:470,bY:320},{bX:440,bY:210},{bX:360,bY:140},{bX:230,bY:140},{bX:150,bY:210},{bX:130,bY:320},{bX:170,bY:430}]},
  {pX:500,pY:500,pR:150,bN:5,bXY:[{bX:500,bY:280},{bX:310,bY:180},{bX:130,bY:280},{bX:130,bY:500},{bX:310,bY:600},{bX:230,bY:140},{bX:150,bY:210},{bX:130,bY:320},{bX:170,bY:430}]},
  {pX:100,pY:200,pR:-180,bN:3,bXY:[{bX:380,bY:200},{bX:380,bY:480},{bX:100,bY:480},],buA:true,buN:8,buXY:[{buX:20,buY:320},{buX:60,buY:320},{buX:100,buY:320},{buX:140,buY:320},{buX:180,buY:320},{buX:220,buY:320},{buX:260,buY:320},{buX:300,buY:320}]},
  {pX:520,pY:600,pR:90,bN:8,bXY:[{bX:410,bY:600},{bX:410,bY:490},{bX:300,bY:490},{bX:300,bY:380},{bX:190,bY:380},{bX:190,bY:270},{bX:80,bY:270},{bX:80,bY:160}]},
  {lM:true,pX:510,pY:200,pR:0,iL:true,iN:1,iXY:[{iX:500,iY:200}],tA:true,tX:420,tY:200,tR:-90,bN:3,bXY:[{bX:420,bY:420},{bX:220,bY:420},{bX:220,bY:200},]},
  {pX:300,pY:300,pR:90,bN:4,bXY:[{bX:300,bY:80},{bX:520,bY:300},{bX:300,bY:520},{bX:80,bY:300}]},
  {pX:550,pY:300,pR:45,bN:4,bXY:[{bX:420,bY:180},{bX:250,bY:180},{bX:140,bY:300},{bX:140,bY:580}]},
  {lM:true,pX:300,pY:90,pR:-90,iL:true,iN:2,iXY:[{iX:300,iY:100},{iX:300,iY:465}],tA:true,tX:400,tY:170,tR:0,bN:4,bXY:[{bX:80,bY:160},{bX:80,bY:370},{bX:300,bY:375},{bX:300,bY:465}]},
  {pX:100,pY:470,pR:90,r2A:true,r2X:0,r2Y:200,tA:true,tX:100,tY:260,tR:-180,bN:3,bXY:[{bX:100,bY:60},{bX:300,bY:60},{bX:500,bY:60}],buA:true,buN:6,buXY:[{buX:200,buY:50},{buX:200,buY:110},{buX:200,buY:170},{buX:400,buY:50},{buX:400,buY:110},{buX:400,buY:170}],},
]
