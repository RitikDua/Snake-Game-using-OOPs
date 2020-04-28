const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
let dx=0,dy=0;
let score=0;
let points=1;//change this to 10 for testing

class Level{
	constructor(level){
		this.startActors=[];
		this.speed=1;
		this.level=level;
	}
	get number(){
		return this.level;
	}
	get newLevel(){
		//console.log(score);
		if(score==20)
			return new Level(2);
		if(score==40)
			return new Level(3);
		if(score==60)
			return new Level(4);
		if(score==80)
			return new Level(5);
		if(score==100)
		{	window.alert("You win");

			//console.log(this.interval);
		
			return new Level(20);
		}
		else{
			return this;
		}
	}
}
class Mines {
	constructor(x,y){
		this.x=x;
		// //console.log(this.level.number);
		this.y=y;
	}
	get type(){
		return "mine";
	}
}
class Draw{
	// constructor(level){
	// 	this.level=level.number;
	// }
	constructor(){
		this.wall1=[];
		this.wall2=[];
	}
	get getWalls(){
		return this.walls;
	}
	drawSnakePart(snakePart){
		ctx.fillStyle="lightgreen";
		ctx.strokeStyle="darkgreen";
		ctx.fillRect(snakePart.x,snakePart.y,9,9);
		ctx.strokeRect(snakePart.x,snakePart.y,9,9);
			
	}
	drawSnake(snake,...rotation){
	// let rt='right'; 
	// 	if(rotation)
	// 		rt=rotation.pop();
	// 	let img=new Image();
	// 	img.src="./img/snake"+rt+".png";
	// 	ctx.drawImage(img,snake.x,snake.y,13,13);
		snake.pos.forEach(this.drawSnakePart);
	}
	drawSomthing(thing){
		//console.log("drawSometghing"+thing.type);
	}
	drawApple(thing){
	
		let img=new Image();
		img.src="./img/apple1.png";
		ctx.drawImage(img,thing.x,thing.y,13,13);
		// ctx.fillStyle="red";
		// ctx.strokeStyle="darkred";
		// ctx.fillRect(thing.x,thing.y,9,9);
		// ctx.strokeRect(thing.x,thing.y,9,9); 
	}
	drawMine(mine){
		let img=new Image();
		img.src="./img/mine.png";
		ctx.drawImage(img,mine.x,mine.y,13,13);
		// ctx.fillStyle="black";
		// ctx.strokeStyle="grey";
		// ctx.fillRect(mine.x,mine.y,9,9);
		// ctx.strokeRect(mine.x,mine.y,9,9);
			
	}
	drawBrick(x,y){
		//console.log("Bangyi diwar "+size+" "+x+" "+y);
		ctx.fillStyle="brown";
		ctx.strokeStyle="black";
		ctx.fillRect(x,y,9,9);
		ctx.strokeRect(x,y,9,9);
		// this.walls.push(new Array([x,y]));
	}
	drawWallsI(snake){
		// if(level==5){

			//console.log("Wall");
		// let size=0,minx1=0,miny1=0,minx2=300,miny2=300;
		// // //console.log(canvas.width);
		// minx1=canvas.width-canvas.width/3;

		// miny1=0;
		// if(minx1==snake.x)
		// {
		// 	minx1-=20;	
		// }
		// minx2=canvas.height/3;

		// miny2=canvas.height-canvas.height/3;
		// if(minx2==snake.x)
		// {
		// 	minx2-=20;	
		// }
		// //console.log(size)
		let min1,min2,max1,max2;
		min1=1000000;
		min2=1000000;
		max1=0;
		max2=0;
		for(let i=0;i<snake.length;i++)
		{
			min1=Math.min(snake[i].x,min1);
			min2=Math.min(snake[i].y,min2);
			max1=Math.max(snake[i].x,max1);
			max2=Math.max(snake[i].y,max2);
				
		}
		let x1=min1,y1=0,wall=[];
		while(y1<max2-20)
		{	wall.push({x:x1,y:y1})
			this.wall1.push({x:x1,y:y1});
			if(y1<max2-20)
				y1+=10;
		}

		for(let i=0;i<wall.length;i++)
		{
			let obj=wall[i];
			this.drawBrick(obj.x,obj.y);
		}x1=max1+20;y1=0;
		wall=[];
		while(y1<min2-20)
		{	wall.push({x:x1,y:y1})
			this.wall1.push({x:x1,y:y1});
			if(y1<max2-20)
				y1+=10;
		}

		for(let i=0;i<wall.length;i++)
		{
			let obj=wall[i];
			this.drawBrick(obj.x,obj.y);
		}
		// this.drawBrick(minx2,miny2,size2,"brown");
		// }// minx2=Math.min(snake.pos[i].x,minx2);
		// miny2=Math.min(snake.pos[i].y,miny2);
		// }



	}

	drawMines(mines,snake){
		if(mines&&mines.length!=0)
		{
			mines.forEach(this.drawMine);
		}
		if(snake&&snake.length!=0)
		{
			this.drawWallsI(snake);
		}
	}
	get getWallsI(){
		return this.wall1;
	}

	get getWallsII(){
		return this.wall2;
	}
	drawWalls(snake,l)
	{

	}
	draw(thing){
		//console.log((thing.type==="snake"));
		if(thing.type==="snake")
		{
			this.drawSnake(thing);
		}
		else if(thing.type==="apple"){
			this.drawApple(thing);
		}
		else if(thing.type==="mine")
		{
			this.drawMine(thing);
		}
		else{
			this.drawSomthing(thing);
		}
	}
}

class Snake{
	constructor(x,y,pos,speed){
		this.pos=pos;
		this.x=y;
		this.y=y;
		this.speed=speed;
	}
	get type(){
		return "snake";
	}

}
let bug=0;
class Apple {
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	get type(){
		return "apple";
	}


}
class Move extends Draw{
	constructor(runner,level){
		super();
		this.counter=true;
		this.snake=[];
		this.LEVEL=level;//level obj
		this.level=level.number;
		this.runner=runner;
		this.dir="none";
		this.interval="";
		this.run=true;
		this.dx=0;
		this.dy=0;
		this.Flag1=true;
		this.Flag2=true;
		this.Flag3=true;
		this.speed=level.speed;
		this.apple=new Apple(200,250);
		this.mines=[];

		// this.speed=Level.speed;
// 
		// this.drawSnakeII=drawSnake;
		//console.log(this.runner.pos)
		this.draw(this.apple);
		this.Flag3=true;
		this.draw(this.runner);
		
		this.result=undefined;
		this.move();						// //console.log(this);


	}
	

	// get result(){
	// 	return this.result;
	// }
	set levelnumber(l){
		this.level=l;
	}
	

	moveSnakeCanvas(...rotation){			
		ctx.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
		this.runner.x+=this.dx;

		this.runner.y+=this.dy;
		let snake=this.runner;
		//console.log("Level"+this.level);
		for(let i=0;i<this.runner.pos.length;i++)
			{
				if(this.runner.x==this.runner.pos[i].x && this.runner.y==this.runner.pos[i].y)
			    {
			      clearInterval(this.interval);
			  		//console.log("gameOver");
			  		this.result=new State(this.level,"exit","self");
			  		return;
			    }

			}

			//level 4 wall at boundaries boundaries
			if((this.level==2&&this.Flag1)||(this.level==4&&this.Flag2)){// this.mines=new Array();
				// this.mines=[];
				if(this.level==2) this.Flag1=false;
				if(this.level==4) this.Flag2=false;
				
				for(let i=0;i<parseInt(this.level*4.7);i++)
				{
				let x=parseInt(Math.floor(Math.random()*49+1))*10;
				let y=parseInt(Math.floor(Math.random()*49+1))*10;
				if((this.runner.x==x&&this.runner.y==y)||(this.apple.x==x&&this.apple.y==y)) continue;
				{this.mines.push(new Mines(x,y));}
		

				}
			}
			if(this.level==5&&this.counter)
			{this.counter=false;
				for(let i=0;i<this.runner.pos.length;i++)
				this.snake.push({x:this.runner.pos[i].x,y:this.runner.pos[i].y})

			}
			if(this.level>=4)
			{
				document.getElementById("game").style.border=`6px solid rgba(101,67,33,0.9)`;
				if(this.runner.x>=canvas.width||this.runner.y>=canvas.height||this.runner.y<=0||this.runner.x<=0)
				{
					clearInterval(this.interval);
					//console.log("gameOver Wall");
					this.result=new State(this.level,"exit","Walls");
					
					return;
				}
			}
			if(this.level==5&&this.getWallsI!=undefined)
			{	let wall=this.getWallsI;
				 for(let i=0;i<wall.length;i++)
		  	{
		  	if(this.runner.x==wall[i].x&&this.runner.y==wall[i].y)
		  	{
			      clearInterval(this.interval);
			  		this.result=new State(this.level,"exit","Wall");
			  		return;
		  	}
		  }
			}
			if(this.level==5&&this.getWallsII!=undefined)
			{	let wall=this.getWallsII;
				 for(let i=0;i<wall.length;i++)
		  	{
		  	if(this.runner.x==wall[i].x&&this.runner.y==wall[i].y)
		  	{
			      clearInterval(this.interval);
			  		this.result=new State(this.level,"exit","Wall");
			  		return;
		  	}
		  }
			}
			if(this.runner.x<0)
			this.runner.x=canvas.width-this.runner.x*-1;
			if(this.runner.y<0)
			this.runner.y=canvas.height-this.runner.y*-1;
			if(this.runner.x>0)
			this.runner.x%=canvas.width;
			if(this.runner.y>0)
			this.runner.y%=canvas.height;
			 if(this.mines){
			 for(let i=0;i<this.mines.length;i++)
		  	{
		  	if(this.runner.x==this.mines[i].x&&this.runner.y==this.mines[i].y)
		  	{
			      clearInterval(this.interval);
			  		//console.log("gameOver Mine");

		// let img=new Image();
		// img.src="./img/boom1.png";
		// ctx.clearRect(this.mines[i].x,this.mines[i].ycanvas.width, canvas.height);
		// console.log(this.mines[i].x+"" +this.mines[i].y)
		// ctx.drawImage(img,this.mines[i].x,this.mines[i].y,13,13);
					this.result=new State(this.level,"exit","Mines");
			  		return;
		  	}
		  }}

		  this.runner.pos.unshift({x: this.runner.x , y: this.runner.y}) ; // Insert at 0th position
		  	// //console.log(this.apple.x);
		  	// //console.log(this.apple.y);
		  	// //console.log(this.runner);
		  if(this.runner.x===this.apple.x && this.runner.y===this.apple.y){
		  	this.apple.x=parseInt(Math.floor(Math.random()*45+1));

			this.apple.y=parseInt(Math.floor(Math.random()*45+1));
			score+=points;
			this.apple.x*=10;
    		this.apple.y*=10;
    		this.LEVEL=this.LEVEL.newLevel;//level obj
    		
    		this.levelnumber=this.LEVEL.number;//level number
    		
    		if(this.levelnumber==20)//Winner
    		{
    			clearInterval(this.interval);
    			
				this.result=new State(this.level,"win");
    			return; 
    		}
    		else{

			scoreBoard(this.level);
    		}
		  }
		 else this.runner.pos.pop();
		
		
		this.drawSnake(this.runner,rotation);
		
	}
	move(){
		let here=this;

		this.draw(this.runner);
		// this.moveSnakeCanvas();
  		// setInterval((e)=>{
  		// 	//console.log(e);
  		// here.dx=12;
  		// here.moveSnakeCanvas();
  		// 	},100)
  		let Flag3=true;
  		let size1=0,size2=0;
  		document.addEventListener('keydown',(e)=>{
			if(this.run){
				// let here=this;
					switch(e.keyCode){

						case 37: //console.log("Left");
								if(this.dir!="right")
								{	if(this.interval!="")
									clearInterval(this.interval);
									let here=this;
									console.log(here);

									//console.log("Score "+score+" Level "+here.level);	
									here.interval=setInterval((e)=>{
										here.dx=-10;here.dy=0;
										here.moveSnakeCanvas("left");
										here.draw(here.apple);
										if(here.level==5&&Flag3){
											Flag3=false;
										// let size1=0;
										here.drawWalls(here.snake);


										here.drawMines(here.mines,here.snake);

										}
										else{

										here.drawWalls(here.snake);
										here.drawMines(here.mines,here.snake);
										}
										if(here.result) {
											clearInterval(here.interval);
										}

									},116-parseInt(this.level-parseInt(this.level*3.9)));
									this.dir='left';
								}
						break;
						case 39: //console.log("Right");
								if(this.dir!="left")
								{	if(this.interval!="")
									clearInterval(this.interval);
									let here=this;
									console.log(here);
									//console.log("Score "+score);	
									here.interval=setInterval((e)=>{
										here.dx=10;here.dy=0;
										here.moveSnakeCanvas("right");
									
										here.draw(here.apple);

										here.drawMines(here.mines,here.snake);
										if(here.level==5&&Flag3){
											Flag3=false;

										for(let i=0;i<here.runner.pos.length;i++)
											size1=parseInt(Math.max(here.runner.pos[i].y,size1));
										for(let i=0;i<here.runner.pos.length;i++)
											size2=parseInt(Math.max(here.runner.pos[i].y,size2));
										
										size1-=10;
										if(size1<=0)
										{
											size1*=-1;
											size1%=10+1;
										}
										

										size2-=10;
										if(size2<=0)
										{
											size2*=-1;
											size2%=10+1;
										}
										
										here.drawWalls(here.snake);


										here.drawMines(here.mines,here.snake);
										}
										else{
										here.drawWalls(here.snake);


										here.drawMines(here.mines,here.snake);
										}if(here.result) {
											clearInterval(here.interval);
										}


									},116-parseInt(this.level-parseInt(this.level*3.9)));
										
									this.dir='right';
								}
						break;
						case 38: //console.log("Up");
								if(this.dir!="down")
								{	if(this.interval!="")
									clearInterval(this.interval);
									let here=this;
									console.log(here);
									//console.log("Score "+score);	
									here.interval=setInterval((e)=>{
										here.dx=0;here.dy=-10;
										here.moveSnakeCanvas("up");
										here.draw(here.apple);
										here.drawMines(here.mines,here.snake);
										if(here.level==5&&Flag3){
											Flag3=false;
										
										for(let i=0;i<here.runner.pos.length;i++)
											size1=parseInt(Math.max(here.runner.pos[i].y,size1));
										for(let i=0;i<here.runner.pos.length;i++)
											size2=parseInt(Math.max(here.runner.pos[i].y,size2));
										
										size1-=10;
										if(size1<=0)
										{
											size1*=-1;
											size1%=10+1;
										}
										

										size2-=10;
										if(size2<=0)
										{
											size2*=-1;
											size2%=10+1;
										}
										
										//console.log("Size: "+size1);
										here.drawWalls(here.snake);


										here.drawMines(here.mines,here.snake);
										}
										else{
										here.drawWalls(here.snake);


										here.drawMines(here.mines,here.snake);
										}if(here.result) {
											clearInterval(here.interval);
										}
									},116-parseInt(this.level-parseInt(this.level*3.9)));
									this.dir='up';
								}
						break;
						case 40: //console.log("Down");
								if(this.dir!="up")
								{	if(this.interval!="")
									clearInterval(this.interval);
									let here=this;
									console.log(here);
									//console.log("Score "+score);	
									here.interval=setInterval((e)=>{
										here.dx=0;here.dy=10;
										here.moveSnakeCanvas("down");
										here.draw(here.apple);
										here.drawMines(here.mines,here.snake);
										if(here.level==5&&Flag3){
											Flag3=false;
										
										for(let i=0;i<here.runner.pos.length;i++)
											size1=parseInt(Math.max(here.runner.pos[i].y,size1));
										for(let i=0;i<here.runner.pos.length;i++)
											size2=parseInt(Math.max(here.runner.pos[i].y,size2));
										
										size1-=10;
										if(size1<=0)
										{
											size1*=-1;
											size1%=10+1;
										}
										

										size2-=10;
										if(size2<=0)
										{
											size2*=-1;
											size2%=10+1;
										}
										
										//console.log("Size: "+size1);
										here.drawWalls(here.snake);


										here.drawMines(here.mines,here.snake);
										}
										else{
										here.drawWalls(here.snake);


										here.drawMines(here.mines,here.snake);
										}if(here.result) {
											clearInterval(here.interval);
										}

										
									},116-parseInt(this.level-parseInt(this.level*3.9)));
									this.dir='down';

								}
						break;
						case 32: //console.log("Paused");//forPause
								clearInterval(this.interval);
					}	
			}
		})
	
	}

}

function elt(name,attrs,...children){
	let dom=document.createElement(name);
	for (let i of Object.keys(attrs)){
		dom.setAttribute(i,attrs[i]);
	}
	for (let child of children)
	{
		dom.appendChild(child);
	}
	return dom;
}

class State  {
	constructor(level,status,...reasons){
		this.level=level;
		this.reasons=reasons;
		// this.actors=actors;
		this.status=status;

		//console.log(this.status);
		if(this.status=="playing")
		{
				this.playing();
		}
		else if(this.status=="exit"){
			this.exit();
		}
		else{
			this.win();
		}
	}
	win(){
		//console.log('Win');
		window.alert("Oh you lose");
	
	}
	exit(){
		//console.log(this.reasons);
		window.alert("Oh you lose");
	}
	playing(){
				
		let snakeTest= new Snake(150,150,[  {x: 150, y: 150}],1);
		// let test=new Draw(new Level(2));
		// test.draw(snakeTest);
		// //console.log(test.draw);
		let move=new Move(snakeTest,this.level).result;

	}
	static start(level){
		return new State(level,"playing");
	}

	static exit(level,...reasons){
		return new State(level,"exit",...reasons);
	}
}
function elt(name, attrs, ...children) {
let dom = document.createElement(name);
for (let attr of Object.keys(attrs)) {
dom.setAttribute(attr, attrs[attr]);
}
for (let child of children) {
dom.appendChild(child);
}
return dom;
}
let test1=State.start(new Level(1));
function scoreBoard(level){
	let list = document.getElementById("ScoreBoard");


	while (list.hasChildNodes()) {
  	list.removeChild(list.firstChild);

  	// list.removeFirstChild();

	}
	

	let l=elt("h1",{id:"level"});
	l.innerHTML=`<span style='font-size:5.3vh'>Level</span><br/>`+`<span style='font-size:5vh'>${level}</span>`;

	let s=elt("h1",{id:"score"});
	s.innerHTML=`<span style='font-size:6.3vh'>Score</span><br/>`+`<span style='font-size:6vh;padding-top:30vh;'>${score}</span>`;console.log(score);
	document.getElementById("ScoreBoard").appendChild(l);
	document.getElementById("ScoreBoard").appendChild(s);

}
// functij