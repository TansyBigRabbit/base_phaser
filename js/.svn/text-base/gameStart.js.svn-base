var gameStart={
	preload:function(){
	  //设备适配
	  //if(!Phaser.Device.desktop){
        /*game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
	    }else{
	    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
	    }*/
	    //this.scale.scaleMode = window.screen.width > 640 ? Phaser.ScaleManager.SHOW_ALL : Phaser.ScaleManager.EXACT_FIT;
        //
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
	  //加载所有需要的资源
    this.bgImg = game.add.sprite(0,0,'gameGuide');
	  var preloadSprite = game.add.sprite(130, game.height/2+400, 'loading');
    preloadSprite.scale.setTo(0.8, 0.8);
   var progressText = game.add.text(game.world.centerX -150, game.world.centerY + 460,'0%',{fill:'#fff',fontSize:'36px'});
    progressText.font = '微软雅黑';
	  /*game.load.image('race', 'assets/image/car/race.jpg');*/
    /*game.load.image('race', 'assets/image/car/race01.jpg');*/
      game.load.image('race', 'assets/image/car/race02.jpg');
	  game.load.image('topLogo', 'assets/image/car/topLogo.png');
      game.load.image('topLogo01', 'assets/image/car/toplogo01.png');
	  game.load.image('mileStone1', 'assets/image/car/mileStone1.png');
	  game.load.image('mileStone2', 'assets/image/car/mileStone2.png');
	  game.load.image('mileStone3', 'assets/image/car/mileStone3.png');
	  game.load.image('mileStone4', 'assets/image/car/mileStone4.png');
	  game.load.image('mileStone5', 'assets/image/car/mileStone5.png');
	  game.load.image('mileStone6', 'assets/image/car/mileStone6.png');
	  game.load.image('mileStone7', 'assets/image/car/mileStone7.png');
	  game.load.image('runLine', 'assets/image/car/runLine.png');
	  game.load.image('timerImg', 'assets/image/car/timer.png');
	  game.load.spritesheet('car', 'assets/image/car/car.png',119,207);
	  game.load.image('car-d', 'assets/image/car/car-d.png');
	  game.load.image('car-n', 'assets/image/car/car-n.png');
	  
      game.load.image('light6', 'assets/image/timer/light6.png');
      game.load.image('light5', 'assets/image/timer/light5.png');
      game.load.image('light4', 'assets/image/timer/light4.png');
      game.load.image('light3', 'assets/image/timer/light3.png');
      game.load.image('light2', 'assets/image/timer/light2.png');
      game.load.image('light1', 'assets/image/timer/light1.png');
      game.load.image('light0', 'assets/image/timer/light0.png'); 

      game.load.image('tool1', 'assets/image/tools/tool1.png'); 
      game.load.image('tool2', 'assets/image/tools/tool2.png'); 
      game.load.image('tool3', 'assets/image/tools/tool3.png'); 
      game.load.image('tool4', 'assets/image/tools/tool4.png'); 
      game.load.image('tool5', 'assets/image/tools/tool5.png'); 
     /* game.load.image('tool6', 'assets/image/tools/tool1.png'); */
      game.load.image('tool6', 'assets/image/tools/tool2.png'); 
      game.load.image('tool7', 'assets/image/tools/tool3.png'); 
      game.load.image('tool8', 'assets/image/tools/tool5.png');
      game.load.image('tool9', 'assets/image/tools/tool5.png');  
      game.load.image('dashBoard', 'assets/image/tools/dashBoard.png'); 
      game.load.image('pointer', 'assets/image/tools/pointer01.png'); 
      
      game.load.image('btn01', 'assets/image/gameover/btn01.png'); 
      game.load.image('btn02', 'assets/image/gameover/btn02.png');
      game.load.image('btn03', 'assets/image/gameover/btn03.png');
      game.load.image('btn04', 'assets/image/gameover/btn04.png');
      game.load.image('btn05', 'assets/image/gameover/btn05.png');
      game.load.image('btn06', 'assets/image/gameover/btn06.png');
      game.load.image('btn07', 'assets/image/gameover/btn07.png');
      game.load.image('btn08', 'assets/image/gameover/btn08.png');
      game.load.image('btn01g', 'assets/image/gameover/btn01g.png');
      game.load.image('btn03g', 'assets/image/gameover/btn03g.png');
      game.load.image('btn04g', 'assets/image/gameover/btn04g.png');
      game.load.image('gameoverImg', 'assets/image/gameover/gameoverImg.png');
      game.load.image('getgift', 'assets/image/gameover/getgift.png');
      game.load.image('gift4designer', 'assets/image/gameover/gift4designer.png');
      game.load.image('gift4visitor', 'assets/image/gameover/gift4visitor.png');
      game.load.image('makesure', 'assets/image/gameover/makesure.png');
      game.load.image('makesure4designer', 'assets/image/gameover/makesure4designer.png');
      
      
      game.load.spritesheet('fire', 'assets/image/tools/fire.png', 20, 60, 3);
      game.load.image('bullon', 'assets/image/tools/bullon.png');
      game.load.image('bullon3', 'assets/image/tools/bullon3.png');
      game.load.image('bullon4', 'assets/image/tools/bullon4.png');
      game.load.image('bullon5', 'assets/image/tools/bullon5.png');
      /*game.load.spritesheet('bullon', 'assets/image/tools/bullon.png', 264, 98, 1);*/

      //音频
	  game.load.audio('add', 'assets/music/add.mp3');
	  game.load.audio('minus', 'assets/music/minus.mp3');
	  game.load.audio('bgmusic', 'assets/music/nervous.mp3');
	  /*game.load.audio('bgmusic01', 'assets/music/nervous01.wav');
	  game.load.audio('bgmusic02', 'assets/music/nervous02.ogg');*/
	  
	  game.load.audio('run', 'assets/music/run.mp3');
	  game.load.audio('warnning', 'assets/music/tenseconds.mp3');
	  game.load.audio('timer', 'assets/music/timer.wav');
    game.load.onFileComplete.add(function(progress) {
      progressText.text ='加载资源' + progress + '%...';
      if(progress == 100) {
        game.state.start('Game');
      }
    });
	},
	create:function(){
	  /*game.state.start('Game');*/
	}
}