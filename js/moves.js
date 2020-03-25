let selected;
let turn;

function registerMoveListeners() {
    selected = null;
    turn = 'w';

    const squares = getAllSpaces();
    squares.forEach( x => {
        x.addEventListener('click', (event) => spaceListener(x));
    });
}

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

function pieceCanMove(space) {
    if (selected == null) return false;
    const pieceType = getPieceType(selected);
    const from = selected.id;
    const to = space.id;
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

function move(space) {
    pieceName = selected.classList[1];
    targetClass = space.classList[1];

    selected.classList.remove(pieceName);
    selected.classList.remove('piece-select');
    selected.classList.add('empty');

    if (targetClass != 'empty') {
        addToBench(space);
    }

    space.classList.remove(targetClass);
    space.classList.add(pieceName);

    selected = null;
    turn = opponentColor();
}

function addToBench(piece) {

    const benchedPiece = document.createElement('div');
    const pieceClass = piece.classList[1];
    const bench = (getColor(piece) == 'w' ? 'white' : 'black') + 'bench';

    benchedPiece.classList.add(pieceClass);
    benchedPiece.classList.add('bench-square');
    
    document.getElementById(bench).insertAdjacentElement('beforeend', benchedPiece);
}

function listenForMovement() {
    const spaces = getAllSpaces();
    spaces.forEach(x => {
        if (x.classList[1] == 'empty'){
            x.classList.add('space-select');
        }
    });
}

function stopListeningForMovement() {
    const spaces = getAllSpaces();
    spaces.forEach(x => {
        if (x.classList.contains('space-select')){
            x.classList.remove('space-select');
        }
    });
}

function getPieceType(piece) {
    let pieceType = piece.classList[1];
    return pieceType.substring(0, pieceType.length-2);
}

function getColor(piece) {
    const pieceType = piece.classList[1];
    const color = pieceType.substring(pieceType.length-1);
    return color;
}

function opponentColor() {
    if (turn === 'w') return 'b';
    if (turn === 'b') return 'w';
}

function getAllSpaces() {
    return Array.from(document.getElementById('frame')
                                        .querySelectorAll('.row > div'));
}