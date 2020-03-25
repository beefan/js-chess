function canPawnMove(from, to){
    let places = 1;
    const whitePawnStarts = [49, 50, 51, 52, 53, 54, 55, 56];
    const blackPawnStarts = [9, 10, 11, 12, 13, 14, 15, 16];
    const diff = turn == 'w' ? (from-to) : (to-from);

    //if we are at the start, we can move two places
    if ( (whitePawnStarts.includes(from) && turn == 'w') || 
        (blackPawnStarts.includes(from) && turn == 'b') ) {
        places++;
    }

    //we cannot move through other pieces.
    let pathClear = false;

    const spaceToMove = document.getElementById(to).classList[1];
    pathClear = spaceToMove == 'empty';

    if (places == 2) {
        const id = turn == 'w' ? from-8 : from+8;
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
    //can move forward/backwards in multiples of 8
    const canGoVertical = (from-to) % 8 == 0;

    //can move sideways until it hits an edge
    const rowStart = selected.parentElement.firstChild.id;
    const rowEnd = selected.parentElement.lastChild.id;
    const canGoHorizontal = (to >= rowStart && to <= rowEnd);
    
    //cannot move through pieces
    //don't check the to square here
    let canMove = true;
    const ensureEmptiness = (elemId) => {
        if (document.getElementById(elemId).classList[1] != 'empty'){
            canMove = false;
        }
    }

    if (canGoVertical) {
        if (to > from){
            for (let i = from+8; i <= to-8; i=i+8){
                ensureEmptiness(i);
                if (!canMove) break;
            }
        }else {
            for (let i = from-8; i >= to+8; i=i-8){
                ensureEmptiness(i);
                if (!canMove) break;
            }
        }

    }else if (canGoHorizontal) {
        if (to > from) {
            for (let i = from+1; i <= to-1; i++){
                ensureEmptiness(i);
                if (!canMove) break;
            }
        }else {
            for (let i = from-1; i >= to+1; i--){
                ensureEmptiness(i);
                if (!canMove) break;
            }
        }
    }

    //if the destination is one of our pieces, we can't move there!
    if (getColor(document.getElementById(to)) == turn){
        canMove = false;
    }

    return ( (canGoHorizontal || canGoVertical) && canMove );
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