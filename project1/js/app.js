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

	body: [],
	direction: '',
	position: '',




	// draw
	drawBall: function(){	
		ctx.beginPath(); 	      
		ctx.arc(30, 30 , ballRadius, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba 0, 0, 0, 1";
		ctx.fill();
	},

};

