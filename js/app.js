
function resetGame() {
    document.querySelector('.announce').innerText = 'A Chess Game';
    drawBoard();
}

/*load game*/
document.addEventListener('DOMContentLoaded', () => {
    drawBoard();
    registerMoveListeners();
    
    document.getElementById('resetButton').addEventListener('click', (event) => {
        resetGame();
        event.preventDefault();
    } );


});







