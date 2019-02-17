// Implement a checkComplete function in class UI
// Implement correct/incorrect mine flagged functionality
// Implement Number of mines remaining.
// Improve the graphics a bit.



// This is a class for board, the game board is initiallized here with the given width, height,
// and number of mines
class Board{
	//default constructor of the board class.
	constructor (level,h,w,m){		
		this.board = [];			// Initiallizing the board array;
		this.nmines_array = [];		// Initiallizing the number of mines surrounding array.
		// Switches between the size of boards;
		switch(level){
			case "b":
					this.height(3);
					this.width(3);
					this.mines(4);
					this.initboard();
					this.initMines(this.nmines);
					this.initNmines();
					break;
			case "e":
					this.height(9);
					this.width(9);
					this.mines(10);
					this.initboard();
					this.initMines(this.nmines);
					this.initNmines();
					break;
			case "":
					this.height(h);
					this.width(w);
					this.mines(m);
					this.initboard();
					this.initMines(this.nmines);
					this.initNmines();
					break;
			default:
					this.height(5);
					this.width(5);
					this.mines(6);
					this.initboard();
					this.initMines(this.nmines);
					this.initNmines();
					break;
		}
	}
	// sets the number of mines.
	mines(n){
		this.nmines = n;
	}
	//sets the height of the board;
	height(h){
		this.height = h;
	}
	// sets the width of the board;
	width(w){
		this.width =w;
	}
	//Initiallizes the baord array and nmines array with default values, no mines all 0's.
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
	//Sets the given number of mines in the board, i.e. initiallize the board array with 1;
	initMines(nmines){
		if(nmines !=0){		// Break condition, breaks when there are no remaining mines to set.
			let x = Math.floor(Math.random()*this.width); //Get a random x coordinate, multiplying width/height with a random [0,1], and then floor gives us an index in range.
			let y = Math.floor(Math.random()*this.height);
			if(!(this.board[x][y]==1)){		//Checking that we are not placing a mine where one already exists.
				this.board[x][y] = 1;
				nmines--;
			}
			this.initMines(nmines); 	// Recursive call to initiallize all the mines.
		}
	}

	//Initiallizes the number of mines arround array with what countMines(x,y) returns and returns a number for nmines_array.
	initNmines(){
		for (let i = 0; i<this.width; i++){
			for (let j = 0; j<this.height;j++){
			this.nmines_array[i][j] = this.countMines(i,j);
			}
		}
	}

	// Counts the number of mines surrounding the tile.
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

// Initiallizing a Board Object, with parameters from the prompt.
let h = prompt("Enter height");
let w = prompt("Enter width");
let nm = prompt("Enter number of mines");
let gameBoard;
if(h>1 && w>1){
if(nm<h*w && nm>0){
gameBoard = new Board("",h,w,nm);
}
else{
	if(nm>=h*w)
	alert("Too many mines. Ouch!");
	else
	alert("Number of mines cant be zero!");
	RestartGame();
}
}
else{
	alert("Height or Width cant be less than 2");
	RestartGame();
}

console.table(gameBoard.nmines_array);
console.log(gameBoard.nmines);


class UI{
	constructor(){
		this.revealed = [];
		this.n_array = [];
		this.init();
	}
	init(){
		for(let i=0;i<gameBoard.width;i++){
			this.revealed [i] = [];
			this.n_array [i] = [];
			for(let j =0; j<gameBoard.height; j++){
				this.revealed[i][j]=false;
				this.n_array[i][j] = gameBoard.nmines_array[i][j];
			}
		}
	}
	clickCheck(x,y){
		let tc = "";
		this.revealed[x][y] = true;
		gfx.context.strokeStyle = 'rgba(0,255,0,0.6)';
		gfx.context.shadowColor = "green";
		if(this.n_array[x][y]==0){
			//tc =  "" + this.n_array[x][y];
			gfx.component(x*50,y*50);
			this.n_array[x][y] = this.n_array[x][y]+10;
			for (let i =x-1; i <= x+1; i++){
				for (let j = y-1; j <= y+1; j++){
					if (i>=0&&i<gameBoard.width&&j>=0&&j<gameBoard.height){	
						//if(!(i==0 && j ==0))			
							this.clickCheck(i,j);
					}
				}
			}
		}
		else if(this.n_array[x][y]<=8){
			tc =  "" + this.n_array[x][y];
			gfx.component(x*50,y*50,tc);
			this.n_array[x][y] = this.n_array[x][y]+10;
		}
	}
	
	CheckWin(){
		let over = true;
		for (let i = 0; i < gameBoard.width; i++){
			for (let j = 0; j < gameBoard.height; j++){
				if (this.n_array[i][j] < 9){				
					over = false;
				}
			}
		}
		return over;
	}
	checkComplete(){
		let over = false;
		let n_mine_flag = 0;
		for (let i = 0; i < gameBoard.width; i++){
			for (let j = 0; j < gameBoard.height; j++){
				if (this.n_array[i][j] == 29){
					n_mine_flag++;
				}
				if (this.n_array[i][j] >= 20 && this.n_array[i][j] < 29){
					return over;
				}
			}
		}
		if (n_mine_flag == gameBoard.nmines)
		{
			over = true;
			return over;
		}
	}
}

class Graphics{
	constructor(){
		this.comp = [];
		this.canvas = document.createElement("canvas");
		this.canvas.width = gameBoard.width*50;
		this.canvas.height = gameBoard.height*50;
		//this.canvas.style = "border: 1px solid #d3d3d3";
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.nflags = gameBoard.nmines;
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
		this.context.strokeStyle = 'rgba(0,0,0,0.2)';
		this.context.shadowColor = 'rgba(0,0,0,0.2)';
		for(let i =0; i<gameBoard.width;i++){
			this.comp[i] = [];
			for(let j =0; j<gameBoard.height;j++){
				this.comp[i][j] = this.component(i*50,j*50);
			}
		}
	}
}

let ui = new UI();
let gfx = new Graphics();
document.getElementById("flags").innerHTML = "Flags: " + gfx.nflags;

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
	if(!ui.revealed[x][y])
	if(!rightClick){
		ui.revealed[x][y] = true;
		gfx.context.strokeStyle = 'rgba(0,255,0,0.6)';
		gfx.context.shadowColor = 'rgba(0,255,0,0.6)';
		if((ui.n_array[x][y]>0)&&(ui.n_array[x][y]<9)){
			tc =  "" + ui.n_array[x][y];
			gfx.component(x*50,y*50,tc);
			ui.n_array[x][y] = ui.n_array[x][y]+10;
		}
		if(ui.n_array[x][y]==0){
			ui.clickCheck(x,y);
		}
		if(ui.n_array[x][y]==9){
			alert("Game Over!");
		}
		// if (ui.CheckWin()){
		// 	alert("You won!");
		// }
	}
	else{
		tc = "F";
		gfx.context.strokeStyle = 'rgba(255,0,0,1)';
		gfx.context.shadowColor = 'rgba(255,0,0,1)';
		if(ui.n_array[x][y]<20)
		{
			ui.n_array[x][y] += 20;
			gfx.nflags--;
			gfx.component(x*50,y*50,tc);
		}
		else{
			ui.n_array[x][y] -= 20;
			gfx.nflags++;
			gfx.context.clearRect(x*50,y*50,50,50);
			gfx.component(x*50,y*50);
			// clean the spot
		}
		document.getElementById("flags").innerHTML = "Flags: " + gfx.nflags;
	}
	if (ui.checkComplete()){
		alert("You won!");
	}

}
function RestartGame(){
	history.go(0);
}
function quitgame(){
	window.close();
}