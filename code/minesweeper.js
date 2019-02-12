let board = [];
let width = 3, height = 3;
let mines = 4;
for (let i=0;i<width;i++){
	board[i] = []
    for (let j = 0;j<height;j++){
        board[i][j] = 0;
	}
}

displayBoard(board);

function displayBoard(board){
	let count = 0;
	for (let i = 0; i<width; i++){
		for (let j = 0; j<height;j++){
		document.write("<input type='button' id='abc' value='  ' onclick='reveal(id)' oncontextmenu='flag(id);return false;'></input>");
		document.getElementById("abc").value=board[i][j];
		document.getElementById("abc").id= count;
		count++;
		}
		document.write("<br>");
	}
}
