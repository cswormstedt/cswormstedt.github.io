console.log('yo');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//grabbed canvas and created context

var keys = [];
var mouse = [];

window.onload = function(event){

ball.initBall();
// ball.initMove();
animateCanvas();

}

//ball radius to help with wall collision
var ballRadius = 10;
var dx = 2;
var dy = -2;


ball
var ball ={

	position: [],

	direction: [],

	// starting position
	startPoint: function(x, y){
		return{
			x: x,
			y: y
		}
	},

	// puts the staring position
	initBall: function(){
        this.position.push(this.startPoint(canvas.width/2, canvas.height -30));
    },

	//how to put in direction to call in draw function??
	// movement: function(dx, dy){
	// 	return{
	// 		dx: this.position[0].x += dx,
	// 		dy: this.position[0].y += dy
	// 	}
	// },

	// //start movement
	// initMove: function (){
	// 	this.direction.push(this.movement(2, -2));

	// },

	// draw
	drawBall: function(){	
		ctx.beginPath(); 	      
		ctx.arc((this.position[0].x), (this.position[0].y), ballRadius, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(0, 0, 230, 0.7)";
		ctx.fill();
	},
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    
	if(ball.position[0].x + dx > canvas.width-ballRadius || ball.position[0].x + dx < ballRadius) {
        dx = -dx;
    }
    if(ball.position[0].y + dy > canvas.height-ballRadius || ball.position[0].y + dy < ballRadius) {
        dy = -dy;
    }

	ball.position[0].x += dx;
    ball.position[0].y += dy;
	
};	

function animateCanvas(){
	draw();
	window.requestAnimationFrame(animateCanvas);
};




