console.log('yo');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//grabbed canvas and created context

var keys = [];
var mouse = [];

window.onload = function(event){

ball.initBall();
animateCanvas();

}

//ball radius to help with wall collision
var ballRadius = 10;


//ball
var ball ={
	//position
	p: [],
	//direction
	d: [],

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
        this.p.push(this.startPoint(canvas.width/2, canvas.height -30));
    	this.d.push(this.movement(2, -2));
    },

	// ball is made
	drawBall: function(){	
		ctx.beginPath(); 	      
		ctx.arc((this.p[0].x), (this.p[0].y), ballRadius, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
		ctx.fill();
	},
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    //collison logic
	if(ball.p[0].x + ball.d[0].dx > canvas.width-ballRadius || ball.p[0].x + ball.d[0].dx < ballRadius) {
        ball.d[0].dx = -ball.d[0].dx;
    }
    if(ball.p[0].y + ball.d[0].dy > canvas.height-ballRadius || ball.p[0].y + ball.d[0].dy < ballRadius) {
        ball.d[0].dy = -ball.d[0].dy;
    }
    //ball movement
	ball.p[0].x += ball.d[0].dx;
    ball.p[0].y += ball.d[0].dy;
	
};	

function animateCanvas(){
	draw();
	window.requestAnimationFrame(animateCanvas);
};




