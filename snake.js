const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
let dx=0,dy=0;
console.log("hello");
class Level{
	constructor(){
		this.startActors=[];
		this.speed=1;
		
	}
}
class Snake{
	constructor(pos,speed){
		this.pos=pos;
		this.speed=speed;
	}
	get type(){
		return "snake";
	}

}

class Move{
	constructor(runner,speed){
		
		this.runner=runner;
		this.dir="none";
		this.interval="";
		this.run=true;
		this.speed=speed;
		// this.speed=Level.speed;
		this.move();

								console.log(this);


	}
	 move(){
  ctx.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
  	this.interval=setInterval(this.moveSnake(this),200);
  // this.moveSnake();
	}
	moveSnake(){
		document.addEventListener("keydown",(e)=>{
			
			if(this.run)
			{switch(e.keyCode)
			{
				case 37:console.log("left");
						
						if(this.dir!="right")
						{	let here=this;
							clearInterval(this.interval);

							this.interval=setInterval(function(e){
								
								dx=-10;
								dy=0;
								 console.log(here);
								 here.move();
							},180);
							this.dir="left";
						}
				break;
				case 38:console.log("up");

						if(this.dir!="down")
						{	let here=this;
							clearInterval(this.interval);
							this.interval=setInterval(function(){
								dx=-10;
								dy=0;
								console.log(here);
								here.move();
							},180);
							this.dir="up";
						}
				break;
				case 39:console.log("right");

						if(this.dir!="left")
						{let here=this;
							clearInterval(this.interval);
							this.interval=setInterval(function(){
								dx=10;
								dy=0;
								console.log(here);
								here.move();
							},180);
							this.dir="right";
						}
				break;
				case 40:console.log("down");

						if(this.dir!="up")
						{let here=this;
							clearInterval(this.interval);
							this.interval=setInterval(function(){
								dx=10;
								dy=0;
								console.log(here);
								here.move();
							},180);
							this.dir="down";
						}
				break;
				// case 32:this.			
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
class Draw{

	drawSnakePart(snakePart){
		ctx.fillStyle="lightgreen";
		ctx.strokeStyle="darkgreen";
		ctx.fillRect(snakePart.x,snakePart.y,10,10);
		ctx.strokeRect(snakePart.x,snakePart.y,10,10);
			
	}
	drawSnake(snake){
		snake.pos.forEach(this.drawSnakePart);
	}
	drawSomthing(thing){
		console.log("drawSometghing"+thing.type);
	}
	
	draw(thing){
		console.log((thing.type==="snake"));
		if(thing.type==="snake")
		{
			this.drawSnake(thing);
		}
		else{
			this.drawSomthing(thing);
		}
	}
}

class State{
	constructor(level,actors,status){
		this.level=level;
		this.actors=actors;
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
				
		let snakeTest= new Snake([  {x: 150, y: 150},  {x: 140, y: 150},  {x: 130, y: 150},  {x: 120, y: 150},  {x: 110, y: 150},],1);
		let test=new Draw();
		test.draw(snakeTest);
		let move=new Move(snakeTest,this.level.speed);
	}
	static start(level){
		return new State(level,level.startActors,"playing");
	}

	static paused(level){
		return new State(level,level.startActors,"paused");
	}
}
let test1=State.start(new Level());