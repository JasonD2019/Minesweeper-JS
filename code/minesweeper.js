
//remain problem: gameover alert
//cancel flag on right-click
//need a gameover function
//need a gamereset function

class Board{
	constructor (level,h,w,m){
		this.board = [];
		this.nmines_array = [];
		switch(level){
			case "b":
					this.height(3);
					this.width(3);
					this.mines(4);
					this.initboard();
					this.initMines(this.mines);
					break;
			case "e":
					this.height(9);
					this.width(9);
					this.mines(10);
					this.initboard();
					this.initMines(this.mines);
					break;
			case "":
					this.height(h);
					this.width(w);
					this.mines(m);
					this.initboard();
					this.initMines(this.mines);
					break;
			default:
					this.height(5);
					this.width(5);
					this.mines(6);
					this.initboard();
					this.initMines(this.mines);
					break;
		}
	}
	mines(n){
		this.mines = n;
	}
	height(h){
		this.height = h;
	}
	width(w){
		this.width =w;
	}
	initboard(){
		for (let i=0;i<this.width;i++){
			this.board[i] = [];
			this.nmines_array[i] = [];
			for (let j = 0;j<this.height;j++){
				this.board[i][j] = 0;
				this.nmines_array[i][j]=0;
			}
		}
	}
	initMines(nmines){
		if(nmines !=0){
			let x = Math.floor(Math.random()*this.width);
			let y = Math.floor(Math.random()*this.height);
			if(!(this.board[x][y]==1)){
				this.board[x][y] = 1;
				nmines--;
			}
			this.initMines(nmines);
		}
	}
	displayBoard(){
		console.table(this.board);
		for (let i = 0; i<this.width; i++){
			for (let j = 0; j<this.height;j++){
			this.nmines_array[i][j] = this.countMines(i,j);
			}
		}
		console.table(this.nmines_array);
	}
	countMines(x,y){
	let nx,ny;
	let nmines=0;
	if(this.board[x][y]==0){
		for(let i=-1;i<=1;i++){
			for(let j=-1;j<=1;j++){
				nx = x + i;
				ny = y +j;
				if(!(i == 0 && j == 0)){
					if(nx >= 0 && nx <this.width && ny >= 0 && ny < this.height)
						if(this.board[nx][ny]==1)
						nmines++;
				}
			}
		}
	}
	if(this.board[x][y] == 1){
		return(9);
	}
	else{
		return(nmines);
	}
	}
}
	var height;
	var wide;
	var minenumber;
	height = prompt("Enter a height");
	wide=prompt("Enter a wide");
    minenumber=prompt("Enter number of mines");
	let gameBoard = new Board("",height,wide,minenumber);
	gameBoard.displayBoard();
	console.log(gameBoard.mines);


class UIclass{
	constructor(){
		
	}

}

class Graphics{
	constructor(){
		this.comp = [];
		this.canvas = document.createElement("canvas");
		this.canvas.width = gameBoard.width*50;
		this.canvas.height = gameBoard.height*50;
		this.canvas.style = "border: 1px solid #d3d3d3";
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.draw();		
		}
	component(x,y,t=""){
		this.width = 50;
		this.height = 50;
		this.x = x;
		this.y =y;
		this.context.strokeRect(this.x, this.y, this.width, this.height);
		this.context.fillText(t,x+25,y+25);
	}
	draw(){
		for(let i =0; i<gameBoard.width;i++){
			this.comp[i] = [];
			for(let j =0; j<gameBoard.height;j++){
				this.comp[i][j] = this.component(i*50,j*50);
			}
		}
	}
}

let gfx = new Graphics();

gfx.canvas.addEventListener('click',clickHandler);
gfx.canvas.addEventListener('contextmenu',clickHandler);

function clickHandler(e){
	e.preventDefault();
	let tc ="";
	let clickX = e.pageX - gfx.canvas.offsetLeft;
	let clickY = e.pageY - gfx.canvas.offsetTop;
	let x = Math.floor(clickX/50);
	let y = Math.floor(clickY/50);
	let rightClick = false;
	if(e.which){
		rightClick = (e.which === 3);
	}
	if(!rightClick){
		if((gameBoard.nmines_array[y][x]>0)&&(gameBoard.nmines_array[y][x]<9)){
			tc =  "" + gameBoard.nmines_array[y][x];
			gfx.component(x*50,y*50,"");
			gfx.component(x*50,y*50,tc);
			gameBoard.nmines_array[y][x] = gameBoard.nmines_array[y][x]+10;
		}
		if(gameBoard.nmines_array[y][x]==0){
			WhenChick_0(y,x);
		}
		if(gameBoard.nmines_array[y][x]==9){
			alert("Game Over!");
			//need to restart the game 
			let choice=prompt("Do you want to play again? y/n")
			if(choice =="y" || "Y")
			{history.go(0);}//reload the webpage to reset game
			if(choice =="n" || "N")//if choice n quit game
			{
				window.close();
			}
		}
		if (CheckWin()==true){
			alert("You are win!");
			//need to restart the game 
			let choice=prompt("Do you want to play again? y/n")
			if(choice =="y" || "Y")
			{history.go(0);}//reload the webpage to reset game
			if(choice =="n" || "N")//if choice n quit game
			{
				window.close();
			}
		}
	}
	else{
		tc = "F";
		if(gameBoard.nmines_array[y][x]<20)
		{
			gameBoard.nmines_array[y][x] += 20;
			gfx.component(x*50,y*50,tc);
		}
		else{
			gameBoard.nmines_array[y][x] -= 20;
			// clean the spot
		}
	}
}

function WhenChick_0(y,x){
	if(gameBoard.nmines_array[y][x]==0){
		tc =  "" + gameBoard.nmines_array[y][x];
		gfx.component(x*50,y*50,"");
		gfx.component(x*50,y*50,tc);
		gameBoard.nmines_array[y][x] = gameBoard.nmines_array[y][x]+10;
		for (let i =y-1; i <= y+1; i++){
			for (let j = x-1; j <= x+1; j++){
				if (i>=0&&i<9&&j>=0&&j<9){				
					WhenChick_0(i,j);
				}
			}
		}
	}
	else if(gameBoard.nmines_array[y][x]<=8){
		tc =  "" + gameBoard.nmines_array[y][x];
		gfx.component(x*50,y*50,"");
		gfx.component(x*50,y*50,tc);
		gameBoard.nmines_array[y][x] = gameBoard.nmines_array[y][x]+10;
	}
}

function CheckWin(){
	over = true;
	for (let i = 0; i < gameBoard.width; i++){
		for (let j = 0; j < gameBoard.height; j++){
			if (gameBoard.nmines_array[i][j] < 9){				
				over = false;
			}
		}
	}
	return over;
}