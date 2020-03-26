/**
 * Resets the Board and starts a new game.
 */
function resetGame() {
    document.querySelector('.announce').innerText = 'A Chess Game';
    clearBoard();
    startGame();
}

/**
 * Draws the board. Registers move listeners. 
 */
function startGame() {
    drawBoard();
    registerMoveListeners();
}

/*load game*/
document.addEventListener('DOMContentLoaded', () => {
    startGame();
    document.getElementById('resetButton').addEventListener('click', (event) => {
        resetGame();
        event.preventDefault();
    } );

});







