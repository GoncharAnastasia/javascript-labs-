const boardElement = document.getElementById("gameBoard");
const movesCountElement = document.getElementById("movesCount");
const minStepsElement = document.getElementById("minSteps");
const messageElement = document.getElementById("message");
const levelSelect = document.getElementById("levelSelect");
const loadLevelBtn = document.getElementById("loadLevelBtn");
const restartBtn = document.getElementById("restartBtn");

let board = [];
let initialBoard = [];
let moves = 0;
let minSteps = 0;
let currentLevel = "a";

document.addEventListener("DOMContentLoaded", () => {
    loadLevel(currentLevel);
});

loadLevelBtn.addEventListener("click", () => {
    currentLevel = levelSelect.value;
    loadLevel(currentLevel);
});

restartBtn.addEventListener("click", () => {
    restartLevel();
});

async function loadLevel(level) {
    try {
        const response = await fetch(`data/level-${level}.json`);
        const data = await response.json();

        board = data.grid.map(row => [...row]);
        initialBoard = data.grid.map(row => [...row]);
        minSteps = data.minSteps;
        moves = 0;

        movesCountElement.textContent = moves;
        minStepsElement.textContent = minSteps;
        messageElement.textContent = "";

        renderBoard();
    } catch (error) {
        messageElement.textContent = "Error loading level.";
        console.error("Load error:", error);
    }
}

function restartLevel() {
    board = initialBoard.map(row => [...row]);
    moves = 0;
    movesCountElement.textContent = moves;
    messageElement.textContent = "";
    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = "";

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add(board[row][col] === 1 ? "on" : "off");

            cell.addEventListener("click", () => {
                handleCellClick(row, col);
            });

            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(row, col) {
    toggleCell(row, col);
    toggleCell(row - 1, col);
    toggleCell(row + 1, col);
    toggleCell(row, col - 1);
    toggleCell(row, col + 1);

    moves++;
    movesCountElement.textContent = moves;

    renderBoard();
    checkWin();
}

function toggleCell(row, col) {
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
        board[row][col] = board[row][col] === 1 ? 0 : 1;
    }
}

function checkWin() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === 1) {
                return;
            }
        }
    }

    if (moves === minSteps) {
        messageElement.textContent = `You win! Perfect result: ${moves} moves.`;
    } else {
        messageElement.textContent = `You win! Completed in ${moves} moves.`;
    }
}