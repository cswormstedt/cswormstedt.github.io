console.log('yo');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//grabbed canvas and created context

var keys = [];
var mouse = [];

window.onload = function(event){

ball.initBall();
paddle.initPaddle();
animateCanvas();

}

//ball radius to help with wall collision
var ballRadius = 10;

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

//ball
var ball ={
	//position
	ballP: [],
	//direction
	ballD: [],

	//position varibles
	startPoint: function(x, y){
		return{
			x: x,
			y: y
		}
	},
	//direction varibales
	movement: function(dx, dy){
		return{
			dx: dx,
			dy: dy
		}
	},
	// sets position and direction varibles
	initBall: function(){
        this.ballP.push(this.startPoint(canvas.width/2, canvas.height -30));
    	this.ballD.push(this.movement(2, -2));
    },

	// ball is made
	drawBall: function(){	
		ctx.beginPath(); 	      
		ctx.arc((this.ballP[0].x), (this.ballP[0].y), ballRadius, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
		ctx.fill();
	},
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle();
    //collison logic
	if(ball.ballP[0].x + ball.ballD[0].dx > canvas.width-ballRadius || ball.ballP[0].x + ball.ballD[0].dx < ballRadius) {
        ball.ballD[0].dx = -ball.ballD[0].dx;
    }
    if(ball.ballP[0].y + ball.ballD[0].dy > canvas.height-ballRadius || ball.ballP[0].y + ball.ballD[0].dy < ballRadius) {
        ball.ballD[0].dy = -ball.ballD[0].dy;
    }
    //ball movement
	ball.ballP[0].x += ball.ballD[0].dx;
    ball.ballP[0].y += ball.ballD[0].dy;
	
};	

function animateCanvas(){
	draw();
	window.requestAnimationFrame(animateCanvas);
};




