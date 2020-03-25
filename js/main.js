
function resetGame() {
    document.querySelector('.announce').innerText = 'A Chess Game';
    clearBoard();
    startGame();
}

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







