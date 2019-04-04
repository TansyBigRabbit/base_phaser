//初始时间，初始速度（背景图），里程数
//var time = 60,time01=6;velocity = 1100
var time = 60,time01=6;velocity = 800,car_velocity=0,mile = 0,milestoneFlag=false,flagTool=false,toolFlag=true;
var flag01 = 0,flag02 = 0,flag03 = 0,flag04 = 0,flag05 = 0,flag06 = 0,flag07 = 0,angleNum = 0 ,flag09=0;
var jinduWord,x1=0;
var touching = false,direction = '',v1; 
var msgbox,openFire=0,msgboxFlag=0,openFireFlag=0,notRushFlag=0,circleFlag=0,inputFlag=0;
var Game = {
	create:function(){
    //开启全局物理属性
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //打开声音
    /*this.bgmusic = game.add.audio('bgmusic',0.3,false);*/
    this.bgmusic = game.add.audio('bgmusic',0.3,true);
    /*this.bgmusic01 = game.add.audio('bgmusic01',0.3,false);
    this.bgmusic = game.add.audio('bgmusic',0.3,false);*/
    
    this.add = game.add.audio('add',0.3,false); 
    this.minus = game.add.audio('minus',0.3,false);
    this.run = game.add.audio('run',0.3,false);
    this.warnning = game.add.audio('warnning',0.3,false);
    this.timer = game.add.audio('timer',0.3,false);
    try{ 
      this.bgmusic.play(); 
    }catch(e){
    alert('背景音乐加载失败！');
    	this.bgmusic.play(); 
    } 

    //组装界面
    this.bg = game.add.tileSprite(0,0,game.width,game.height,'race');
    //this.bgScroll(velocity);
    
    //计时器
    this.leftTime = 0;
    //起跑线
    this.runLine = game.add.sprite(95,750,'runLine');
    game.physics.arcade.enable(this.runLine); 
    this.runLine.outOfBoundsKill = true;
    this.runLine.checkWorldBounds = true;
    
    this.appearTime = 2500;
    //添加道具组
    this.tools = game.add.group();
    this.tools.enableBody = true;
    this.tools.lastAppearTime = 0;
    this.tools.velocity = this.bg.velocity; 
    //car(随机某一辆)
    /*var carIndex = game.rnd.integerInRange(0,1);*/
    //身份判断
    var user_type = window.localStorage.getItem("user_type");
    //设计师
    if(user_type=='2'){
        this.car = game.add.sprite(game.width/2,game.height-340,'car-d');  
        }else{
        this.car = game.add.sprite(game.width/2,game.height-340,'car-n');  
        }
    /*this.car = game.add.sprite(game.width/2,game.height-350,'car',1);*/
    this.car.anchor.setTo(0.5, 0.5);
    createEmitter(this.car);
    //开启车的物理引擎
    game.physics.arcade.enable(this.car);
    this.car.body.collideWorldBounds = true;//不出边界
    //顶部logo
    this.topLogo = game.add.sprite(-3,0,'topLogo01');
    this.topLogo.scale.setTo(1.1, 1.1);
    //灯
    this.appearLight(6);
    //速度
    this.vilocity = 200;

    
    //里程
    this.style = { font: "bold 26px Microsoft Yahei", fill: "#FFF" };
    this.mileage = 0;
    this.vilocityWord = game.add.text(0, game.height-50, "速度: "+ this.vilocity +"km/h", this.style);
    this.mileageWord = game.add.text(game.width*0.75, game.height-50, "里程: "+ this.mileage +"km", this.style); 
    //添加触摸事件 
    game.input.onDown.add(this.onTapComplete,this); 
    
    //进入游戏倒计时
    game.time.events.repeat(Phaser.Timer.SECOND , time01, this.refreshTime, this);
	//game.time.events.repeat.add(this.repeatComplete,this);
	},
	update:function(){ 
    if(notRushFlag=='1'){
    	if(this.car.angle<0){
    	 circleFlag='1'
    	}
    	if(circleFlag=='1'&&this.car.angle>=0){
    	this.car.angle=0;
    	circleFlag=0;
    	notRushFlag=0;
    	return
    	}
    	this.car.angle += 10;
    }
		
	if(direction=='1'){
    
		if(this.car.x-x1>=170){
			car_velocity = 0;
			this.car.body.velocity.x = car_velocity;
			if(msgboxFlag=='1'){
             msgbox.body.velocity.x = car_velocity;	
             msgboxFlag = '0';
			}
			if(openFireFlag =='1'){
			openFire.body.velocity.x = car_velocity;
			openFireFlag = '0';
			}
			
		}else{
      if(msgboxFlag=='1'){
         msgbox.body.velocity.x = car_velocity; 
        }
        if(openFireFlag =='1'){
        openFire.body.velocity.x = car_velocity;  
        }
    }
	}
  if(direction=='2'){ 
		if(x1-this.car.x>=170){
			car_velocity = 0;
			this.car.body.velocity.x = car_velocity;
			if(msgboxFlag=='1'){
	        msgbox.body.velocity.x = car_velocity;	
				}
				if(openFireFlag =='1'){
				openFire.body.velocity.x = car_velocity;	
				}
		}else{
      if(msgboxFlag=='1'){
         msgbox.body.velocity.x = car_velocity; 
        }
        if(openFireFlag =='1'){
        openFire.body.velocity.x = car_velocity;  
        }
    }
	}
    if(flag09=='1'){
      return
    }
    if(flagTool){
    game.world.setChildIndex(this.dashBoard,9);
    game.world.setChildIndex(this.pointer,10);
     var now = game.time.now;
     this.timerWork(now);
     /* var now = new Date().getTime();*/
     if(milestoneFlag){
      console.log(this.car.y)
      console.log(this.milestone.y)
      if(this.car.y<=this.milestone.y){
        console.log("超过里程碑");
        milestoneFlag=false;
        this.run.play();
      }
     }
     if(now-this.tools.lastAppearTime>this.appearTime){  
     if(toolFlag){
     this.toolAppear(); 
     }
     //道具随机出现
     
     this.tools.lastAppearTime = now;
    }
    //要写在外面！！！！！
    game.physics.arcade.overlap(this.car,this.tools,this.collisionHandler01,null,this); 
    }

	},
    collisionHandler01:function(){
    toolFlag = false;
    
    if(arguments[1].key=='tool1'||arguments[1].key=='tool2'||arguments[1].key=='tool3'||arguments[1].key=='tool6'
      ){
      //减速 
      this.minus.play();
      notRushFlag='1';
      if(arguments[1].key=='tool1'){
       this.showMsgbox('bullon5');
      }else if(arguments[1].key=='tool3'){
       this.showMsgbox('bullon3'); 
      }else{
        this.showMsgbox('bullon4'); 
      }
      this.vilocity -= 20;
      if(this.vilocity<=0){ 
         //game.paused = true;
         this.bgmusic.stop();
         this.gameoverState();
      }else{
      v1 = velocity;
      velocity -=velocity*0.3
      this.bgScroll(velocity);
      game.time.events.repeat(Phaser.Timer.SECOND , 0.3, this.notRush, this);
      angleNum = (this.vilocity - 200)*89/200;
      this.pointer.angle = angleNum
      this.vilocityWord.text = "速度: "+ this.vilocity.toFixed(2) +"km/h";
      if(this.vilocity>=280){
        this.appearTime = 1400
      }else{
        this.appearTime +=200
      } 
      }
      
      
    }else if(arguments[1].key=='tool4'){
      //加时 
      //toolFlag = true;
      this.add.play(); 
      this.showMsgbox('bullon')
      time += 2;
      game.time.events.repeat.repeatCount = time;
      jinduWord.text =  time +" 秒";
      //window.location.href="login.html";
    }else if(arguments[1].key=='tool5'||arguments[1].key=='tool8'||arguments[1].key=='tool9'){
      //加速 
      this.add.play();
      //火焰动画
      openFire = game.add.sprite(this.car.x-50,this.car.y,'fire');
      openFireFlag = '1';
      game.physics.arcade.enable(openFire);
      openFire.scale.setTo(5,5);
      game.world.setChildIndex(openFire,2);
      var fireplay = openFire.animations.add('openFire');
      fireplay.play(12,false,true);
      openFire.body.velocity.x = car_velocity; 
      v1 = velocity;
      this.vilocity += 20;
      velocity += velocity*0.3;
      this.bgScroll(velocity);
      game.time.events.repeat(Phaser.Timer.SECOND , 0.3, this.rush, this);
      angleNum = (this.vilocity - 200)*89/200;
      this.pointer.angle = angleNum
      this.vilocityWord.text = "速度: "+ this.vilocity.toFixed(2) +"km/h"; 
      //this.appearTime -=200
      if(this.vilocity>=280){
        this.appearTime = 1200
      }else{
        this.appearTime -=200
      }
    } 
   arguments[1].kill(); 
   toolFlag = true;
   },
   showMsgbox:function(imgName){
	   msgbox = game.add.sprite(this.car.x-128,this.car.y-190,""+imgName+"");
	      msgboxFlag = '1';
	      game.physics.arcade.enable(msgbox); 
	      game.add.tween(msgbox).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
	      msgbox.body.velocity.x = car_velocity;   
   },
   onTapComplete:function(){
   if(inputFlag=='1'){
	   return
   }else{
	   x1 = this.car.x;
	      var pointer = game.input.activePointer; 
	      //往右边
	      if(pointer.position.x > this.car.x && this.car.x<380){
	    	  direction = '1';
	    	  car_velocity = 350;
	    	  /*this.car.body.velocity.x = car_velocity */
	    	  tween(this.car,1,300);
	      }
	        //往左边
	      if(pointer.position.x < this.car.x &&this.car.x>360 ){ 
	    	  direction = '2';
	    	  car_velocity = -350
	    	  /*this.car.body.velocity.x = car_velocity; */
	    	  tween(this.car, 0, 300);
	      }   
   }
	 
	   
    },
	//背景图滚动
	  bgScroll:function(velocity){
	  this.bg.velocity = velocity;
    this.bg.autoScroll(0,velocity);
    },
    //灯
    appearLight:function(v){
    this.light = game.add.sprite(0,100,'light'+v);
    this.light.scale.setTo(1, 1);
    },
    //倒计时结束后加载其他元素
    appearELements:function(){
    flagTool = true;
    this.bgScroll(velocity);//背景图滚动
    this.runLine.body.velocity.y = velocity ;//起跑线添加速度
    this.timeTool = game.add.sprite(0,260,'timerImg');//倒计时图片
    //倒计时文字
    jinduWord01 = game.add.text(20, 280, "比赛剩余时间： ", this.style);
    jinduWord = game.add.text(50, 320, time +" 秒", this.style);
    //仪表盘和指针
    this.dashBoard = game.add.sprite(this.world.centerX,game.height-90,'dashBoard');
    this.dashBoard.anchor.setTo(.5, .5);
    this.pointer = game.add.sprite(373,game.height-15,'pointer');
    this.pointer.anchor.setTo(0.5, 1);
    this.pointer.angle = 0;
    },
    refreshTime:function(){
    	this.light.kill();
    	this.appearLight(time01-1);
    	time01--;
      if(time01==3){
      this.timer.play();
      }
    	if(time01==0){
    	game.add.tween(this.light).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    	this.appearELements();
    	}
    	console.log(time01);
    }, 

    toolAppear:function(){
      var toolIndex = game.rnd.integerInRange(1,6);
      var xarray = [60,220,400];
      var xindex = game.rnd.integerInRange(0,2);
      var y = 0;
      var key = 'tool'+toolIndex;
      var size =game.cache.getImage(key).width;
      var x = xarray[xindex];
      console.log(x,y,key);
      var tool = this.tools.getFirstExists(false,true,x+size,y,key);
      tool.anchor.setTo(0.5,0.5);
      game.physics.arcade.enable(tool);
      tool.body.setSize(size,size);
      tool.body.velocity.y = velocity ; 
      tool.outOfBoundsKill = true;
      tool.checkWorldBounds = true;
      console.log(this.tools.length)
      },
    //计时器
    timerWork:function(now){
      if(this.leftTime==0){
      this.leftTime = now;
     }else{
      if(now-this.leftTime>200){
        if(time<=0){ 
        // game.paused = true; 
         this.bg.stopScroll();
         this.bgmusic.stop(); 
         this.gameoverState();
         //game.state.start('gameOver');
        }else{
        time = (time-0.2).toFixed(2);
        if(time==10){
          this.warnning.play();
        }
        jinduWord.text = time +" 秒";
        mile += 0.2/3600*this.vilocity;
        //出现里程碑
        this.milestoneAppear(mile);
        this.mileageWord.text = "里程: "+mile.toFixed(2)+"km";
        this.leftTime = now; 
        }
        
      }
     }
    },
    //出现里程碑
    milestoneAppear:function(mile){
      /*for(var i=1;i<8;i++){
        var flag = 'flag0'+i;
        if(mile>=i&&flag==0){
         this.milestone = game.add.sprite(0,this.car.y-30,'arrow');
         game.physics.arcade.enable(this.milestone);
         this.milestone.body.velocity.y = velocity ; 
         flag=1;
         break;
        }
      }*/
      if(mile>=0.9&&flag01==0){
         this.milestone = game.add.sprite(game.width/2-110,0,'mileStone1');
         this.milestone.scale.setTo(0.9, 0.9);
         game.world.setChildIndex(this.milestone,4);
         game.physics.arcade.enable(this.milestone);
         this.milestone.body.velocity.y = velocity ; 
         this.milestone.outOfBoundsKill = true;
         this.milestone.checkWorldBounds = true;
         flag01=1;
         milestoneFlag=true;

        } 
      if(mile>=1.9&&flag02==0){
         this.milestone = game.add.sprite(game.width/2-110,0,'mileStone2');
         this.milestone.scale.setTo(0.9, 0.9);
         game.world.setChildIndex(this.milestone,4);
         game.physics.arcade.enable(this.milestone);
         this.milestone.body.velocity.y = velocity ; 
         this.milestone.outOfBoundsKill = true;
         this.milestone.checkWorldBounds = true;
         flag02=1;
         milestoneFlag=true;
      }
      if(mile>=2.9&&flag03==0){
         this.milestone = game.add.sprite(game.width/2-110,0,'mileStone3');
         this.milestone.scale.setTo(0.9, 0.9);
         game.world.setChildIndex(this.milestone,4);
         game.physics.arcade.enable(this.milestone);
         this.milestone.body.velocity.y = velocity ; 
         this.milestone.outOfBoundsKill = true;
         this.milestone.checkWorldBounds = true;
         flag03=1;
         milestoneFlag=true;
      } 
      if(mile>=3.9&&flag04==0){
         this.milestone = game.add.sprite(game.width/2-110,0,'mileStone4');
         this.milestone.scale.setTo(0.9, 0.9);
         game.world.setChildIndex(this.milestone,4);
         game.physics.arcade.enable(this.milestone);
         this.milestone.body.velocity.y = velocity ; 
         flag04=1;
         milestoneFlag=true;
      } 
      if(mile>=4.9&&flag05==0){
         this.milestone = game.add.sprite(game.width/2-110,0,'mileStone5');
         this.milestone.scale.setTo(0.9, 0.9);
         game.world.setChildIndex(this.milestone,4);
         game.physics.arcade.enable(this.milestone);
         this.milestone.body.velocity.y = velocity ; 
         this.milestone.outOfBoundsKill = true;
         this.milestone.checkWorldBounds = true;
         flag05=1;
         milestoneFlag=true;
      } 
      if(mile>=5.9&&flag06==0){
         this.milestone = game.add.sprite(game.width/2-110,0,'mileStone6');
         this.milestone.scale.setTo(0.9, 0.9);
         game.world.setChildIndex(this.milestone,4);
         game.physics.arcade.enable(this.milestone);
         this.milestone.body.velocity.y = velocity ; 
         this.milestone.outOfBoundsKill = true;
         this.milestone.checkWorldBounds = true;
         flag06=1;
         milestoneFlag=true;
      } 
      if(mile>=6.9&&flag07==0){
         this.milestone = game.add.sprite(game.width/2-110,0,'mileStone7');
         this.milestone.scale.setTo(0.9, 0.9);
         game.world.setChildIndex(this.milestone,4);
         game.physics.arcade.enable(this.milestone);
         this.milestone.body.velocity.y = velocity ; 
         this.milestone.outOfBoundsKill = true;
         this.milestone.checkWorldBounds = true;
         flag07=1;
         milestoneFlag=true;
      } 

    },
    gameoverState:function(){ 
    game.state.start('gameOver');
    
    },
    rush:function(){
    velocity = 1.1*v1;
    this.bgScroll(velocity);
    },
    notRush:function(){
    velocity = 0.9*v1;
    this.bgScroll(velocity);
    }
}

function tween(obj, num, tmr) { 
	inputFlag=1;
	 if(num=='1'){
		 
		 obj.angle = 0;
		 var tween = game.add.tween(obj).to({ x: obj.x+170 }, tmr, "Linear", true);
		  tween.onComplete.add(function () { 
		    obj.angle = 0;
		  }); 
		  game.add.tween(obj.emitter).to({ x: obj.x+170 }, tmr, "Linear", true);
	 }else{ 
		 obj.angle = 0;
		 var tween = game.add.tween(obj).to({ x: obj.x-170 }, tmr, "Linear", true);
		  tween.onComplete.add(function () { 
		    obj.angle = 0;
		  }); 
		  game.add.tween(obj.emitter).to({ x: obj.x-170 }, tmr, "Linear", true);
	 } 
	/* game.input.onTap.enabled = true; */
	 setTimeout(function(){
		 inputFlag=2;
	 },500);
	}
function createEmitter(obj) {
	  obj.emitter = game.add.emitter(0, 0, 250);
	  obj.emitter.x = obj.x;
	  obj.emitter.y = obj.y + obj.height / 2; 
	  obj.emitter.setXSpeed(-100, 100);
	  obj.emitter.setYSpeed(100, 100);
	  obj.emitter.setRotation(0, 0);
	  obj.emitter.setAlpha(0.3, 0.8);
	  obj.emitter.gravity = 200;
	  obj.emitter.start(false, 5000, 100);
	}
/*function directionJudge(){
	$("body").on("touchstart", function(e) {
	    // 判断默认行为是否可以被禁用
	    if (e.cancelable) {
	        // 判断默认行为是否已经被禁用
	        if (!e.defaultPrevented) {
	            e.preventDefault();
	        }
	    }   
	    startX = e.originalEvent.changedTouches[0].pageX,
	    startY = e.originalEvent.changedTouches[0].pageY;
	});
	$("body").on("touchend", function(e) {         
	    // 判断默认行为是否可以被禁用
	    if (e.cancelable) {
	        // 判断默认行为是否已经被禁用
	        if (!e.defaultPrevented) {
	            e.preventDefault();
	        }
	    }               
	    moveEndX = e.originalEvent.changedTouches[0].pageX,
	    moveEndY = e.originalEvent.changedTouches[0].pageY,
	    X = moveEndX - startX,
	    Y = moveEndY - startY;
	    //左滑
	    if ( X > 0 ) {
	    	direction = 'right';               
	    }
	    //右滑
	    else if ( X < 0 ) {
	    	direction = 'left';  
	    }
	    //下滑
	    else if ( Y > 0) {    
	    }
	    //上滑
	    else if ( Y < 0 ) {  
	    } 
	});
}*/
//# sourceURL= game.js