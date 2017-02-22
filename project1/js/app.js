console.log('yo');
//grabbed canvas and created context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
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
	collision: function(){
		//this hits the walls
		if(this.ballX + this.ballDx > canvas.width - ballRadius || 
			this.ballX + this.ballDx < ballRadius) {
	        this.ballDx = -this.ballDx;
	   	}
	    // this hits only the ceiling and paddle
	    if(this.ballY + this.ballDy < ballRadius){
	        this.ballDy = -this.ballDy;
	  	} 
	  	if(this.ballY + this.ballDy > paddle.paddleY - ballRadius) {
    	if(this.ballX > paddle.paddleX && this.ballX < paddle.paddleX + paddleWidth + 5) {
        	this.ballDy = -this.ballDy;
   		}
   		//lives and game over screen
   		else{
			lives.livesCount -= 1;
			this.ballX  = this.ballP[0].x;
			this.ballY  = this.ballP[0].y;
			this.ballDx = -3;
			this.ballDy = 3;
			paddle.paddleX = paddle.paddleP[0].x;
        	paddle.paddleY = paddle.paddleP[0].y;
        }if(lives.livesCount === 0){
    		alert("GAME OVER");
       		 window.location.reload();
    		}
		}
	 // brickCollison
	 	for(c = 0; c < board.column; c++) {
        	for(r = 0; r < board.row; r++) {
        		board.brickX = (c*(board.width + board.padding)) + board.left;
    			board.brickY = (r*(board.height + board.padding)) + board.top;
    			if(board.board[c][r].status == 1){
				if(this.ballX > board.brickX && this.ballX < board.brickX + board.width && 
					this.ballY > board.brickY && this.ballY < board.brickY + board.height) {
                    this.ballDy = -this.ballDy;
                    board.board[c][r].status = 0;
                    score.points +=1 ;
                    //scoring and winning screen
	                if(score.points === 18){
	                	board.row += 2;
	                	this.ballX  = this.ballP[0].x;
		    			this.ballY  = this.ballP[0].y;
						this.ballDx = this.ballD[0].dx;
	    				this.ballDy = this.ballD[0].dy;
						paddle.paddleX = paddle.paddleP[0].x;
	        			paddle.paddleY = paddle.paddleP[0].y;
						board.initBoard();
						board.drawBrick();
					}
					if (score.points === 36){
						alert("PLAYER: " + this.playerInput + " WON!");
						}
                	}
				}
			}
		}
	},

};

// board 
var board = {
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
	//initBoard array array
	board: [],
//level one design
initLevelOne: function(){
	this.row = 3;
	this.column = 6;
	this.width = 75;
	this.height = 10;
	this.padding = 10;
	this.top = 25;
	this.left = 25;
	this.brickStatus = 1;
},
// level two design
// initLevelTwo: function(){
// 	this.row = 6;
// 	this.column = 6;
// 	this.width = 75;
// 	this.height = 10;
// 	this.padding = 10;
// 	this.top = 25;
// 	this.left = 25;
// 	this.brickStatus = 1;
// },	
initBoard: function (){
	for(c = 0; c < this.column; c++) {
		this.board[c]=[];
        for(r = 0; r < this.row; r++) {
        	this.board[c][r]={x:this.brickX, y:this.brickY, status:this.brickStatus};
		}
	}
},

drawBrick: function(){
	for(c = 0; c < this.column; c++) {
        for(r = 0; r < this.row; r++) {
        	if(this.board[c][r].status == 1){
	        	this.brickX = (c*(this.width + this.padding)) + this.left;
	    		this.brickY = (r*(this.height + this.padding)) + this.top;
	    			this.board[c][r].x = this.brickX;
	    			this.board[c][r].y = this.brickY;
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
    }
};
//score ++
var score = {
	points: 0,
	score: function(){
		ctx.font = "12px 'Black Ops One', cursive"
		ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
		ctx.fillText("SCORE " + this.points, 482, 10);

	}
};
//lives--
var lives = {
	livesCount: 3,
	lives: function(){
		ctx.font = "12px 'Black Ops One', cursive"
		ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
		ctx.fillText("LIVES " + this.livesCount, 10, 10);
	}
};

//player status
var player = {
	playerInput:'',


	player: function(){
		ctx.font = "18px 'Black Ops One', cursive"
		ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
		ctx.fillText("PLAYER: " + this.playerInput, canvas.width/2 - 44, canvas.height -330);
	}
};

//paddle
var paddle ={

	paddleP: [],
	keys: [],

	paddleX: '',
	paddleY: '',

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
board.initLevelOne();
paddle.initPaddle();

//start button
$(window).keypress(function(e) {
    if (e.keyCode === 32) {
		board.initBoard();
		animateCanvas();
	}
});

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
    board.drawBrick();
    ball.collision();
    score.score();
    lives.lives();
    player.player();
    ball.move();
    paddle.control();
    	
};	

function animateCanvas(){
	draw();
	window.requestAnimationFrame(animateCanvas);
};




