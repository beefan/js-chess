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
    let pathClear = isEmpty(to);
    if (places == 2) {
        const id = turn == 'w' ? from-8 : from+8;
        pathClear = isEmpty(id);
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
        inForKill = !isEmpty(to) && !inYourOwnWay(to); 
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
    if (canGoVertical) {
        if (to > from){
            for (let i = from+8; i <= to-8; i=i+8){
                canMove = isEmpty(i);
                if (!canMove) break;
            }
        }else {
            for (let i = from-8; i >= to+8; i=i-8){
                canMove = isEmpty(i);
                if (!canMove) break;
            }
        }

    }else if (canGoHorizontal) {
        if (to > from) {
            for (let i = from+1; i <= to-1; i++){
                canMove = isEmpty(i);
                if (!canMove) break;
            }
        }else {
            for (let i = from-1; i >= to+1; i--){
                canMove = isEmpty(i);
                if (!canMove) break;
            }
        }
    }

    return ( (canGoHorizontal || canGoVertical) && canMove && !inYourOwnWay(to));
}

function canKnightMove(from, to) {
    let validMoves = [];
    validMoves.push(from + 16 - 1);
    validMoves.push(from + 16 + 1);
    validMoves.push(from - 16 + 1);
    validMoves.push(from - 16 - 1);
    validMoves.push(from + 8 - 2);
    validMoves.push(from + 8 + 2);
    validMoves.push(from - 8 - 2);
    validMoves.push(from - 8 + 2);

    return (validMoves.includes(to) && !inYourOwnWay(to));
}

function canBishopMove(from, to) {
    let paths = [];
    let path = [];
    for (let i  = from+7; i < 65; i=i+7) {
        path.push(i);
        if (isEdge(i)) break;
    }
    paths.push(path);
    path = [];
    for (let i = from+9; i < 65; i=i+9){
        path.push(i);
        if (isEdge(i)) break;
    }
    paths.push(path);
    path = [];
    for (let i = from-7; i > 0; i=i-7){
        path.push(i);
        if (isEdge(i)) break;
    }
    paths.push(path);
    path = [];
    for (let i = from - 9; i > 0; i=i-9) {
        path.push(i);
        if (isEdge(i)) break;
    }
    paths.push(path);

    let isBlocked = false;
    let validMove = false;
    for (path of paths) {
       if (path.includes(to)) {
           validMove = true;
           for (let i=0; i < path.indexOf(to); i++) {
                if (!isEmpty(path[i])) {
                    isBlocked = true;
                }
           }
           break;
       }
    }

    return validMove && !isBlocked && !inYourOwnWay(to);
}

function canQueenMove(from, to) {
    return canBishopMove(from, to) || canRookMove(from, to);
}

function canKingMove(from, to){
    return true;
}

/*HELPER FUNCTIONS */
/**
 * 
 * @param {*} elemId 
 */
function isEmpty(elemId) {
    return document.getElementById(elemId).classList[1] == 'empty';
}

function inYourOwnWay(elemId) {
    return getColor(document.getElementById(elemId)) == turn;
}

function isEdge(elemId) {
    return (elemId > 64 || elemId < 1 || elemId % 8 == 0 || (elemId-1) % 8 == 0);
}