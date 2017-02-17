console.log('yo');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//grabbed canvas and created context

var keys = [];

// Spacebar 32
// Left Arrow 37
// right arrow 39


canvas.onmouseover = myOver;
canvas.onmousemove = myMove;
var dragok = false;

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
	ballCollision: function(){
		if(this.ballX + this.ballDx > canvas.width-ballRadius || 
			this.ballX + this.ballDx < ballRadius) {
	        this.ballDx = -this.ballDx;
	    }
	    if(this.ballY + this.ballDy > canvas.height-ballRadius || 
	    	this.ballY + this.ballDy < ballRadius){
	        this.ballDy = -this.ballDy;
	    }
	    // dont think paddle dectection is working
	    if(this.ballY + this.ballDy < ballRadius){
	    	this.ballDy = -this.ballDy;
	    }
	    if(this.ballX > paddle.paddleP[0].x-ballRadius &&
	    	this.ballx > paddle.paddleP[0].x + paddleWidth){
	    	this.ballDx = -this.ballDx;
	    }
	},

};


// bricks 
var brick = {};

//paddle
var paddle ={

	paddleP: [],

	startPoint: function(x, y){
		return{
			x: x,
			y: y
		}
	},

	initPaddle: function(){
        this.paddleP.push(this.startPoint(225, canvas.height -25));
    },

	drawPaddle: function(){
		ctx.beginPath();
		ctx.rect(this.paddleP[0].x, this.paddleP[0].y, paddleWidth, 5);
		ctx.strokeStyle = "rgba(250, 0, 0, 0.9)";
		ctx.lineWidth = 1;
		ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
		ctx.fill();
		ctx.stroke();
	},

	control: function(){
			if(keys[37]){
				this.paddleP[0].x -= 5;
			}
			if(keys[39]){
				this.paddleP[0].x += 5;
			}
	}

};





//start
window.onload = function(event){
ball.initBall();
paddle.initPaddle();
animateCanvas();

document.addEventListener('keydown', function(event){
	keys[event.keyCode] = true;
});

document.addEventListener('keyup', function(event){
	keys[event.keyCode] = false;
});

};

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle();
    ball.ballCollision();
    ball.move();
    paddle.control();
    	
};	

function animateCanvas(){
	draw();
	window.requestAnimationFrame(animateCanvas);
};




