# 🤖 Mechanical Tic-Tac-Toe AI (Web Edition)

This is a browser-based implementation of a classic **Tic-Tac-Toe game** where the player goes head-to-head with a simple, strategic AI. The twist? The AI’s decision-making mimics a **mechanical computer**—like the famous **Tinkertoy Tic-Tac-Toe Computer** from the MIT Media Lab.

---

## 🎯 Inspiration & Background

In 1989, a group at the **MIT Media Lab**, led by Danny Hillis and Brian Silverman, built a computer that played **perfect Tic-Tac-Toe**—but it was made entirely out of **Tinkertoys**, a children's construction toy. This brilliant project proved a powerful idea: **computers are not limited to electronics**. Logic can be built from almost anything—including wooden rods and gears.

This web application draws inspiration from that idea. While it's digital, the AI logic mimics **mechanical reasoning steps**—evaluating the board state using **deterministic rules** like a mechanical computer would. Think of it as a modern tribute to a beautiful, tactile form of computing.

---

## 🕹️ How It Works

### ✅ Game Rules

- Player is **O**
- AI is **X**
- The player always goes first.
- The game ends when either player wins or the board is full (draw).

### 🧠 AI Logic (Simulated Mechanical Reasoning)

The AI follows a 3-step **prioritized decision tree**, just like a mechanical computer might:

1. **Winning Move**:  
   If the AI can win in one move, it does.

2. **Blocking Move**:  
   If the player is about to win, the AI blocks.

3. **Strategic Move** (Fallback):
   - Take **center** if available.
   - Otherwise, take a **corner** randomly.
   - Otherwise, take a **side** randomly.
   - As a last resort, pick any empty cell.

Each of these steps is evaluated using simple, mechanical-style logic—checking each possible move using hard-coded condition scanning, rather than learning or minimax.

### 🔄 Game Flow

1. Player clicks a cell to make a move.
2. Game updates the internal board state.
3. Game checks if there's a win or draw.
4. If the game continues, AI makes its move after a short delay.
5. Repeat until the game ends or restarts.

---

## 🧩 File Structure

- `index.html` – Contains the game layout (9 cells, status bar, restart button).
- `style.css` – Styles the board and game elements.
- `script.js` – Contains the full game logic, AI strategy, and DOM manipulation.

---

## 🚀 Getting Started

1. Clone or download this repo.
2. Open `index.html` in your browser.
3. Start playing — you’re always O, and AI never plays dumb.

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)

---

## 📚 Credits

- Inspired by the [Tinkertoy Tic-Tac-Toe Computer](https://www.computerhistory.org/revolution/input-output/14/350/2216)  
  built by Danny Hillis, Brian Silverman, and team at MIT Media Lab.
- This project reimagines that mechanical logic for the web using simple, readable code.

---
