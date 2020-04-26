var ctx=document.getElementById("game").getContext("2d");
console.log("hello");

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
	constructor(runner){
		
		this.runner=runner;
	}
 move(pos,speed)
	{
		if(this.runner.type=="snake")
		{
			console.log("snake");
		}
		else{
			console.log("something"+(this.runner.type));
		}
	}
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
let snakeTest= new Snake([  {x: 150, y: 150},  {x: 140, y: 150},  {x: 130, y: 150},  {x: 120, y: 150},  {x: 110, y: 150},],1);
let test=new Draw();
test.draw(snakeTest);
