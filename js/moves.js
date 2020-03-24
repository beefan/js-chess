let selected;
let turn;

function registerMoveListeners() {
    selected = null;
    turn = 'w';
    setListeners();
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
    } else {
        spaceListener(piece);
        return;
    }
}

function setListeners() {
    const squares = getAllSpaces();
    squares.forEach( x => {
        const piece = x.classList[1];
        let listener;
        if (piece != 'empty'){
            listener = pieceListener;
        } else {
            listener = spaceListener;
        }

        x.addEventListener('click', (event) => listener(x));
    });
}

function pieceCanMove(space) {
    if (selected == null) return false;
    pieceType = getPieceType(selected);
    currentSpace = selected.id;
    spaceToMove = space.id;

    //implement piece moving logic here
    return true;
}

function move(space) {
    pieceName = selected.classList[1];
    targetClass = space.classList[1];

    selected.classList.remove(pieceName);
    selected.classList.remove('piece-select');
    selected.classList.add('empty');

    space.classList.remove(targetClass);
    space.classList.add(pieceName);

    selected = null;
    turn = opponentColor();
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
    pieceType = piece.classList[1];
    pieceType = pieceType.substring(0, pieceType.length-2);
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