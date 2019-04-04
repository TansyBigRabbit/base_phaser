var gameGuide = {
	preload : function(){
    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    game.load.image('gameGuide', 'assets/image/guide/gameGuide.jpg');
    game.load.image('gameRule', 'assets/image/guide/gameRule.png');
    game.load.image('ruleBtn', 'assets/image/guide/ruleBtn.png');
    game.load.image('starBtn', 'assets/image/guide/starBtn.png');
    game.load.image('loading', 'assets/image/guide/preloader.gif');
	},
	create:function(){
	this.bgImg = game.add.sprite(0,0,'gameGuide');

    game.add.button(game.width/2-150,1030,'starBtn',this.starClick,this);
    game.add.button(game.width/2-155,1140,'ruleBtn',this.ruleClick,this);
    this.showRuleImg();
	/*this.starBtn = game.add.sprite(game.width/2,1050,'starBtn');
	this.starBtn.anchor.setTo(0.5,0.5);*/
	 
	},
	starClick:function(){
	game.state.start('gameStart');
	/*$("#designerForm").css('display','none');
	$("#game").css('display','none');*/
	},
	ruleClick:function(){
	this.showRuleImg();
	
	},
	killRule:function(){
	this.ruleImg.kill();	
	},
	showRuleImg:function(){
	//this.startButton = game.add.sprite(0,0,'ui','button.png');
	this.ruleImg = game.add.sprite(game.width/2,900,'gameRule');
	this.ruleImg.anchor.set(0.5); 
	this.ruleImg.inputEnabled = true; //要写这句话点击事件才生效
	this.ruleImg.events.onInputDown.add(this.killRule,this);	
	}
} 


//# sourceURL=gameGuide.js