class Board{
	//test file
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
			//console.log("");
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
		return("B");
	}
	else{
		return(nmines);
	}
	}
}

let gameBoard = new Board("",9,9,20);
gameBoard.displayBoard();
console.log(gameBoard.mines);

/*let board = [];
let rcount=0;
let width = 9, height = 9;
let mines = 10;
for (let i=0;i<width;i++){
	board[i] = [];
    for (let j = 0;j<height;j++){
        board[i][j] = 0;
	}
}

setMines(mines);

function setMines(nmines){
	if(nmines !=0){
		let x = Math.floor(Math.random()*width);
		let y = Math.floor(Math.random()*height);
		if(!(board[x][y]==1)){
			board[x][y] = 1;
			nmines--;
		}
		setMines(nmines);
	}
}

displayBoard(board);

function displayBoard(board){
	for (let i = 0; i<width; i++){
		for (let j = 0; j<height;j++){
		document.write("<input type='button' id='abc' value='  ' onclick='reveal(id)' oncontextmenu='flag(id); return false;'></input>");
		document.getElementById("abc").value=board[i][j];
		document.getElementById("abc").id= "" + i + j;
		}
		document.write("<br>");
	}
}

function countMines(x,y,c){
	let nx,ny;
	let nmines=0;
	if(board[x][y]==0){
		for(let i=-1;i<=1;i++){
			for(let j=-1;j<=1;j++){
				nx = x + i;
				ny = y +j;
				if(!(i == 0 && j == 0)){
					if(nx >= 0 && nx <width && ny >= 0 && ny < height)
						if(board[nx][ny]==1)
						nmines++;
				}
			}
		}
	}
	if(board[x][y] == 1){
		document.getElementById(c).value = 'B';
	}
	else{
		if(nmines !=0){
			document.getElementById(c).value = nmines;
		}
		else{
			document.getElementById(c).value = '  ';
		}
	}
}

function flag(c){
	switch(document.getElementById(c).value){
		case 'F': 
					document.getElementById(c).value = '?';
					break;
		case '?': 
					document.getElementById(c).value = '  ';
					break;
		default:
					document.getElementById(c).value = 'F';
					break;
	}
}

function reveal(c){
	if(rcount>=8){
		rcount = 0;
		return;
	}
	rcount++;
	let x = c[0];
	let y = c[1];
	let ix = parseInt(x,10);
	let iy = parseInt(y,10);
	countMines(ix,iy,c);
	document.getElementById(c).disabled = true;
	if(board[ix][iy] == 0){
		let nx=0;
		let ny=0;
		let tc;
		for (let i = -1; i<=1;i++){
			for (let j = -1; j<=1; j++){
				nx = ix + i;
				ny = iy +j;
				if(!(i == 0 && j == 0)){
					if(nx >= 0 && nx <width && ny >= 0 && ny < height){
						tc = "" + nx + ny;
						if(board[nx][ny]==0 && !document.getElementById(tc).disabled){
							reveal(tc);
							return;
						}
						//else
							//rcount++;
					}
				}
			}
		}
	}
}
*/
