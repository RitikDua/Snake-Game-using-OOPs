const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
let dx=0,dy=0;
let score=60;
console.log("hello");
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
		console.log(score);
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

			console.log(this.interval);
		
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
		// console.log(this.level.number);
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

	drawSnakePart(snakePart){
		ctx.fillStyle="lightgreen";
		ctx.strokeStyle="darkgreen";
		ctx.fillRect(snakePart.x,snakePart.y,9,9);
		ctx.strokeRect(snakePart.x,snakePart.y,9,9);
			
	}
	drawSnake(snake){

		snake.pos.forEach(this.drawSnakePart);
	}
	drawSomthing(thing){
		console.log("drawSometghing"+thing.type);
	}
	drawApple(thing){
		ctx.fillStyle="red";
		ctx.strokeStyle="darkred";
		ctx.fillRect(thing.x,thing.y,9,9);
		ctx.strokeRect(thing.x,thing.y,9,9); 
	}
	drawMine(mine){
		ctx.fillStyle="black";
		ctx.strokeStyle="grey";
		ctx.fillRect(mine.x,mine.y,9,9);
		ctx.strokeRect(mine.x,mine.y,9,9);
			
	}
	drawMines(mines){
		if(mines&&mines.length!=0)
		{
			mines.forEach(this.drawMine);
		}
	}
	drawWall(x,y,size,color){
		console.log("Bangyi diwar "+size+" "+x+" "+y);
		ctx.fillStyle=color;//"brown";
		ctx.strokeStyle="black";
		ctx.fillRect(x,y,9,size);
		ctx.strokeRect(x,y,9,size);

	}
	drawWalls(snake,level,size1,size2){
		if(level==5){
			console.log("Wall");
		let size=0,minx1=0,miny1=0,minx2=300,miny2=300;
		// console.log(canvas.width);
		minx1=canvas.width-canvas.width/3;

		miny1=0;
		if(minx1==snake.x)
		{
			minx1-=20;	
		}
		minx2=canvas.height/3;

		miny2=canvas.height-canvas.height/3;
		if(minx2==snake.x)
		{
			minx2-=20;	
		}
		// console.log(size)
		this.drawWall(minx1,miny1,size1,"pink");

		this.drawWall(minx2,miny2,size2,"brown");
		}// minx2=Math.min(snake.pos[i].x,minx2);
		// miny2=Math.min(snake.pos[i].y,miny2);
		// }



	}
	draw(thing){
		console.log((thing.type==="snake"));
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
		this.speed=level.speed;
		this.apple=new Apple(200,250);
		this.mines=[];

		// this.speed=Level.speed;
// 
		// this.drawSnakeII=drawSnake;
		console.log(this.runner.pos)
		this.draw(this.apple);
		this.Flag3=true;
		this.draw(this.runner);
		this.move();						// console.log(this);


	}
	set levelnumber(l){
		this.level=l;
	}
	

	moveSnakeCanvas(){			
		ctx.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
		this.runner.x+=this.dx;

		this.runner.y+=this.dy;
		let snake=this.runner;
		console.log("Level"+this.level);
		for(let i=0;i<this.runner.pos.length;i++)
			{
				if(this.runner.x==this.runner.pos[i].x && this.runner.y==this.runner.pos[i].y)
			    {
			      clearInterval(this.interval);
			  		console.log("gameOver");
			  		return;
			    }

			}

			//level 4 wall at boundaries boundaries
			if((this.level==2&&this.Flag1)||(this.level==4&&this.Flag2)){// this.mines=new Array();
				// this.mines=[];
				if(this.level==2) this.Flag1=false;
				if(this.level==4) this.Flag2=false;
				
				for(let i=0;i<parseInt(this.level*3.9);i++)
				{
				let x=parseInt(Math.floor(Math.random()*39+1))*10;
				let y=parseInt(Math.floor(Math.random()*39+1))*10;
				if((this.runner.x==x&&this.runner.y==y)||(this.apple.x==x&&this.apple.y==y)) continue;
				{this.mines.push(new Mines(x,y));}
		

				}
			}
			if(this.level>=4)
			{
				document.getElementById("game").style.border=`3px solid black`;
				if(this.runner.x>=canvas.width||this.runner.y>=canvas.height||this.runner.y<=0||this.runner.x<=0)
				{
					clearInterval(this.interval);
					console.log("gameOver Wall");
					return;
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
			  		console.log("gameOver Mine");
			  		return;
		  	}
		  }}

		  this.runner.pos.unshift({x: this.runner.x , y: this.runner.y}) ; // Insert at 0th position
		  	// console.log(this.apple.x);
		  	// console.log(this.apple.y);
		  	// console.log(this.runner);
		  if(this.runner.x===this.apple.x && this.runner.y===this.apple.y){
		  	this.apple.x=parseInt(Math.floor(Math.random()*35+1));

			this.apple.y=parseInt(Math.floor(Math.random()*35+1));
			score+=10;
			this.apple.x*=10;
    		this.apple.y*=10;
    		this.LEVEL=this.LEVEL.newLevel;//level obj
    		
    		this.levelnumber=this.LEVEL.number;//level number
    		// console.log("Score: "+this.level+" "+score);
    		// 
		  	// this.apple.x*=16;this.apple.*=16;
		  }
		 else this.runner.pos.pop();
		
		
		this.draw(this.runner);
		
	}
	move(){
		let here=this;

		this.draw(this.runner);
		// this.moveSnakeCanvas();
  		// setInterval((e)=>{
  		// 	console.log(e);
  		// here.dx=12;
  		// here.moveSnakeCanvas();
  		// 	},100)
  		let Flag3=true;
  		let size1=0,size2=0;
  		document.addEventListener('keydown',(e)=>{
			if(this.run){
				// let here=this;
					switch(e.keyCode){

						case 37: console.log("Left");
								if(this.dir!="right")
								{	if(this.interval!="")
									clearInterval(this.interval);
									let here=this;
									console.log(here);

									console.log("Score "+score+" Level "+here.level);	
									here.interval=setInterval((e)=>{
										here.dx=-10;here.dy=0;
										here.moveSnakeCanvas();
										here.draw(here.apple);
										here.drawMines(here.mines);
										if(here.level==5&&Flag3){
											Flag3=false;
										// let size1=0;
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
										
										console.log("Size: "+size1);
										here.drawWalls(here.runner,here.level,size1,size2);

										}
										else{
										here.drawWalls(here.runner,here.level,size1,size2);
										}

									},180);
									this.dir='left';
								}
						break;
						case 39: console.log("Right");
								if(this.dir!="left")
								{	if(this.interval!="")
									clearInterval(this.interval);
									let here=this;
									console.log(here);
									console.log("Score "+score);	
									here.interval=setInterval((e)=>{
										here.dx=10;here.dy=0;
										here.moveSnakeCanvas();
									
										here.draw(here.apple);

										here.drawMines(here.mines);
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
										
										console.log("Size: "+size1);
										here.drawWalls(here.runner,here.level,size1,size2);
										}
										else{
										here.drawWalls(here.runner,here.level,size1,size2);
										}


									},180);
										
									this.dir='right';
								}
						break;
						case 38: console.log("Up");
								if(this.dir!="down")
								{	if(this.interval!="")
									clearInterval(this.interval);
									let here=this;
									console.log(here);
									console.log("Score "+score);	
									here.interval=setInterval((e)=>{
										here.dx=0;here.dy=-10;
										here.moveSnakeCanvas();
										here.draw(here.apple);
										here.drawMines(here.mines);
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
										
										console.log("Size: "+size1);
										here.drawWalls(here.runner,here.level,size1,size2);
										}
										else{
										here.drawWalls(here.runner,here.level,size1,size2);
										}
									},180);
									this.dir='up';
								}
						break;
						case 40: console.log("Down");
								if(this.dir!="up")
								{	if(this.interval!="")
									clearInterval(this.interval);
									let here=this;
									console.log(here);
									console.log("Score "+score);	
									here.interval=setInterval((e)=>{
										here.dx=0;here.dy=10;
										here.moveSnakeCanvas();
										here.draw(here.apple);
										here.drawMines(here.mines);
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
										
										console.log("Size: "+size1);
										here.drawWalls(here.runner,here.level,size1,size2);
										}
										else{
										here.drawWalls(here.runner,here.level,size1,size2);
										}

										
									},180);
									this.dir='down';
								}
						break;
						case 32: console.log("Paused");//forPause
								clearInterval(this.interval);
					}	
			}
		})

	}

}

function domElt(name,attrs,...children){
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

class State {
	constructor(level,status){
		this.level=level;
		// this.actors=actors;
		this.status=status;

		console.log(this.status);
		if(this.status=="playing")
		{
				this.playing();
		}
		else{
			this.paused();
		}
	}
	playing(){
				
		let snakeTest= new Snake(150,150,[  {x: 150, y: 150}],1);
		// let test=new Draw(new Level(2));
		// test.draw(snakeTest);
		// console.log(test.draw);
		let move=new Move(snakeTest,this.level);//,new Draw());
	}
	static start(level){
		return new State(level,"playing");
	}

	static paused(level){
		return new State(level,"paused");
	}
}
let test1=State.start(new Level(1));