let board = [];
let width = 3, height = 3;
let mines = 4;
for (let i=0;i<width;i++){
	board[i] = []
    for (let j = 0;j<height;j++){
        board[i][j] = 0;
	}
}

setMines(mines);

function setMines(nmines){
	if(nmines !=0){
		let x = Math.floor(Math.random()*width);
		let y = Math.floor(Math.random()*height);
		board[x][y] = 1;
		nmines--;
		setMines(nmines);
	}
}

displayBoard(board);

function displayBoard(board){
	let count = 0;
	for (let i = 0; i<width; i++){
		for (let j = 0; j<height;j++){
		document.write("<input type='button' id='abc' value='  ' onclick='reveal(id)' oncontextmenu='return false;'></input>");
		document.getElementById("abc").value=board[i][j];
		document.getElementById("abc").id= count;
		count++;
		}
		document.write("<br>");
	}
}

function reveal(c){
	let id = c.toString();
	document.getElementById(id).disabled = true;
}