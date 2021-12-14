const checkRows = (array, winMarks) => {
    if(array[0] !== '' && array[0]===array[1] && array[1]===array[2]){
        winMarks.push(0,1,2);
        return array[0];
    }
    else if(array[3] !== '' && array[3]===array[4] && array[4]===array[5]){
        winMarks.push(3,4,5);
        return array[3];
    }
    else if(array[6] !== '' && array[6]===array[7] && array[7]===array[8]){
        winMarks.push(6,7,8);
        return array[6];
    }
    return '';
}

const checkCols = (array,winMarks) => {
    if(array[0] !== '' && array[0]===array[3] && array[3]===array[6]){
        winMarks.push(0,3,6);
        return array[0];
    }
    else if(array[1] !== '' && array[1]===array[4] && array[4]===array[7]){
        winMarks.push(1,4,7);
        return array[1];
    }
    else if(array[2] !== '' && array[2]===array[5] && array[5]===array[8]){
        winMarks.push(2,5,8);
        return array[2];
    }
    return '';
}

const checkDiagonal = (array,winMarks) => {
    if(array[0] !== '' && array[0]===array[4] && array[4]===array[8]){
        winMarks.push(0,4,8);
        return array[0];
    }
    else if(array[2] !== '' && array[2]===array[4] && array[4]===array[6]){
        winMarks.push(3,4,6);
        return array[2];
    }
    return '';
}

export const judge = (state) => {
    const gameBoard = state.gameTable;
    const winMarks = state.winMarks;
    const rowsWinner = checkRows(gameBoard,winMarks);
    if (rowsWinner) return rowsWinner;
    const colsWinner = checkCols(gameBoard,winMarks);
    if(colsWinner) return colsWinner;
    const diagonalWinner = checkDiagonal(gameBoard,winMarks);
    if(diagonalWinner) return diagonalWinner;
    return '';
}

const getRandomIndex = (gameBoard) => {
    const emptySpaces = [];
    for(let i=0;i<gameBoard.length;i++){
        if(gameBoard[i]===''){
            emptySpaces.push(i);
        }
    }
    return emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
}


export const computerMove = (gameBoard) => {
    return getRandomIndex(gameBoard);
}

export const isTie = (gameBoard) => {
    for(let i=0;i<gameBoard.length;i++){
        if(gameBoard[i]===''){
            return false;
        }
    }
    return true;
}