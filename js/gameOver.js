var design_visitor_flag = '0',giftFlag='0';
var openid,identity,gift1,gift2;
 var gameOver={
	create:function(){
	  this.gameoverImg = game.add.sprite(100,300,'gameoverImg');
      this.style01 = { font: "bold 66px Microsoft Yahei", fill: "#004098" };
      identity = window.localStorage.getItem("user_type");
      gift1 = window.localStorage.getItem("gift1");
      gift2 = window.localStorage.getItem("gift2"); 
      /*identity = '2';
      gift2 = '0';
      gift1 = '0';*/
      this.vilocityWord = game.add.text(255, 570,mile.toFixed(2)+"km", this.style01);
    /*if(identity=='1'){
      if(gift1=='0'){// 
        game.add.button(220,670,'btn01',this.getGift01,game);
      }else{
        game.add.button(220,670,'btn01g',this.getGift02,this);
      }
    }
    if(identity=='2'){
      if(gift1=='1'&&gift2=='1'){
        game.add.button(220,670,'btn01g',this.getGift02,this);
      }else{
        game.add.button(220,670,'btn01',this.getGift01,this);
      }
    } */
      game.add.button(216,770,'btn02',this.returnToGuide,this);
  },
  getGift01:function(){
      this.gift4visitor = game.add.sprite(100,300,'gift4visitor');
      if(identity=='1'){// 
        var btn03 = game.add.button(180,760,'btn03',gameOver.getGift03,gameOver); 
      }else{
        if(gift1=='0'){
        game.add.button(180,700,'btn03',gameOver.getGift03,gameOver); 
        }else{
        game.add.button(160,710,'btn03g',gameOver.getGift02,gameOver);
        }
        if(gift2=='0'){
        game.add.button(150,820,'btn04',gameOver.getGiftDesigner,gameOver);//gameOver.getGift04
        }else{
        game.add.button(150,820,'btn04g',gameOver.getGift02,gameOver);
        }
      } 
     
    },
    getGiftDesigner:function(){
    this.gift4designer = game.add.sprite(100,300,'gift4designer');
    var btn04 = game.add.button(150,830,'btn04',gameOver.getGift04,gameOver); 
    },
    getGift02:function(){
    mui.alert('您已经领取过奖品啦！');
    },
    getGift03:function(){
    if(identity=='2'){
      design_visitor_flag = '1';
    }
    this.getgift = game.add.sprite(100,300,'getgift');
    game.add.button(220,820,'btn05',gameOver.getGift05,gameOver);
    },
    // 
    getGift04:function(){
    $("#designerForm").css('display','block');
    $("#game").css('display','none');
    },
    getGift05:function(){
    this.makesure = game.add.sprite(100,300,'makesure');
    game.add.button(200,670,'btn07',gameOver.getGiftFinal,gameOver);
    game.add.button(200,770,'btn08',gameOver.returnToGuide,gameOver);
    },
    getGift06:function(){
        this.makesure4designer = game.add.sprite(100,300,'makesure4designer');
        game.add.button(190,740,'btn07',gameOver.getGiftFinal,gameOver);
        game.add.button(190,840,'btn08',gameOver.returnToGuide,gameOver);
        },
    getGiftFinal:function(){
    mui.alert('领取成功', ' ', function() {
       if(identity=='1'){
         setGift(1,'visitor'); 
        gameOver.returnToGuide();
       }
       if(identity=='2'){
        if(design_visitor_flag=='1'){
          design_visitor_flag='0';
           setGift(1,'designer'); 
          if(giftFlag=='1'){
            gift1 = '1';
          }
          
          if(gift2=='1'){
            gameOver.returnToGuide();
          }else{
            gameOver.getGift01();
          }
        }else{
          setGift(2,'designer'); 
          if(giftFlag=='1'){
             gift2 = '1';
          }
         
          if(gift1=='1'){
            gameOver.returnToGuide();
          }else{
            gameOver.getGift01();
          }
        }
       }
       
    });
    },
    returnToGuide:function(){
    /*game.state.start('gameGuide');*/
    $("#mainContent").load('game.html');
    }
   /* update:function(){
      if(gameFlag=='1'){
        this.getGift05();

        gameFlag = '0';
      }
    }*/
}
//var gameFlag = '0';
var companyName,userName,email,phoneNum,Solidwork_Ver,Windows_Ver,cpu_bit,network;
function btnclick(){
    companyName = $("#companyName").val();
    userName = $("#userName").val();
    email = $("#email").val();
    phoneNum = $("#phoneNum").val();
    Solidwork_Ver = $("#selectObj01").find("option:selected").val();
    Windows_Ver = $("#selectObj02").find("option:selected").val();
    cpu_bit = $("#selectObj03").find("option:selected").val();
    network = $("#selectObj04").find("option:selected").val();
   if(companyName==""){
    mui.alert("请输入公司名称");
    return
   }
   if(userName==""){
    mui.alert("请输入姓名");
    return
   }
   if(email==""){
    mui.alert("请输入e-Mail");
    return
   }else{
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if(!reg.test(email)){
    mui.alert("e-Mail格式不正确");
    return
    }
   }
   if(phoneNum==""){
    mui.alert("请输入电话号码");
    return
   }
   if(Solidwork_Ver==""){
	    mui.alert("请选择SolidWorks版本");
	    return
	   }
   if(Windows_Ver==""){
	    mui.alert("请选择电脑系统");
	    return
	   }
   if(cpu_bit==""){
	    mui.alert("请选择电脑bit数");
	    return
	   }
   if(network==""){
	    mui.alert("请选择网络环境");
	    return
	   }
  submitDesignerInfo();

  //gameFlag = '1';
}

function submitDesignerInfo(){
  
     window.localStorage['password'] = password;
    openid = window.localStorage.getItem("openid");
   var password = window.localStorage.getItem("password");
   var user_type = window.localStorage.getItem("user_type");
   var settings = {
  "async": false,
  "dataType": 'json',
  "crossDomain": true,
  "url": "http://design.youzidata.com/car/api/Set_user_info.php?Solidwork_Ver="+Solidwork_Ver+"&Windows_Ver="+Windows_Ver+"&cpu_bit="+cpu_bit+"&network="+network+"&openid="+openid+"&user_type="+user_type+"&phone_num="+phoneNum+"&password="+password,
  "method": "GET",
  "headers": {
    "Cache-Control": "no-cache",
    "Postman-Token": "bb8a0f80-e226-425a-8485-c5a4cdd24c5e"
  }
}

$.ajax(settings).done(function (response) {
   if(response.statusCode=='1000'){
  $("#designerForm").css('display','none');
  $("#game").css('display','block');
  gameOver.getGift06();
     }else{
    mui.alert('信息提交失败，请稍后再试');
     }
}); 
giftFlag = '1';
gameOver.getGift06();
}

function setGift(user_type,flag){
  if(user_type=='1'){
  gift_type = '1';
  }else{
  gift_type = '2';
  }

  var settings = {
  "async": false,
  "dataType": 'json',
  "crossDomain": true,
  "url": "http://design.youzidata.com/car/api/Set_gift.php?openid="+openid+"&gift_type="+gift_type,
  "method": "GET",
  "headers": {
    "Cache-Control": "no-cache",
    "Postman-Token": "bb8a0f80-e226-425a-8485-c5a4cdd24c5e"
  }
}

$.ajax(settings).done(function (response) {
   if(response.statusCode=='1000'){
   giftFlag = '1';
     }else{
  giftFlag = '0';
    mui.alert('信息提交失败，请稍后再试');
     }
}); 

}

 
//# sourceURL=gameOver.js