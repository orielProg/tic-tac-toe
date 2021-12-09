

const checkRows = (array) => {
    if(array[0] !== '' && array[0]===array[1] && array[1]===array[2]){
        return array[0];
    }
    else if(array[3] !== '' && array[3]===array[4] && array[4]===array[5]){
        return array[3];
    }
    else if(array[6] !== '' && array[6]===array[7] && array[7]===array[8]){
        return array[6];
    }
    return '';
}

const checkCols = (array) => {
    if(array[0] !== '' && array[0]===array[3] && array[3]===array[6]){
        return array[0];
    }
    else if(array[1] !== '' && array[1]===array[4] && array[4]===array[7]){
        return array[1];
    }
    else if(array[2] !== '' && array[2]===array[5] && array[5]===array[8]){
        return array[2];
    }
    return '';
}

const checkDiagonal = (array) => {
    if(array[0] !== '' && array[0]===array[4] && array[4]===array[8]){
        return array[0];
    }
    else if(array[2] !== '' && array[2]===array[4] && array[4]===array[6]){
        return array[2];
    }
    return '';
}

export const judge = (state) => {
    const gameBoard = state.gameTable;
    const rowsWinner = checkRows(gameBoard);
    if (rowsWinner) return rowsWinner;
    const colsWinner = checkCols(gameBoard);
    if(colsWinner) return colsWinner;
    const diagonalWinner = checkDiagonal(gameBoard);
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