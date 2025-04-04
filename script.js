// script.js

document.addEventListener("DOMContentLoaded", () => {
  // --- Get references to HTML elements ---
  const cells = document.querySelectorAll(".cell");
  const statusArea = document.getElementById("statusArea");
  const restartButton = document.getElementById("restartButton");
  const gameBoardElement = document.getElementById("gameBoard");

  // --- Game State Variables ---
  const PLAYER_MARKER = "O";
  const AI_MARKER = "X";
  let currentPlayer = PLAYER_MARKER; // Player 'O' starts
  let board = ["", "", "", "", "", "", "", "", ""]; // Represents the 9 cells, empty initially
  let gameActive = true;

  // --- Winning Combinations ---
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  // --- Functions ---

  /**
   * Updates the visual appearance of a cell on the board.
   * @param {Element} cellElement - The DOM element for the cell.
   * @param {number} index - The index (0-8) of the cell.
   */
  function updateCell(cellElement, index) {
    cellElement.textContent = board[index];
    // Ensure class reflects the marker (and remove opposite if switching somehow)
    cellElement.classList.remove(PLAYER_MARKER, AI_MARKER);
    if (board[index]) {
      cellElement.classList.add(board[index]); // Add 'X' or 'O' class for styling
    }
  }

  /**
   * Switches the current player and updates the status message.
   */
  function switchPlayer() {
    currentPlayer = currentPlayer === PLAYER_MARKER ? AI_MARKER : PLAYER_MARKER;
    statusArea.textContent = `${
      currentPlayer === PLAYER_MARKER ? "Your" : "AI's"
    } turn (${currentPlayer})`;
  }

  /**
   * Checks if the current board state results in a win for the given marker.
   * @param {string} marker - 'X' or 'O'.
   * @returns {boolean} - True if the marker has won, false otherwise.
   */
  function checkWin(marker) {
    return winningConditions.some((condition) => {
      // Check if all cells in a winning condition are filled with the marker
      return condition.every((index) => board[index] === marker);
    });
  }

  /**
   * Checks if the board is full (draw condition).
   * @returns {boolean} - True if all cells are filled, false otherwise.
   */
  function checkDraw() {
    // If no cell is empty (''), the board is full
    return board.every((cell) => cell !== "");
  }

  /**
   * Handles the logic after a move: checks for win/draw, updates status, ends game if necessary.
   */
  function handleResultValidation() {
    let roundWon = checkWin(currentPlayer);

    if (roundWon) {
      statusArea.textContent = `${
        currentPlayer === PLAYER_MARKER ? "You" : "AI"
      } (${currentPlayer}) won!`;
      gameActive = false;
      gameBoardElement.classList.add("game-over"); // Add class to disable hover on empty cells
      return; // Exit function, game over
    }

    let roundDraw = checkDraw();
    if (roundDraw) {
      statusArea.textContent = "Draw!";
      gameActive = false;
      gameBoardElement.classList.add("game-over");
      return; // Exit function, game over
    }

    // If game is not over, switch player
    switchPlayer();

    // If it's now AI's turn, trigger AI move after a short delay
    if (gameActive && currentPlayer === AI_MARKER) {
      // Disable clicks while AI is "thinking"
      gameBoardElement.style.pointerEvents = "none";
      console.log("AI is thinking..."); // Console feedback
      setTimeout(() => {
        aiMove();
        // Re-enable clicks after AI move only if game is still active
        if (gameActive) {
          gameBoardElement.style.pointerEvents = "auto";
        }
      }, 750); // 750ms delay for AI move simulation
    }
  }

  /**
   * Handles a click event on a cell.
   * @param {Event} event - The click event object.
   */
  function handleCellClick(event) {
    const clickedCell = event.target;
    // Check if the click target is actually a cell
    if (!clickedCell.classList.contains("cell")) return;

    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    // Check if the cell is already taken or if the game is inactive or if it's AI's turn
    if (
      board[clickedCellIndex] !== "" ||
      !gameActive ||
      currentPlayer === AI_MARKER
    ) {
      console.log(
        "Invalid click - Cell taken, game over, or not player's turn."
      );
      return; // Do nothing
    }

    // --- Player's Move ---
    console.log(`Player selects index: ${clickedCellIndex}`);
    board[clickedCellIndex] = currentPlayer; // Update internal board state
    updateCell(clickedCell, clickedCellIndex); // Update visual cell
    handleResultValidation(); // Check win/draw and potentially switch player/trigger AI
  }

  /**
   * Determines and executes the AI's move based on the mechanical logic simulation.
   */
  function aiMove() {
    if (!gameActive) return; // Don't move if game isn't active

    let moveIndex = -1;

    // --- AI Logic (Simulating Mechanical Steps) ---

    // 1. Check if AI can win
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        // Check only empty spots
        let tempBoard = [...board]; // Create a copy
        tempBoard[i] = AI_MARKER;
        if (checkWinInternal(tempBoard, AI_MARKER)) {
          moveIndex = i;
          console.log("AI Strategy: Winning Move found at index", i);
          break;
        }
      }
    }

    // 2. Check if Player can win next turn, and block
    if (moveIndex === -1) {
      // Only check if no winning move found
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          // Check only empty spots
          let tempBoard = [...board];
          tempBoard[i] = PLAYER_MARKER;
          if (checkWinInternal(tempBoard, PLAYER_MARKER)) {
            moveIndex = i;
            console.log("AI Strategy: Blocking Player move found at index", i);
            break;
          }
        }
      }
    }

    // 3. Strategic Move (Center -> Corner -> Side)
    if (moveIndex === -1) {
      // Only if no win/block found
      console.log("AI Strategy: Strategic Placement");
      // Try Center
      if (board[4] === "") {
        moveIndex = 4;
        console.log("AI Strategy: Taking Center");
      } else {
        // Try Corners (randomly)
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter((index) => board[index] === "");
        if (availableCorners.length > 0) {
          moveIndex =
            availableCorners[
              Math.floor(Math.random() * availableCorners.length)
            ];
          console.log("AI Strategy: Taking Corner", moveIndex);
        } else {
          // Try Sides (randomly)
          const sides = [1, 3, 5, 7];
          const availableSides = sides.filter((index) => board[index] === "");
          if (availableSides.length > 0) {
            moveIndex =
              availableSides[Math.floor(Math.random() * availableSides.length)];
            console.log("AI Strategy: Taking Side", moveIndex);
          } else {
            // Fallback: Find any empty spot (should not happen in TicTacToe if draw is checked correctly)
            moveIndex = board.findIndex((cell) => cell === "");
            if (moveIndex !== -1) {
              console.log("AI Strategy: Taking fallback empty spot", moveIndex);
            }
          }
        }
      }
    }

    // --- Execute AI Move ---
    if (moveIndex !== -1 && board[moveIndex] === "") {
      console.log(`AI executes move at index: ${moveIndex}`);
      board[moveIndex] = AI_MARKER;
      updateCell(cells[moveIndex], moveIndex); // Update the specific cell visually
      handleResultValidation(); // Check if AI won/draw and switch player
    } else {
      console.error(
        "AI failed to find a valid move. Current board:",
        board,
        "Calculated index:",
        moveIndex
      );
      // This might happen if the board is full but checkDraw somehow failed earlier
      // Or if calculation logic has an error
      if (checkDraw() && gameActive) {
        // Double check draw condition if AI fails
        statusArea.textContent = "Draw!";
        gameActive = false;
        gameBoardElement.classList.add("game-over");
      }
    }
  }

  /**
   * Internal helper for AI to check win on a temporary board state.
   * @param {string[]} tempBoard - The temporary board array to check.
   * @param {string} marker - 'X' or 'O'.
   * @returns {boolean} - True if the marker has won on the temp board.
   */
  function checkWinInternal(tempBoard, marker) {
    return winningConditions.some((condition) => {
      return condition.every((index) => tempBoard[index] === marker);
    });
  }

  /**
   * Resets the game to its initial state.
   */
  function restartGame() {
    console.log("Restarting game...");
    board = ["", "", "", "", "", "", "", "", ""]; // Clear internal board
    gameActive = true;
    currentPlayer = PLAYER_MARKER; // Player 'O' starts again
    statusArea.textContent = `Your turn (${PLAYER_MARKER})`;
    gameBoardElement.classList.remove("game-over"); // Remove game over styling
    gameBoardElement.style.pointerEvents = "auto"; // Ensure clicks are enabled

    // Clear visual board
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove(PLAYER_MARKER);
      cell.classList.remove(AI_MARKER);
    });
  }

  // --- Event Listeners ---
  // Add listener to the board, and check target is a cell inside handleCellClick
  gameBoardElement.addEventListener("click", handleCellClick);
  restartButton.addEventListener("click", restartGame);

  // --- Initial Setup ---
  statusArea.textContent = `Your turn (${PLAYER_MARKER})`; // Set initial status
  console.log("Game initialized. Player O's turn.");
}); // End DOMContentLoaded
