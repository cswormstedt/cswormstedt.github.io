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
		ctx.fillStyle = "rgb(255, 232, 0)";
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
        }

        if(lives.livesCount === 0 && player.playerInput === 1){
        	$('.popUpBox-hidden2').toggleClass('popUpBox');
        	$('#next').onClick(('popUpBox').toggleClass('.popUpBox-hidden2'));
    		player.playerInput = 2;
    		lives.livesCount = 1;
    		score.points = 0;
    		this.ballX  = this.ballP[0].x;
			this.ballY  = this.ballP[0].y;
			this.ballDx = this.ballD[0].dx;
			this.ballDy = this.ballD[0].dy;
			paddle.paddleX = paddle.paddleP[0].x;
			paddle.paddleY = paddle.paddleP[0].y;
			board.initLevelOne();
			board.initBoard();
			board.drawBrick(); 
    		}
    		else if(lives.livesCount === 0 && player.playerInput === 2){
    			console.log('game over', lives.livesCount, player.playerInput)
    			$('.popUpBox-hidden').toggleClass('popUpBox');
  				$('.new').click(function(){
				window.location.reload();
				});
    			// window.location.reload();
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
					if (score.points === 30){
						console.log(ballTwo.drawBallTwo())
						ballTwo.drawBallTwo();

					}
					if (score.points === 54){
						$('.popUpBox-hidden3').toggleClass('popUpBox');
						$('.new').click(function(){
							window.location.reload();
							})
						}
                	}
				}
			}
		}
	},
};
//ball two isnt popping up
// var ballTwo ={
// //starting position
// 	ballP2: [],
// 	//starting direction
// 	ballD2: [],
// 	//updates ball postion and direction
// 	ballX2:  '',
// 	ballY2:  '',
// 	ballDx2: '',
// 	ballDy2: '',
// 	//position varibles
// 	startPoint: function(x, y){
// 		return{
// 			x: x,
// 			y: y
// 		}
// 	},
// 	//direction varibales
// 	direction: function(dx, dy){
// 		return{
// 			dx: dx,
// 			dy: dy
// 		}
// 	},
// 	//ball movement
// 	move: function(){
// 		this.ballX2 += this.ballDx2;
// 	    this.ballY2 += this.ballDy2;
// 	},
// 	// sets position and direction varibles
// 	initBall: function(){
//         this.ballP2.push(this.startPoint(canvas.width/2, canvas.height -35));
//     	this.ballD2.push(this.direction(3, -3));
//     	this.ballX2  = this.ballP2[0].x;
//     	this.ballY2  = this.ballP2[0].y;
//     	this.ballDx2 = this.ballD2[0].dx;
//     	this.ballDy2 = this.ballD2[0].dy;
//     },
// 	// ball is made
// 	drawBallTwo: function(){	
// 		ctx.beginPath(); 	      
// 		ctx.arc(this.ballX2, this.ballY2, ballRadius, 0, 2 * Math.PI);
// 		ctx.fillStyle = "rgb(255, 232, 0)";
// 		ctx.fill();
// 	},

// };

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
					ctx.strokeStyle = "rgb(255, 240, 0)";
					ctx.lineWidth = 1;
					ctx.fillStyle = "rgb(255, 232, 0)";
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
		ctx.font = "13px 'Black Ops One', cursive"
		ctx.fillStyle = "rgb(255, 232, 0)";
		ctx.fillText("SCORE: " + this.points, 478, 10);

	}
};
//lives--
var lives = {
	livesCount: 3,
	lives: function(){
		ctx.font = "12px 'Black Ops One', cursive"
		ctx.fillStyle = "rgb(255, 232, 0)";
		ctx.fillText("LIVES: " + this.livesCount, 10, 10);
	}
};

//player status
var player = {
	playerInput: 1,

	player: function(){
		ctx.font = "18px 'Black Ops One', cursive"
		ctx.fillStyle = "rgb(255, 232, 0)";
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
		ctx.strokeStyle = "rgb(255, 240, 0)";
		ctx.lineWidth = 1;
		ctx.fillStyle = "rgb(255, 232, 0)";
		ctx.fill();
		ctx.stroke();
	},

	control: function(){
			if(this.keys[37] && this.paddleX > 0){
				this.paddleX -= 6;
			}
			if(this.keys[39] && this.paddleX < canvas.width-paddleWidth){
				this.paddleX += 6;
			}	
	},

};

// var hammertime = new Hammer(myElement, myOptions);
// hammertime.on('pan', function(ev) {
// 	console.log(ev);
// });


//start
window.onload = function(event){
ball.initBall();
board.initLevelOne();
paddle.initPaddle();
console.log('hey')
  var body = document.getElementsByTagName("body")[0]
  var hammertime = new Hammer(body);
  hammertime.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
  hammertime.on("swipe", function(eventObject) {
  	console.log('1')
      if(eventObject.direction === 2) {
          console.log("left")
          console.log('2')
      } else if(eventObject.direction === 4) {
        console.log("right");
      }
      console.log(eventObject.velocityX)
  });

//start button
$(window).one('keypress', function(e) {
    if (e.keyCode === 32) {
		board.initBoard();
		$(".target").hide();
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
    // ballTwo.drawBallTwo();
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




