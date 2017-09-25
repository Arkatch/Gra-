//INSTRUKCJA//
/*
	Tworzenie nowego nieruchomego obiektu:
	-stwórz zmienną w punkcie 2. np "x"
	-zmienna z punktu 2. "x" ma "= new component(width, height, color, x, y);" w funkcji startGame()
	-do funkcji updateGameArea() wywołaj funkcje z wcześniejszymi zmiennymi: ArrowCrashFixed(x);
*/
/*
	Tworzenie nowego ruchomego obiektu:
	-stwórz zmienną w punkcie 2. np "x"
	-zmienna z punktu 2. "x" ma "= new component(width, height, color, x, y);" w funkcji startGame()
	-do funkcji updateGameArea() wywołaj funkcje z wcześniejszymi zmiennymi: ArrowCrashFixed(x);
	-w funkcji updateGameArea() dodaj objectMove(x, 30, 110); liczby 30 i 110 to wysokość po jakiej rusza się nasz obiekt
*/

/*1.Globalne zmienne ogólne*/ 
var staticArrow = true, targetPoints = 0, jump = true, targetMove = 0, Myscore;
var red = document.getElementById('hero');

/*2.Obiekty na mapie*/
var MyHero, target, target2, target3, target4, target5, backgroundBottom, backgroundTop;

/*3.Zmienne broni*/
var getWeapon, getRangedWeapon, weaponONE = false, weaponTWO = false;
 
/*Zmienne sterowania*/
var mapDOWN = {}, mapPRESS = {}, lastkey = false,  heroSpeed = 5;

var myGameArea = {
    canvas 	: document.createElement("canvas"),
    start 	: function() {
				this.canvas.width = 670;
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
				Myscore = target5.value-(target.value+target2.value+target3.value+target4.value);
				scoreVAR.font = "30px Arial"
				scoreVAR.fillStyle = "white"
				scoreVAR.fillText(Myscore, 45, 505);
	}
}

function addObject() {
    myGameArea.start();
	backgroundTop = new component(690, 40, "red", 0, 0);
	backgroundBottom = new component(690, 475, "black", 0, 170);
	let floorY = backgroundBottom.y - 58;
    MyHero = new hero(0, 58, 30, floorY);
    getWeapon = new sword(0, 50);
	getRangedWeapon = new bow();
	target = new createTargetObject(40, 40, "white", 180, 90);
	target2 = new createTargetObject(40, 40, "red", 280, 90);
	target3 = new createTargetObject(40, 40, "red", 380, 90);
	target4 = new createTargetObject(40, 40, "black", 480, 90);
	target5 = new createTargetObject(40, 40, "black", 580, 50);
}

function createTargetObject(width, height, color, x, y){
	this.arrowCrashFixedTest = [];
	this.arrowCrashFixedStatic = [];
	this.fixedY = [];
	this.value = 0;
	this.bool = true;
	
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
	
	let floorY = backgroundBottom.y - 58;
	let topY = backgroundTop.height+20;
	
	
    this.update = function() {
		ctx.drawImage(red, this.x, this.y);
    }
    this.jumpHero = function() {
		if(jump){
			this.gravitySpeed += this.gravity;
			this.y += this.speedY+this.gravitySpeed;
			if(this.gravitySpeed<(-7)){
				jump = false;
			}
		}else{
			if(this.y>=floorY){
				this.y = floorY;
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
		this.x = MyHero.handPosX();
		this.y = MyHero.handPosY();
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
	
	//kij łuku
	let ctx = myGameArea.context;
	
	//cięciwy
	let ctx2 = myGameArea.context;
	let ctx3 = myGameArea.context;
	//
	
	//strzała
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
		this.x = MyHero.handPosX()+2;
		this.y = MyHero.handPosY()-10;
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
}

function ArrowCrashFixed(targetObject){
	if(crashTest(targetObject) && !(staticArrow)){
		targetObject.arrowCrashFixedTest[targetObject.value] = false;
		targetObject.arrowCrashFixedStatic[targetObject.value] = getRangedWeapon.yT12;
		targetObject.fixedY[targetObject.value] = targetObject.y;
		targetObject.value++;
		getRangedWeapon.reLoadArrow();
	}
	for(var i = 0, j = targetObject.arrowCrashFixedTest.length;i < j; i++)
	drawFixedArrow(targetObject.arrowCrashFixedStatic[i], targetObject.fixedY[i], targetObject);
	targetObject.update();
}

function drawFixedArrow(staticY, fixedY, targetObject) {
	let newArrow = myGameArea.context;
	let targetleft = targetObject.x;
	let mytop = staticY+(targetObject.y - fixedY);
	newArrow.beginPath();
	newArrow.moveTo(targetleft, mytop);
	newArrow.lineTo(targetleft-37, mytop);
	newArrow.strokeStyle = "black";
	newArrow.stroke();
}

function crashTest(objectName){
	let targetleft = objectName.x;
	let targettop = objectName.y;
	let targetbottom = objectName.y + (objectName.height);
	let targetright = objectName.x + (objectName.width);
		
	let myleft = getRangedWeapon.xCAS+40;
	let mytop = getRangedWeapon.yT12;
		
	let crash = false;
	if ((myleft > targetleft) && (myleft < targetright) && (mytop > targettop) && (mytop < targetbottom)){
		crash = true;
	}
	return crash;
}

function objectMove(objectName, yTop, yBot, speed){
	if(objectName.bool){
		objectName.y+=speed;
		if(objectName.y == yBot){
			objectName.bool=false;
		}
	}
	if(!objectName.bool){
		objectName.y-=speed;
		if(objectName.y == yTop){
			objectName.bool=true;
		}
	}
}

function control(){
	MyHero.speedX = 0;
    MyHero.speedY = 0; 
	//Sterowanie strzalkami/////////////////
    if (mapDOWN[37]/*left*/){MyHero.speedX = -heroSpeed;}
	if (mapDOWN[39]/*right*/){MyHero.speedX = heroSpeed;}
    if (mapDOWN[38]/*up*/){
		if(lastkey){}
		else{
			MyHero.gravity = -0.6;
			jump = true;
		}
		lastkey = true;
	}
    if (mapDOWN[40]/*down*/ && !staticArrow){
		getRangedWeapon.reLoadArrow();
	}
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
}

function updateGameArea() {
    myGameArea.clear();
	
	backgroundBottom.update();
	backgroundTop.update();
	
	control();
	MyHero.jumpHero();
	MyHero.update();
	getRangedWeapon.hand();
	getWeapon.hand();
	
	objectMove(target, 70, 110, 1);
	objectMove(target2, 70, 110, 0.5);
	objectMove(target3, 70, 110, 1);
	objectMove(target4, 70, 110, 0.5);
	
	ArrowCrashFixed(target);
	ArrowCrashFixed(target3);
	ArrowCrashFixed(target4);
	ArrowCrashFixed(target2);
	ArrowCrashFixed(target5);


  
	myGameArea.score();  
}

addObject();