let selected;
let turn;
let check = false;
let checkmate = false;

/**
 * Registers Move Listeners to monitor user movement.
 * 
 */
function registerMoveListeners() {
    selected = null;
    turn = 'w';

    const squares = getAllSpaces();
    squares.forEach( x => {
        x.addEventListener('click', (event) => spaceListener(x));
    });
}

/**
 * Listener to handle user clicks on chess board squares.
 * 
 * @param {HTMLElement} space element in which to register the listener 
 */
const spaceListener = (space) => {
    if (getColor(space) == turn){
        pieceListener(space);
        return;
    }

    if (pieceCanMove(space)) {
        stopListeningForMovement();
        move(space);
    }
}

/**
 * Called by the spaceListener when a chess piece is found at 
 * the space. Handles piece selection. 
 * 
 * @param {HTMLElement} piece chess piece to select
 */
const pieceListener = (piece) => {
    if (selected != null){
         selected.classList.remove('piece-select');
         selected = null;
         stopListeningForMovement();
      }
        
     if (getColor(piece) === turn){
        selected = piece;
        piece.classList.add('piece-select');
        listenForMovement();
        return;
    } 
}

/**
 * Checks if selected piece can move to a specific space based on chess rules.
 * 
 * @param {HTMLElement} space element the selected piece wants to move to
 * @return {Boolean} boolean indicating whether or not selected piece can move
 */
function pieceCanMove(space) {
    if (selected == null) return false;
    const pieceType = getPieceType(selected);
    const from = Number(selected.id);
    const to = Number(space.id);
    switch (pieceType) {
        case 'pawn': 
            return canPawnMove(from, to);
        case 'rook':
            return canRookMove(from, to);
        case 'knight':
            return canKnightMove(from, to);
        case 'bishop':
            return canBishopMove(from, to);
        case 'queen':
            return canQueenMove(from, to);
        case 'king':
            return canKingMove(from, to);
        default:
            return false;
    }
}

/**
 * Moves the selected element to a specifc space. If Boolean
 * is specified, don't actually move.
 * 
 * @param {HTMLElement} space element to which the selected space is to be moved
 * @param {Boolean} test optional, true if we want to run as a test
 * @returns {Boolean} indicates whether or not the move puts user in check
 */
function move(space, test = false) {
    const pieceClass = selected.classList[1];
    const spaceClass = space.classList[1];
    const spaceClone = space.cloneNode(true);
    const pieceCopy = selected;

    selected.classList.remove(pieceClass);
    selected.classList.remove('piece-select');
    selected.classList.add('empty');
    space.classList.remove(spaceClass);
    space.classList.add(pieceClass);

    const check = willPutYouInCheck(space);
    if (check || test){
        selected = pieceCopy;
        selected.classList.remove('empty');
        selected.classList.add(pieceClass);
        space.classList.remove(pieceClass);
        space.classList.add(spaceClass);
        return check;
    }else {
        if (spaceClass != 'empty') {
            addToBench(spaceClone);
        }
        selected = null;
        turn = opponentColor();
        alertIfOpponentInCheck();
        return false;
    }
}

/**
 * Removes chess piece class from a square and adds it to the bench. Called
 * when a piece is taken by an opponent. 
 * 
 * @param {HTMLElement} piece board square to clear and add piece to bench
 */
function addToBench(piece) {

    const benchedPiece = document.createElement('div');
    const pieceClass = piece.classList[1];
    const bench = (getColor(piece) == 'w' ? 'white' : 'black') + 'bench';

    benchedPiece.classList.add(pieceClass);
    benchedPiece.classList.add('bench-square');
    
    document.getElementById(bench).insertAdjacentElement('beforeend', benchedPiece);
}

/**
 * Adds :hover class to all available squares to indicate to the user 
 * that they might be able to move there. 
 * 
 */
function listenForMovement() {
    const spaces = getAllSpaces();
    spaces.forEach(x => {
        if (x.classList[1] == 'empty'){
            x.classList.add('space-select');
        }
    });
}

/**
 * Removes :hover class to available spaces to indicate to the user they
 * should select a piece first. 
 * 
 */
function stopListeningForMovement() {
    const spaces = getAllSpaces();
    spaces.forEach(x => {
        if (x.classList.contains('space-select')){
            x.classList.remove('space-select');
        }
    });
}

/**
 * Returns the name of a chess piece at a specific square.
 * 
 * @param {HTMLElement} piece square to determine what piece is there
 * @return {String} name of piece existing at the square
 */
function getPieceType(piece) {
    let pieceType = piece.classList[1];
    return pieceType.substring(0, pieceType.length-2);
}

/**
 * Returns the color of a piece at a specific square. 
 * 
 * @param {HTMLElement} piece square to get the color of the piece from
 * @return {String} w or b - color of piece at the square 
 */
function getColor(piece) {
    const pieceType = piece.classList[1];
    const color = pieceType.substring(pieceType.length-1);
    return color;
}

/**
 * Gets the color of the player who's turn is not now. 
 */
function opponentColor() {
    if (turn === 'w') return 'b';
    if (turn === 'b') return 'w';
}

/**
 * Gets all spaces on the board.
 * 
 * @returns {HTMLElement[]} array of all pieces on the chess board.
 */
function getAllSpaces() {
    return Array.from(document.getElementById('frame')
                                        .querySelectorAll('.row > div'));
}