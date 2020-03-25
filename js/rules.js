function canPawnMove(from, to){
    let places = 1;
    const whitePawnStarts = [49, 50, 51, 52, 53, 54, 55, 56];
    const blackPawnStarts = [9, 10, 11, 12, 13, 14, 15, 16];
    const diff = turn == 'w' ? (from-to) : (to-from);

    //if we are at the start, we can move two places
    if ( (whitePawnStarts.includes(Number(from)) && turn == 'w') || 
        (blackPawnStarts.includes(Number(from)) && turn == 'b') ) {
        places++;
    }

    //we cannot move through other pieces.
    let pathClear = false;

    const spaceToMove = document.getElementById(to).classList[1];
    pathClear = spaceToMove == 'empty';

    if (places == 2) {
        const id = turn == 'w' ? Number(from)-8 : Number(from)+8;
        const spaceToMoveThrough = document.getElementById(id).classList[1];
        pathClear = spaceToMoveThrough == 'empty';
    }

    //we can only move forward. Two OR One at start, otherwise One.
    let moveValid = false;

    if (places == 1) {
        moveValid = diff == 8;
    }else if (places == 2) {
        moveValid = (diff == 8 || diff == 16);
    }

    //if there is a piece diagnol to us, we can move there.
    let inForKill = false;

    if (diff == 7 || diff == 9) {
        const pieceColor = spaceToMove.substring(spaceToMove.length-2);
        inForKill = (spaceToMove != 'empty' && pieceColor != turn);
    }

    return (inForKill || (pathClear && moveValid));
}

function canRookMove(from, to){
    return true;
}

function canKnightMove(from, to) {
    return true;
}

function canBishopMove(from, to) {
    return true;
}

function canQueenMove(from, to) {
    return true;
}

function canKingMove(from, to){
    return true;
}

function isBackwards(from, to) {
    if (turn == 'w' && to < from) return true;
    if (turn == 'b' && to > from) return true;
    return false;
}