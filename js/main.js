﻿var game;
var identity, gift1, gift2;
$(function() {
  var openid = window.localStorage.getItem("openid");

  identity = window.localStorage.getItem("user_type");
  gift1 = window.localStorage.getItem("gift1");
  gift2 = window.localStorage.getItem("gift2");
});

game = new Phaser.Game(750, 1334, Phaser.AUTO, "game");

//增加场景
game.state.add('Game', Game);
game.state.add('gameStart', gameStart);
game.state.add('gameOver', gameOver);
game.state.add('gameGuide', gameGuide);
//开启场景
game.state.start('gameGuide');
//# sourceURL=main.js

/*function setUserInfo(account,password,selectValue){
   window.localStorage['password'] = password;
   var openid = window.localStorage.getItem("openid");
   var settings = {
  "async": false,
  "crossDomain": true,
  "dataType": 'json',
  "url": "http://design.youzidata.com/car/api/Set_user_info.php?openid="+openid+"&user_type="+selectValue+"&phone_num="+account+"&password="+password,
  "method": "GET",
  "headers": {
    "Cache-Control": "no-cache",
    "Postman-Token": "bb8a0f80-e226-425a-8485-c5a4cdd24c5e"
  }
}

$.ajax(settings).done(function (response) {
   if(response.statusCode=='1000'){
       $("#mainContent").load('game.html');
     } 
});
 
}*/