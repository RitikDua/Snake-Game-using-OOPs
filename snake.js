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
			console.log("something"+(this.runner.type);
		}
	}
}

let x=new Snake(1,1);
let m=new Move(x);//.move();
m.move(1,1);