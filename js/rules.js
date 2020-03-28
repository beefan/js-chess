/**
 * Checks if Pawn can move. 
 * 
 * @param {Number} from ID of space to move from
 * @param {Number} to ID of space to move to
 * @returns {Boolean} true if Pawn can move, otherwise false
 */
function canPawnMove(from, to){
    let places = 1;
    const whitePawnStarts = [49, 50, 51, 52, 53, 54, 55, 56];
    const blackPawnStarts = [9, 10, 11, 12, 13, 14, 15, 16];
    const diff = turn == 'w' ? (from-to) : (to-from);

    if ( (whitePawnStarts.includes(from) && turn == 'w') || 
        (blackPawnStarts.includes(from) && turn == 'b') ) {
        places++;
    }

    let pathClear = isEmpty(to);
    if (places == 2) {
        const id = turn == 'w' ? from-8 : from+8;
        pathClear = isEmpty(id) && pathClear;
    }

    let moveValid = false;
    if (places == 1) {
        moveValid = diff == 8;
    }else if (places == 2) {
        moveValid = (diff == 8 || diff == 16);
    }

    let inForKill = false;
    if (diff == 7 || diff == 9) {
        inForKill = !isEmpty(to) && !inYourOwnWay(to); 
    }

    return (inForKill || (pathClear && moveValid)); 
}

/**
 * Checks if Rook can move. 
 * 
 * @param {Number} from ID of space to move from
 * @param {Number} to ID of space to move to
 * @returns {Boolean} true if Rook can move, otherwise false
 */
function canRookMove(from, to){
    const canGoVertical = (from-to) % 8 == 0;
    const piece = document.getElementById(from);
    const rowStart = piece.parentElement.firstChild.id;
    const rowEnd = piece.parentElement.lastChild.id;
    const canGoHorizontal = (to >= rowStart && to <= rowEnd);

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

/**
 * Checks if Knight can move. 
 * 
 * @param {Number} from ID of space to move from
 * @param {Number} to ID of space to move to
 * @returns {Boolean} true if Knight can move, otherwise false
 */
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

/**
 * Checks if Bishop can move. 
 * 
 * @param {Number} from ID of space to move from
 * @param {Number} to ID of space to move to
 * @returns {Boolean} true if Bishop can move, otherwise false
 */
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

/**
 * Checks if Queen can move. 
 * 
 * @param {Number} from ID of space to move from
 * @param {Number} to ID of space to move to
 * @returns {Boolean} true if Queen can move, otherwise false
 */
function canQueenMove(from, to) {
    return canBishopMove(from, to) || canRookMove(from, to);
}

/**
 * Checks if the King can move. 
 * 
 * @param {Number} from ID of space to move from
 * @param {Number} to ID of space to move to
 * @returns {Boolean} true if King can move, otherwise false
 */
function canKingMove(from, to){
    let validMoves = [];
    validMoves.push(from - 1);
    validMoves.push(from + 1);
    for (let i=7; i < 10; i++){
        validMoves.push(from + i);
        validMoves.push(from - i);
    }
    
    return (validMoves.includes(to) || canCastle(from, to)) && !inYourOwnWay(to);
}

/*HELPER FUNCTIONS */

/**
 * Checks if a space is empty. 
 * 
 * @param {Number} elemId ID of chess board square
 * @returns {Boolean} true if space is empty, false if not 
 */
function isEmpty(elemId) {
    return document.getElementById(elemId).classList[1] == 'empty';
}

/**
 * Checks if user is in their own way or if they are clear to move. 
 * 
 * @param {Number} elemId ID of chess board square
 * @returns {Boolean} true if users pieces are in the way, false if target space is clear
 */
function inYourOwnWay(elemId) {
    return getColor(document.getElementById(elemId)) == turn;
}

/**
 * Checks if a particular square is an edge or off the board.
 * 
 * @param {Number} elemId ID of chess board square
 * @returns {Boolean} true if edge, false if not
 */
function isEdge(elemId) {
    return (elemId > 64 || elemId < 1 || elemId % 8 == 0 || (elemId-1) % 8 == 0);
}

/**
 * Determines if a castling can and should take place. Handles
 * the work if possible. 
 * 
 * @param {Number} from ID of space to move king from
 * @param {Number} to ID of space to move king to
 * @return {Boolean} always returns false bc if castling is possible, 
 *                   the moveRookForCastle function will handle it.
 */
function canCastle(from, to) {
    if (Math.abs(from-to) != 2){
        return false;
    }
    if ( (turn == 'w' && from == 61) || (turn == 'b' && from == 5) ) {
        if (to - from == -2) {
            const rook = document.getElementById(from - 4);
            if (isEmpty(from - 1) && isEmpty(to) && isEmpty(from - 3) && getPieceType(rook) == 'rook'){
                moveRookForCastle(rook, from - 1, from, to);
            }
        }else if (to - from == 2) {
            const rook = document.getElementById(from + 3);
            if (isEmpty(from + 1) && isEmpty(to) && getPieceType(rook) == 'rook') {
                moveRookForCastle(rook, from + 1, from, to);
            }
        }
    } 
    return false;
}

/**
 * Performs castling if possible. Ensures user is not in check
 * and will not be putting themselves in check by castling. 
 * 
 * @param {HTMLElement} rook element with a rook
 * @param {Number} rookTo ID of square to move rook to
 * @param {Number} kingId ID of square with king
 * @param {Number} kingTo ID of square to move king to
 */
function moveRookForCastle(rook, rookTo, kingId, kingTo) {
    if (isInCheck) {
        alert("You can't castle out of check");
        return;
    }
    const rSpace = document.getElementById(rookTo);
    const kSpace = document.getElementById(kingTo);
    const king = document.getElementById(kingId);
    const rookMovers = stageMove(rSpace, rook);
    const kingMovers = stageMove(kSpace, king);
  
    if (!inCheck().areYou) {
        commitMove(rookMovers);
        commitMove(kingMovers);
        turn = opponentColor();

    }else {
        alert("Castling now will put you in check.");
        rollbackMove(rookMovers);
        rollbackMove(kingMovers);
        isInCheck = false;
    }
}

/**
 * Checks to see if the staged move will put the user in Check. 
 * 
 * @returns {Object} object with two properties, boolean indicating
 *                   if in check. Message to alert user if so.
 */
function inCheck() {
    let inCheck = false;
    let msg = "";
    const allSquares = getAllSpaces();
    const opponentPieces = allSquares.filter( x => getColor(x) == opponentColor());
    let yourKing = allSquares.filter(x => getColor(x) == turn && getPieceType(x) == 'king')[0];

    turn = opponentColor();
    for (p of opponentPieces) {
        if (pieceCanMove(yourKing, p)){
            if (checkmate) {
                msg = "Game's over, pal. Hit reset to play again.";
            }else if (isInCheck) {
                msg = "You can't move there. \nYou're in check!";
            }else {
                msg = "You can't move there! It'll put you in check!";
            }
            inCheck = true;
            isInCheck = true;
            break;
        }
    }
    turn = opponentColor();
    
    return {"areYou":inCheck, "message":msg};
}

/**
 * Alerts the users of the game if the move made puts the 
 * opponent in check. Alerts also, if opponent is in checkmate. 
 * 
 */
function alertIfOpponentInCheck() {
    const allSquares = getAllSpaces();
    const yourPieces = allSquares.filter( x => getColor(x) == turn);
    const opponentKing = allSquares.filter(x => getColor(x) == opponentColor() && getPieceType(x) == 'king')[0];

    for (piece of yourPieces) {
        if (pieceCanMove(opponentKing, piece)) {
            if (isCheckMate()) {
                const winner = turn == 'w' ? 'white' : 'black';
                alert(`Checkmate! The winner is ${winner}. \nHit Reset Game to play again.`);
                checkmate = true;
            }else{
                alert('Check!');
                isInCheck = true;
            }
        }
    }
}

/**
 * Checks if a there is a checkmate. 
 * 
 * @returns {Boolean} true if checkmate, false otherwise
 */
function isCheckMate() {
    isInCheck = false;
    const spaces = getAllSpaces();
    const pieces = spaces.filter( x => getColor(x) == opponentColor());
    const potentialMoves = spaces.filter( x => getColor(x) != opponentColor());
    let outcomes = [];

    turn = opponentColor();
    for (moove of potentialMoves) {
        for (piece of pieces) {
            if (getPieceType(piece) == 'king' && Math.abs(piece.id - moove.id) == 2) {
                continue;
            }
            if (pieceCanMove(moove, piece)) {
                const movers = stageMove(moove, piece);
                outcomes.push(inCheck().areYou);
                rollbackMove(movers);
            }
        }
    }
    turn = opponentColor();
    outcomes = outcomes.filter( x => !x);
    isInCheck = true;
    return  outcomes.length == 0;
}