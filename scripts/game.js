const Game = (() => {
   let playersInfo = document.querySelector(".players-info"),
      _players = {
         firstPlayer: Player(
            ".player-1",
            ".player-1-name",
            ".player-1-score",
            true
         ),

         secondPlayer: Player(
            ".player-2",
            ".player-2-name",
            ".player-2-score",
            false
         ),
      };

   // functions to check winning
   const checkWinning = (currentBoardState = GameBoard.board) => {
      if (
         _checkWinningHorizontally(currentBoardState) ||
         _checkWinningVertically(currentBoardState) ||
         _checkWinningDiagonally(currentBoardState)
      ) {
         return [
            true,
            _checkWinningHorizontally(currentBoardState)
               ? _checkWinningHorizontally(currentBoardState)[1]
               : _checkWinningVertically(currentBoardState)
               ? _checkWinningVertically(currentBoardState)[1]
               : _checkWinningDiagonally(currentBoardState)[1],
         ];
      }
      return false;
   };

   const _checkWinningHorizontally = (currentBoardState) => {
      let winRow = 0;

      for (let row of currentBoardState) {
         if (
            row.every((elem) => elem === "X") ||
            row.every((elem) => elem === "O")
         ) {
            if (currentBoardState === GameBoard.board)
               GameBoard.getBoardRowsAsDOMElements()[winRow].forEach((spot) =>
                  spot.classList.add("winning-line")
               );
            return [true, row[0]];
         }

         winRow++;
      }
   };

   const _checkWinningVertically = (currentBoardState) => {
      let firstRow = currentBoardState[0],
         secondRow = currentBoardState[1],
         thirdRow = currentBoardState[2];

      for (let i = 0; i < 3; i++) {
         if (
            firstRow[i] &&
            firstRow[i] === secondRow[i] &&
            firstRow[i] === thirdRow[i]
         ) {
            if (currentBoardState === GameBoard.board) {
               let DOMBoard = GameBoard.getBoardRowsAsDOMElements();
               for (let j = 0; j < 3; j++)
                  DOMBoard[j][i].classList.add("winning-line");
            }

            return [true, firstRow[i]];
         }
      }
   };

   const _checkWinningDiagonally = (currentBoardState) => {
      let firstRow = currentBoardState[0],
         secondRow = currentBoardState[1],
         thirdRow = currentBoardState[2];

      // Check on the main diagonal
      if (
         firstRow[0] &&
         firstRow[0] === secondRow[1] &&
         firstRow[0] === thirdRow[2]
      ) {
         if (currentBoardState === GameBoard.board) {
            let DOMBoard = GameBoard.getBoardRowsAsDOMElements();
            for (let i = 0; i < 3; i++)
               DOMBoard[i][i].classList.add("winning-line");
         }

         return [true, firstRow[0]];
      }
      // check on the secondary diagonal
      else if (
         firstRow[2] &&
         firstRow[2] === secondRow[1] &&
         firstRow[2] === thirdRow[0]
      ) {
         if (currentBoardState === GameBoard.board) {
            let DOMBoard = GameBoard.getBoardRowsAsDOMElements();
            for (let i = 0, j = 2; i < 3; i++, j--)
               DOMBoard[i][j].classList.add("winning-line");
         }

         return [true, firstRow[2]];
      }
   };

   // Check for tie
   const checkTie = (numberOfMoves) => {
      return numberOfMoves === 10 ? true : false;
   };

   // Display players info under the board
   const setPlayersInfo = () => {
      _players.firstPlayer.name.innerText = form.firstPlayer;
      _players.secondPlayer.name.innerText = form.secondPlayer;
   };

   // Change the starter player when winning or tie
   const changeStarterPlayer = () => {
      // * Make the second (AI) player the starter
      if (_players.firstPlayer.isStarter) {
         _players.firstPlayer.isStarter = false;
         _players.firstPlayer.info.classList.remove("starter-player");
         _players.secondPlayer.info.classList.add("starter-player");
         _players.secondPlayer.isStarter = true;

         Game.isAITurn = true;
         [Minimax.aiMark, Minimax.humanMark] = [
            Minimax.humanMark,
            Minimax.aiMark,
         ];
      }
      // * Make the first (human) player the starter
      else {
         _players.secondPlayer.isStarter = false;
         _players.secondPlayer.info.classList.remove("starter-player");
         _players.firstPlayer.info.classList.add("starter-player");
         _players.firstPlayer.isStarter = true;

         Game.isAITurn = false;
         [Minimax.aiMark, Minimax.humanMark] = [
            Minimax.humanMark,
            Minimax.aiMark,
         ];
      }
   };

   // Increase the winning player's score
   const increasePlayerScore = () => {
      if (Game.numOfX > Game.numOfO) {
         if (_players.firstPlayer.isStarter)
            _players.firstPlayer.score.innerText =
               +_players.firstPlayer.score.innerText + 1;
         else
            _players.secondPlayer.score.innerText =
               +_players.secondPlayer.score.innerText + 1;
      } else {
         if (!_players.firstPlayer.isStarter)
            _players.firstPlayer.score.innerText =
               +_players.firstPlayer.score.innerText + 1;
         else
            _players.secondPlayer.score.innerText =
               +_players.secondPlayer.score.innerText + 1;
      }

      Game.numOfO = 0;
      Game.numOfX = 0;
   };

   return {
      playersInfo,
      moveNum: 1,
      numOfX: 0,
      numOfO: 0,
      checkWinning,
      checkTie,
      setPlayersInfo,
      changeStarterPlayer,
      increasePlayerScore,
      isAITurn: false,
      isAIOpponent: false,
   };
})();
