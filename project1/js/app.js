console.log('yo');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//grabbed canvas and created context

var mouse = [];
//ball radius to help with wall collision
var ballRadius = 10;
var paddleWidth = 100;

//ball
var ball = {
	//starting position
	ballP: [],
	//starting direction
	ballD: [],

	//updates ball postion and direction
	ballX:  '',
	ballY:  '',
	ballDx: '',
	ballDy: '',

	//position varibles
	startPoint: function(x, y){
		return{
			x: x,
			y: y
		}
	},
	//direction varibales
	direction: function(dx, dy){
		return{
			dx: dx,
			dy: dy
		}
	},
	//ball movement
	move: function(){
	
		this.ballX += this.ballDx;
	    this.ballY += this.ballDy;
	},
	
	// sets position and direction varibles
	initBall: function(){
        this.ballP.push(this.startPoint(canvas.width/2, canvas.height -35));
    	this.ballD.push(this.direction(2, -2));
    	this.ballX  = this.ballP[0].x;
    	this.ballY  = this.ballP[0].y;
    	this.ballDx = this.ballD[0].dx;
    	this.ballDy = this.ballD[0].dy;
    },

	// ball is made
	drawBall: function(){	
		ctx.beginPath(); 	      
		ctx.arc(this.ballX, this.ballY, ballRadius, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
		ctx.fill();
	},

	// collision logic
	xCollision: function(){
		//this hits the walls
		if(this.ballX + this.ballDx > canvas.width - ballRadius || 
			this.ballX + this.ballDx < ballRadius) {
	        this.ballDx = -this.ballDx;
	   	 }
	},

	yCollision: function(){
	    // this hits only the ceiling and paddle
	    if(this.ballY + this.ballDy < ballRadius){
	        this.ballDy = -this.ballDy;
	  	} 
	  	// 
	  	if(this.ballY + this.ballDy > paddle.paddleY - ballRadius) {
    	if(this.ballX > paddle.paddleX && this.ballX < paddle.paddleX + paddleWidth) {
        	this.ballDy = -this.ballDy;
   		 }
   		 else {
        	alert("GAME OVER");
       		 window.location.reload();
    		}
		}
	 },	

	 brickCollison: function(){

	 	for(c = 0; c < brick.column; c++) {
        	for(r = 0; r < brick.row; r++) {
        		brick.brickX = (c*(brick.width + brick.padding)) + brick.left;
    			brick.brickY = (r*(brick.height + brick.padding)) + brick.top;
				if(this.ballX > brick.brickX && this.ballX < brick.brickX + brick.width && 
					this.ballY > brick.brickY && this.ballY < brick.brickY + brick.height) {
                    this.ballDy = -this.ballDy;
                    console.log(brick.brickX + ' this brick x')

				}
			}
		}
	},



};

// bricks 
var brick = {

	//brick placement
	row: '',
	column: '',
	//brick size
	width: '',
	height:'',
	padding: '',
	//padding on canvas
	top: '',
	left: '',
	//x y position
	brickX: '',
	brickY: '',
	//is the brick on the screen 1 yes 0 no
	brickStatus: '',

initLevelOne: function(){
	this.row = 3;
	this.column = 6;
	this.width = 75;
	this.height = 10;
	this.padding = 10;
	this.top = 25;
	this.left = 25;

	},

drawBrick: function(){
	for(c = 0; c < this.column; c++) {
        for(r = 0; r < this.row; r++) {
        	this.brickX = (c*(this.width + this.padding)) + this.left;
    		this.brickY = (r*(this.height + this.padding)) + this.top;

				ctx.beginPath();
				ctx.rect(this.brickX, this.brickY, this.width, this.height);
				ctx.strokeStyle = "rgba(250, 0, 0, 0.9)";
				ctx.lineWidth = 1;
				ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
				ctx.fill();
				ctx.stroke();
			}
			
 		}
    }

};

//paddle
var paddle ={

	paddleP: [],
	keys: [],

	paddleX: '',
	paddleY: '',

// Spacebar 32
// Left Arrow 37
// right arrow 39

	startPoint: function(x, y){
		return{
			x: x,
			y: y
		}
	},

	initPaddle: function(){
        this.paddleP.push(this.startPoint(225, canvas.height -25));
        this.paddleX = this.paddleP[0].x;
        this.paddleY = this.paddleP[0].y;

    },

	drawPaddle: function(){
		ctx.beginPath();
		ctx.rect(this.paddleX, this.paddleY, paddleWidth, 5);
		ctx.strokeStyle = "rgba(250, 0, 0, 0.9)";
		ctx.lineWidth = 1;
		ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
		ctx.fill();
		ctx.stroke();
	},

	control: function(){
			if(this.keys[37] && this.paddleX > 0){
				this.paddleX -= 5;
			}
			if(this.keys[39] && this.paddleX < canvas.width-paddleWidth){
				this.paddleX += 5;
			}
	},

};



//start
window.onload = function(event){
ball.initBall();
paddle.initPaddle();
brick.initLevelOne();
animateCanvas();


document.addEventListener('keydown', function(event){
	paddle.keys[event.keyCode] = true;
});

document.addEventListener('keyup', function(event){
	paddle.keys[event.keyCode] = false;
});

};

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle();
    brick.drawBrick();
    ball.xCollision();
    ball.yCollision();
    ball.brickCollison();
    ball.move();
    paddle.control();
    	
};	

function animateCanvas(){
	draw();
	window.requestAnimationFrame(animateCanvas);
};




