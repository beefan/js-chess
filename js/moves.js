let selected;
let turn;

function registerMoveListeners() {
    selected = null;
    turn = 'w';
    setListeners();
}

const spaceListener = (space) => {
    if (space.classList[1] != 'empty'){
        pieceListener(space);
        return;
    }

    if (pieceCanMove(space)) {
        stopListeningForMovement();

        pieceName = selected.classList[1];
        selected.classList.remove(pieceName);
        selected.classList.remove('piece-select');
        selected.classList.add('empty');

        space.classList.remove('empty');
        space.classList.add(pieceName);

        selected = null;
    }
}

const pieceListener = (piece) => {
    const pieceType = piece.classList[1];
    if (pieceType == 'empty') {
        spaceListener(piece);
        return;
    }
    
    if (selected != null){
         selected.classList.remove('piece-select');
         selected = null;
         stopListeningForMovement();
      }
        
     if (pieceType.substring(pieceType.length-1) === turn){
        selected = piece;
        piece.classList.add('piece-select');
        listenForMovement();
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
    pieceType = selected.classList[1];
    pieceType = pieceType.substring(0, pieceType.length-2);
    currentSpace = selected.id;
    spaceToMove = space.id;

    alert(`Can ${pieceType} move from ${currentSpace} to ${spaceToMove}?`);
    //implement piece moving logic here
    return true;
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

function getAllSpaces() {
    return Array.from(document.getElementById('frame')
                                        .querySelectorAll('.row > div'));
}