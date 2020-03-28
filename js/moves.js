let selected;
let turn;
let isInCheck;
let checkmate;

/**
 * Registers Move Listeners to monitor user movement.
 * 
 */
function registerMoveListeners() {
    selected = null;
    turn = 'w';
    isInCheck = false;
    checkmate = false;

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

    stopListeningForMovement();
    if (pieceCanMove(space, selected)) {
        const movers = stageMove(space, selected);
        const check = inCheck();
        if (check.areYou) {
            rollbackMove(movers);
            alert(check.message);
        }else {
            commitMove(movers);
        }

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
 * @param {HTMLDivElement} space element the selected piece wants to move to
 * @param {HTMLDivElement} piece piece that wants to move 
 * @return {Boolean} boolean indicating whether or not selected piece can move
 */
function pieceCanMove(space, piece) {
    if (piece == null) return false;
    const pieceType = getPieceType(piece);
    const from = Number(piece.id);
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
 * Stages a move to analyze before committing. Moves staged
 * can be rolled back or committed.
 * 
 * @param {HTMLDivElement} space space to move the piece to
 * @param {HTMLDivElement} piece piece to move to the space
 * @returns {Object} data necessary to rollback or commit the move 
 */
function stageMove(space, piece) {
    const pieceClass = piece.classList[1];
    const spaceClass = space.classList[1];
    const spaceClone = space.cloneNode(true);
    const pieceCopy = piece;

    piece.classList.remove(pieceClass);
    piece.classList.remove('piece-select');
    piece.classList.add('empty');
    space.classList.remove(spaceClass);
    space.classList.add(pieceClass);

    const movers = {
        "space":space,
        "piece":piece,
        "pieceClass":pieceClass,
        "spaceClass":spaceClass,
        "spaceClone":spaceClone,
        "pieceCopy":pieceCopy
    }
    return movers;
}

/**
 * Rollback a staged move. 
 * 
 * @param {Object} movers data returned from stageMove function
 */
function rollbackMove(movers){
    movers.piece = movers.pieceCopy;
    movers.piece.classList.remove('empty');
    movers.piece.classList.add(movers.pieceClass);
    movers.space.classList.remove(movers.pieceClass);
    movers.space.classList.add(movers.spaceClass);
}

/**
 * Commits a staged move.
 * 
 * @param {Object} movers data returned from stageMove function
 */
function commitMove(movers) {
    isInCheck = false;
    if (movers.spaceClass != 'empty') {
        addToBench(movers.spaceClone);
    }
    selected = null;
    alertIfOpponentInCheck();
    turn = opponentColor();
}

/**
 * Removes chess piece class from a square and adds it to the bench. Called
 * when a piece is taken by an opponent. 
 * 
 * @param {HTMLDivElement} piece board square to clear and add piece to bench
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
 * @param {HTMLDivElement} piece square to determine what piece is there
 * @returns {String} name of piece existing at the square
 */
function getPieceType(piece) {
    let pieceType = piece.classList[1];
    return pieceType.substring(0, pieceType.length-2);
}

/**
 * Returns the color of a piece at a specific square. 
 * 
 * @param {HTMLDivElement} piece square to get the color of the piece from
 * @returns {String} 'w' or 'b'
 */
function getColor(piece) {
    const pieceType = piece.classList[1];
    const color = pieceType.substring(pieceType.length-1);
    return color;
}

/**
 * Gets the color of the player who's turn is not now. 
 * 
 * @returns {String} 'b' or 'w'
 */
function opponentColor() {
    if (turn === 'w') return 'b';
    if (turn === 'b') return 'w';
}

/**
 * Gets all spaces on the board.
 * 
 * @returns {HTMLDivElement[]} array of all pieces on the chess board.
 */
function getAllSpaces() {
    return Array.from(document.getElementById('frame')
                                        .querySelectorAll('.row > div'));
}