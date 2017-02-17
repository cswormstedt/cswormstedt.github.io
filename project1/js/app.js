console.log('yo');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//grabbed canvas and created context

var keys = [];
var mouse = [];



//ball radius to help with wall collision
var ballRadius = 10;



//ball
var ball ={

	position: [],

	direction: '',

	// starting position
	startPoint: function(x, y){
		return{
			x: x,
			y: y
		}
		console.log(hey);
	},
	

	initBall: function(){
        this.position.push(this.startPoint(canvas.width/2, canvas.height -30));
    
    },
    
	// draw
	drawBall: function(){	
		ctx.beginPath(); 	      
		ctx.arc((this.position[0].x), (this.position[0].y), ballRadius, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(0, 0, 230, 0.7)";
		ctx.fill();
	},

};

// window.requestAnimationFrame(ball.drawBall);


