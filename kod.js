var myGamePiece, getWeapon, getRangedWeapon, weaponONE = true, weaponTWO = true, staticArrow = true, target, heroSpeed = 5, targetPoints = 0, arrowCrashTest = [], arrowCrashStatic = [], crashLength = 0, backgroundALL, jump = true, targetMove = 0, targetTopBot = true, fixedY = [];
var red = document.getElementById('hero');
var mapDOWN = {};
var mapPRESS = {};
var lastkey = false;
function startGame() {
    myGameArea.start();
    myGamePiece = new hero(0, 0, 300, 92);
    getWeapon = new sword(0, 50);
	target = new component(40, 40, "white", 550, 90);
	backgroundALL = new component(960, 475, "black", 0, 150);
	getRangedWeapon = new bow();
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
		this.canvas.style.border = "solid 2px black";
		this.canvas.style.backgroundColor = "gray";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea,20);
		
        window.addEventListener('keydown', function (e) {
			e = e || event;
			mapDOWN[e.keyCode] = e.type == 'keydown';
        }, false)
        window.addEventListener('keyup', function (e) {
            e = e || event;
			mapDOWN[e.keyCode] = e.type == false;
        })
		window.addEventListener('keypress', function (e) {
            e = e || event;
			mapPRESS[e.keyCode] = e.type == 'keypress';
        }, false)
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	score : function(){
		let scoreVAR = myGameArea.context;
		scoreVAR.font = "30px Arial"
		scoreVAR.fillStyle = "white"
		scoreVAR.fillText(crashLength, 10, 465);
	}
}
function component(width, height, color, x, y) {
	let ctx = myGameArea.context;
    this.width = width;
    this.height = height;   
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }  
}
function hero(width, height, x, y) {
	let ctx = myGameArea.context;
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
	this.hX;
	this.hY;
	this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
		ctx.drawImage(red, this.x, this.y);
    }
    this.newPos = function() {
		if(jump){
			this.gravitySpeed += this.gravity;
			this.y += this.speedY+this.gravitySpeed;
			if(this.gravitySpeed<(-7)){
				jump = false;
			}
		}else{
			if(this.y>=92){
				this.y = 92;
				this.gravitySpeed = 0;
				lastkey = false;
			}
			this.gravitySpeed += Math.abs(this.gravity)+0.5;
			this.y += this.speedY+this.gravitySpeed;						
		}
        this.x += this.speedX;      
    }
	this.handPosX = function() {
		return this.hX = (this.x+34+this.speedX);
		
	}
	this.handPosY = function() {
		return this.hY = (this.y+32+this.speedY);
	}
}
function sword(longX, longY){
	this.gamearea = myGameArea;
	let ctx = myGameArea.context;
	let ctx2 = myGameArea.context;
	let top1 = myGameArea.context;
	let top2 = myGameArea.context;
	let bot1 = myGameArea.context;
	let bot2 = myGameArea.context;
	let mid = myGameArea.context;
	let xx = longX;
	let yy = longY;
	let gravity = 0.15;
    let gravitySpeed = 0;
	let rotateY = 0;
	let rotateBOT = 0;
	
	this.hand = function() {
		this.x = myGamePiece.handPosX();
		this.y = myGamePiece.handPosY();
	}
	this.attack1 = function() {
		gravitySpeed += gravity;
		
		if(xx<=(-30) || rotateY>=3){
			return;
		}
		rotateY +=0.12;
		rotateBOT +=0.3;
        xx -= gravitySpeed;		
	}
	this.old = function() {
		if(xx>=longX){
			xx = 0;
			return;
		}			
		xx += 10;
		gravitySpeed = 0;
		rotateY = 0;
		rotateBOT = 0;
	}
	this.update = function() {
		let xAx = this.x + xx;
		let yAy = this.y - yy;
		let rotateY2 = rotateY*2.5;
		ctx.beginPath();
		ctx.moveTo(this.x+10, this.y);
		ctx.lineTo(xAx+10, yAy);
		ctx.stroke();
		
		ctx2.beginPath();
		ctx2.moveTo(this.x+5, this.y);
		ctx2.lineTo(xAx+5, yAy);
		ctx2.stroke();
		
		top1.beginPath();
		top1.moveTo(xAx+7, yAy-5);
		top1.lineTo(xAx+5, yAy);
		top1.stroke();
		
		top2.beginPath();
		top2.moveTo(xAx+7, yAy-5);
		top2.lineTo(xAx+10, yAy);
		top2.stroke();
			
		bot1.beginPath();
		bot1.moveTo(xAx, yAy+50-rotateY);
		bot1.lineTo(xAx, yAy+50+rotateY);
		bot1.stroke();	
			
		bot1.beginPath();
		bot1.moveTo(this.x +13, yAy+50-rotateY);
		bot1.lineTo(this.x +2, yAy+50+rotateY);
		bot1.stroke(); 
		
		bot2.beginPath();
		bot2.moveTo(this.x+7.5-rotateY2+rotateBOT, yAy+50);
		bot2.lineTo(this.x+7.5+rotateY2, yAy+60);
		bot2.stroke(); 
	}
}
function bow(){
	this.gamearea = myGameArea;
	let ctx = myGameArea.context;
	let ctx2 = myGameArea.context;
	let ctx3 = myGameArea.context;
	let arrow = myGameArea.context;
	
	
	this.gravity = 0.03;
    this.gravitySpeed = 0;
	this.chordX = 0;
	this.arrowXSpeed = 0;
	this.arrowYSpeed = 0;
	this.acceleration = 0;
	this.accelerationY = 0;
	let temp = 0;
	let temp1 = 1;
	let temp2 = 0;
	let arrowXTemp = 0;
	
	
	this.hand = function() {
		this.x = myGamePiece.handPosX()+2;
		this.y = myGamePiece.handPosY()-10;
	}
	this.chord = function() {
		this.gravitySpeed += this.gravity;
		if(this.chordX>=(17)){
			return;
		}
		this.chordX += this.gravitySpeed;
		temp = this.chordX;
	}
	this.old = function() {
		if(this.chordX<=0){
			this.chordX = 0;
			return;
		}			
		this.chordX -= 10;
		this.gravitySpeed = 0;
		this.acceleration = temp;
		this.accelerationY = 0.2;
		if(this.acceleration<4){
			this.acceleration = 5;
		}
	}
	this.update = function() {
		let xAc = this.x-this.chordX;
		ctx.beginPath();
		ctx.arc(this.x,this.y,20,-1.6,0.5*Math.PI);
		ctx.strokeStyle = "brown";
		ctx.stroke();
		
		ctx2.beginPath();
		ctx2.moveTo(this.x, this.y+21);
		ctx2.lineTo(xAc, this.y+1);
		ctx2.strokeStyle = "silver";
		ctx2.stroke();
		
		ctx3.beginPath();
		ctx3.moveTo(xAc, this.y+1);
		ctx3.lineTo(this.x, this.y-21);
		ctx3.strokeStyle = "silver";
		ctx3.stroke();
	}
	this.updateArrow = function() {
		this.arrowXSpeed += this.acceleration;
		this.arrowYSpeed += this.accelerationY;
		
		if(staticArrow && this.arrowXSpeed>0){
			temp1 = 0;
			temp2 = this.y;
			arrowXTemp = this.x;
			staticArrow = false;
		}
		this.yT12 = this.y*temp1+temp2+this.arrowYSpeed;
		this.xCAS = this.x*temp1+arrowXTemp-this.chordX+this.arrowXSpeed;
		arrow.beginPath();
		arrow.moveTo(this.xCAS, this.yT12);
		arrow.lineTo(this.xCAS+40, this.yT12);
		arrow.strokeStyle = "black";
		arrow.stroke();
		if(this.arrowXSpeed>=1000){
			getRangedWeapon.reLoadArrow();
		}
		this.reLoadArrow = function (){
			staticArrow = true;
			temp1 = 1;
			temp2 = 0;
			arrowXTemp = 0;
			this.arrowXSpeed=0;
			this.arrowYSpeed=0;
			this.acceleration=0;
			this.accelerationY=0;
			arrow.beginPath();
			arrow.moveTo(this.xCAS, this.yT12);
			arrow.lineTo(this.xCAS+40, this.yT12);
			arrow.strokeStyle = "black";
			arrow.stroke();
		}
	}
	this.crashArrow = function(target) {
		let targetleft = target.x;
		let targettop = target.y;
		let targetbottom = target.y + (target.height);
		let targetright = target.x + (target.width);
		
		let myleft = getRangedWeapon.xCAS+40;
		let mytop = getRangedWeapon.yT12;
		
		
		let crash = false;
		if ((myleft > targetleft) && (myleft < targetright) && (mytop > targettop) && (mytop < targetbottom)){
			crash = true;
		}
		return crash;
	}
	this.drawArrow = function(staticY, fixedY) {
		let newArrow = myGameArea.context;
		let targetleft = target.x;
		let mytop = staticY+(target.y - fixedY);

		newArrow.beginPath();
		newArrow.moveTo(targetleft, mytop);
		newArrow.lineTo(targetleft-37, mytop);
		newArrow.strokeStyle = "black";
		newArrow.stroke();
	}
}
function updateGameArea() {
    myGameArea.clear();
	if(targetTopBot){
		target.y+=0.5;
		if(target.y == 110){
		targetTopBot=false;
		}
	}
	if(!targetTopBot){
		target.y-=0.5;
		
		if(target.y == 0){
		targetTopBot=true;
		}
	}
	ArrowCrash();
	target.update();
	backgroundALL.update();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
	
	//Sterowanie strzalkami/////////////////
    if (mapDOWN[37]/*left*/){
		myGamePiece.speedX = -heroSpeed;
	}
	if (mapDOWN[39]/*right*/){
		myGamePiece.speedX = heroSpeed;
	}
    if (mapDOWN[38]/*up*/){
		if(lastkey){}
		else{
			myGamePiece.gravity = -0.6;
			jump = true;
		}
		lastkey = true;
	}
    if (mapDOWN[40]/*down*/){getRangedWeapon.reLoadArrow();}
	//////////////////////////////////////
    if (mapPRESS[49]/*1*/){
		if(weaponONE){
		getWeapon.update();
		}
	}
	if (mapDOWN[49]/*1*/){
		weaponTWO = false;
		weaponONE = true;	
	}
	if (mapDOWN[50]/*2*/){
		weaponONE = false;
		weaponTWO = false;
	}
	if (weaponONE && mapDOWN[51]/*3*/){
		getWeapon.attack1();
	}
	if (!(weaponONE && mapDOWN[51]/*3*/)){
		getWeapon.old();
	}
	if (mapPRESS[52]/*4*/){
		if(weaponTWO){
		getRangedWeapon.update();
		getRangedWeapon.updateArrow();
		}
	}
	if(mapDOWN[52]/*4*/){
		weaponONE = false;
		weaponTWO = true;
	}
	if (weaponTWO && mapDOWN[53]/*5*/){
		if(getRangedWeapon.arrowXSpeed > 0){}
		else{
		getRangedWeapon.chord();
		}
	}
	if (!(weaponTWO && mapDOWN[53]/*5*/)){
		getRangedWeapon.old();
	}
	
	getWeapon.hand();
	getRangedWeapon.hand();
	myGameArea.score();
    myGamePiece.newPos(); 
    myGamePiece.update();
}
function ArrowCrash(){
	if(getRangedWeapon.crashArrow(target)){
		arrowCrashTest[crashLength] = false;
		arrowCrashStatic[crashLength] = getRangedWeapon.yT12;
		fixedY[crashLength] = target.y;
		crashLength++;
		getRangedWeapon.reLoadArrow();
	}
	for(var i = 0, j = arrowCrashTest.length;i < j; i++)
	getRangedWeapon.drawArrow(arrowCrashStatic[i], fixedY[i]);
}
startGame();