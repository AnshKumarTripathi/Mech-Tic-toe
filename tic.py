import random
import time

# Represents the Tic-Tac-Toe board
# We use numbers 0-8 initially to represent empty spots easily
board = [str(i) for i in range(9)]
PLAYER_MARKER = 'O'
AI_MARKER = 'X'

def print_board(current_board):
    """Prints the current state of the Tic-Tac-Toe board."""
    print("\n-------------")
    print("| " + current_board[0] + " | " + current_board[1] + " | " + current_board[2] + " |")
    print("-------------")
    print("| " + current_board[3] + " | " + current_board[4] + " | " + current_board[5] + " |")
    print("-------------")
    print("| " + current_board[6] + " | " + current_board[7] + " | " + current_board[8] + " |")
    print("-------------\n")

def is_space_free(current_board, index):
    """Checks if a specific square on the board is free."""
    # Checks if the content is not 'X' or 'O'
    return current_board[index] != PLAYER_MARKER and current_board[index] != AI_MARKER

def get_player_move(current_board):
    """Gets the player's chosen move and validates it."""
    move = -1
    while move not in range(9) or not is_space_free(current_board, move):
        try:
            choice = input("Your turn (O). Choose a square (0-8): ")
            move = int(choice)
            if move not in range(9):
                print("Invalid choice. Please enter a number between 0 and 8.")
            elif not is_space_free(current_board, move):
                print("That space is already taken. Choose another.")
        except ValueError:
            print("Invalid input. Please enter a number.")
    return move

def check_win(current_board, marker):
    """Checks if the given marker has won the game."""
    # Check rows
    for i in range(0, 9, 3):
        if current_board[i] == current_board[i+1] == current_board[i+2] == marker:
            return True
    # Check columns
    for i in range(3):
        if current_board[i] == current_board[i+3] == current_board[i+6] == marker:
            return True
    # Check diagonals
    if current_board[0] == current_board[4] == current_board[8] == marker:
        return True
    if current_board[2] == current_board[4] == current_board[6] == marker:
        return True
    return False

def is_board_full(current_board):
    """Checks if the board is full (draw condition)."""
    for i in range(9):
        if is_space_free(current_board, i):
            return False
    return True

def get_ai_move(current_board):
    """Determines the AI's move based on the mechanical logic."""
    print("AI (X) is thinking...")
    time.sleep(1) # Simulate mechanical delay

    # --- Simulating Mechanical Logic ---

    # 1. Check if AI can win in the next move
    for i in range(9):
        if is_space_free(current_board, i):
            board_copy = current_board[:] # Create a temporary copy
            board_copy[i] = AI_MARKER
            if check_win(board_copy, AI_MARKER):
                print("AI finds a winning move.")
                return i

    # 2. Check if Player can win in the next move, and block them
    for i in range(9):
        if is_space_free(current_board, i):
            board_copy = current_board[:] # Create a temporary copy
            board_copy[i] = PLAYER_MARKER
            if check_win(board_copy, PLAYER_MARKER):
                print("AI finds a move to block player.")
                return i

    # 3. Strategic Move (Mimicking the predefined mechanical tree)
    #    Strategy: Center -> Corners -> Sides
    print("AI follows strategic placement.")
    # Try center
    if is_space_free(current_board, 4):
        return 4

    # Try corners (0, 2, 6, 8) - pick a random available one
    corners = [0, 2, 6, 8]
    available_corners = [i for i in corners if is_space_free(current_board, i)]
    if available_corners:
        return random.choice(available_corners)

    # Try sides (1, 3, 5, 7) - pick a random available one
    sides = [1, 3, 5, 7]
    available_sides = [i for i in sides if is_space_free(current_board, i)]
    if available_sides:
        return random.choice(available_sides)

    # Should not happen if is_board_full is checked correctly, but as a fallback:
    for i in range(9):
        if is_space_free(current_board, i):
            return i
    return -1 # Should indicate an error or full board state already


# --- Game Loop ---
print("Welcome to Mechanical Tic-Tac-Toe Simulation!")
print("You are 'O', the AI is 'X'. Enter 0-8 to make a move.")
current_turn = PLAYER_MARKER

while True:
    print_board(board)

    if current_turn == PLAYER_MARKER:
        # Player's turn
        move = get_player_move(board)
        board[move] = PLAYER_MARKER

        # Check if player won
        if check_win(board, PLAYER_MARKER):
            print_board(board)
            print("Congratulations! You (O) have won!")
            break
        # Switch turn
        current_turn = AI_MARKER

    else: # AI's turn
        move = get_ai_move(board)
        if move != -1: # Ensure a valid move was found
             board[move] = AI_MARKER
             print(f"AI (X) chooses square {move}")
        else:
            # This case should ideally not be reached if draw is checked
             print("Error: AI could not find a move, but board isn't full?")

        # Check if AI won
        if check_win(board, AI_MARKER):
            print_board(board)
            print("AI (X) has won!")
            break
        # Switch turn
        current_turn = PLAYER_MARKER

    # Check for draw (after both turns)
    if is_board_full(board):
        print_board(board)
        print("It's a draw!")
        break