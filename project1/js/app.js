console.log('yo');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//grabbed canvas and created context

var keys = [];
var mouse = [];
//ball radius to help with wall collision
var ballRadius = 10;

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
	    	this.ballY + this.ballDy < ballRadius) {
	        this.ballDy = -this.ballDy;
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
		ctx.rect(this.paddleP[0].x, this.paddleP[0].y, 100, 5);
		ctx.strokeStyle = "rgba(250, 0, 0, 0.9)";
		ctx.lineWidth = 1;
		ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
		ctx.fill();
		ctx.stroke();
	},

};



window.onload = function(event){
ball.initBall();
paddle.initPaddle();
animateCanvas();
};


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle();
    ball.ballCollision();
    ball.move();

	// ball.ballX += ball.ballDx;
	// ball.ballY += ball.ballDy;
    	
};	

function animateCanvas(){
	draw();
	window.requestAnimationFrame(animateCanvas);
};




