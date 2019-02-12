let board = [];
let width = 9, height = 9;
let mines = 10;
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

function countMines(c){
	let id = c.toString();
	let count = 0;
	for (let i =0; i<width; i++){
		for (let j = 0; j<height; j++){
			let nmines = 0;
			if(count == c){
				if(board[i][j]==0){
					if((i+1)<width){
						if(board[i+1][j] == 1)
							nmines++;
						if((j+1)<height)
							if(board[i+1][j+1] == 1)
								nmines++;
						if((j-1) >= 0)
							if(board[i+1][j-1] == 1)
								nmines++;
					}
					if((i-1)>=0)
						if(board[i-1][j] == 1)
							nmines++;
					if((j+1)<height)
						if(board[i][j+1] == 1)
							nmines++;
					if((j-1)>=0)
						if(board[i][j-1] == 1)
							nmines++;
					if((i-1) >=0 && (j-1) >=0)
						if(board[i-1][j-1] == 1)
							nmines++;
					if((i-1) >=0 && (j+1) <height)
						if(board[i-1][j+1] == 1)
							nmines++;
				}
			if(board[i][j] == 1){
				document.getElementById(id).value = 'B';
			}
			else{
				if(nmines !=0)
					document.getElementById(id).value = nmines;
				else
					document.getElementById(id).value = '  ';
			}
			}
			count++;
		}
	}
}

function reveal(c){
	let id = c.toString();
	countMines(c);
	document.getElementById(id).disabled = true;
}