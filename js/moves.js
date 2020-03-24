let selected = null;
let turn = 'w';

function registerMoveListeners() {
    const squares = getAllSpaces();
    
    squares.forEach( x => {
        const piece = x.classList[1];
        if (piece != 'empty'){
            selectPiece(x);
        } else if (selected != null) {
            move(x);
        }
    });

}

function selectPiece(piece) {
    piece.addEventListener('click', event => {
        const pieceType = piece.classList[1];

        if (selected != null){
            selected.classList.remove('piece-select');
            selected = null;
            stopListeningForMovement();
        }
        
        if (pieceType.substring(pieceType.length-1) === turn){
            selected = piece;
            piece.classList.add('piece-select');
            listenForMovement();
        }
    });
}

function move(space) {
    
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