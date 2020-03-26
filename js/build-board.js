/**
 * Clears the chess board. 
 */
function clearBoard() {
    const frame = document.getElementById('frame');
    const blackbench = document.getElementById('blackbench');
    const whitebench = document.getElementById('whitebench');

    removeChildren(frame);
    removeChildren(blackbench);
    removeChildren(whitebench);
}

/**
 * Removes children from a parent element. Aids in board reset.
 * 
 * @param {HTMLElement} parent frame in which to draw the board. 
 */
function removeChildren(parent) {
    const rows = Array.from(parent.children);
    rows.forEach( x => parent.removeChild(x));
}

/**
 * Draws the board.
 */
function drawBoard() {
    const frame = document.getElementById('frame');
    for (let i = 0; i < 8 ; i++) {
        buildRow(frame, i); 
    }
}

/**
 * Builds a row of board squares.
 * 
 * @param {HTMLElement} frame frame in which to insert the row
 * @param {Number} count row number
 */
function buildRow(frame, count) {
    const row = document.createElement('div');
    row.classList.add('row');
    frame.insertAdjacentElement('beforeend', row);

    for (let i = 1; i < 9 ; i++) {
         buildSquare(row, count+i, i+(8*count)); 
    }
}

/**
 * Builds a square, adds appropriate classes, inserts it in a row. 
 * 
 * @param {HTMLElement} row row in which to insert the square
 * @param {Number} colorCount count which helps to color the square correctly
 * @param {Number} pieceCount count of the square to be inserted
 */
function buildSquare(row, colorCount, pieceCount) {
  const square = document.createElement('div');
  if (colorCount % 2 == 0){
    square.classList.add('black-square');
  }else {
    square.classList.add('white-square');
  }
  const piece = getPieceClass(pieceCount);
  square.classList.add(piece);
  square.id = pieceCount;

  row.insertAdjacentElement('beforeend', square);
}

/**
 * Returns a class to add to a square based upon
 * the number associated with a certain square.
 * Determines which chess piece to draw.
 * 
 * @param {Number} count number of the square
 * @return {String} name of class to attach to square
 */
function getPieceClass(count) {
    switch(true){
        case count == 1 || count == 8: 
            return 'rook_b';
        case count == 2 || count == 7: 
            return 'knight_b';
        case count == 3 || count == 6: 
            return 'bishop_b';
        case count == 4: return 'queen_b';
        case count == 5: return 'king_b';
        case count > 8 && count < 17: return 'pawn_b';

        case count == 57 || count == 64: 
            return 'rook_w';
        case count == 58 || count == 63: 
            return 'knight_w';
        case count == 59 || count == 62: 
            return 'bishop_w';
        case count == 60: return 'queen_w';
        case count == 61: return 'king_w';
        case count > 48 && count < 57: return 'pawn_w';
        
        default: return 'empty';
    }
}