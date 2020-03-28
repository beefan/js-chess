# js-chess
Built a basic chess game to play around with Javascript Events and DOM Manipulation

![screen shot](screen.png)

Written in vanilla JS. 

Features: 
* Pieces highlighted on selection
* empty spaces are tinted as you're searching for moves
* Castling functionality implemented!
    * move the king two spaces to castle
    * you can't castle out of check!
* Pieces stack up on the side once taken.
* Alerts when you're in check!
* Doesn't let you move if it'll put you in check.
* Alerts when checkmate has been reached!
* Reset the game for infinte play time! 

Known issues/limitations: 
* Chess rules say castling only works if you've never moved your king or rook. This app does not check if you've *never* moved them. Just that they are in the right spots for castling.
* Pawns cannot be exchanged for other pieces when you reach the end.
* No computer player. 