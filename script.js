const gameState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameActive: true,
    scores: {
        X: 0,
        O: 0,
        draw: 0
    },
    winningCombinations: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ]
};


const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const currentPlayerNameElement = document.getElementById('current-player-name');
const currentPlayerSymbolElement = document.getElementById('current-player-symbol');
const statusElement = document.getElementById('status');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');
const scoreDrawElement = document.getElementById('score-draw');
const newGameBtn = document.getElementById('new-game-btn');
const resetScoreBtn = document.getElementById('reset-score-btn');
const backBtn = document.getElementById('back-btn');
const logo = document.getElementById('logo');

function initBoard() {
    boardElement.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
    }
    
    updateDisplay();
}

function handleCellClick(index) {
    if (gameState.board[index] !== '' || !gameState.gameActive) {
        return;
    }
    
    gameState.board[index] = gameState.currentPlayer;

    const result = checkGameResult();
    
    if (result === 'win') {
        handleWin();
    } else if (result === 'draw') {
        handleDraw();
    } else {
        
        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
        updateDisplay();
    }
}

function checkGameResult() {
    for (const combination of gameState.winningCombinations) {
        const [a, b, c] = combination;
        if (
            gameState.board[a] !== '' &&
            gameState.board[a] === gameState.board[b] &&
            gameState.board[a] === gameState.board[c]
        ) {
            combination.forEach(index => {
                document.querySelector(`.cell[data-index="${index}"]`).classList.add('winner');
            });
            
            return 'win';
        }
    }
    
    if (!gameState.board.includes('')) {
        return 'draw';
    }
    
    return 'continue';
}
function handleWin() {
    gameState.gameActive = false;
    gameState.scores[gameState.currentPlayer]++;
    
    messageElement.textContent = `ПОБЕДА! ИГРОК ${gameState.currentPlayer} ВЫИГРАЛ!`;
    messageElement.classList.add('win');
    statusElement.textContent = 'ПОБЕДА';
    
    updateScores();
    updateDisplay();
}
function handleDraw() {
    gameState.gameActive = false;
    gameState.scores.draw++;
    
    messageElement.textContent = 'НИЧЬЯ! НИКТО НЕ ВЫИГРАЛ!';
    messageElement.classList.add('draw');
    statusElement.textContent = 'НИЧЬЯ';
    
    updateScores();
    updateDisplay();
}
function updateDisplay() {
    document.querySelectorAll('.cell').forEach((cell, index) => {
        cell.textContent = gameState.board[index];
        cell.className = 'cell';
        
        if (gameState.board[index] === 'X') {
            cell.classList.add('x');
        } else if (gameState.board[index] === 'O') {
            cell.classList.add('o');
        }
        if (!gameState.gameActive && cell.classList.contains('winner')) {
            cell.classList.add('winner');
        }
    });
    const playerName = gameState.currentPlayer === 'X' ? 'ИГРОК X' : 'ИГРОК O';
    const playerColor = gameState.currentPlayer === 'X' ? '#00f3ff' : '#ff00ff';
    
    currentPlayerNameElement.textContent = playerName;
    currentPlayerNameElement.style.textShadow = `0 0 8px ${playerColor}`;
    currentPlayerSymbolElement.textContent = gameState.currentPlayer;
    currentPlayerSymbolElement.style.color = playerColor;

    if (gameState.gameActive) {
        messageElement.textContent = `ХОД ИГРОКА: ${gameState.currentPlayer}`;
        messageElement.className = 'message';
        statusElement.textContent = 'ИГРАЕМ';
    }
}

function updateScores() {
    scoreXElement.textContent = gameState.scores.X;
    scoreOElement.textContent = gameState.scores.O;
    scoreDrawElement.textContent = gameState.scores.draw;
}

function newGame() {
    gameState.board = Array(9).fill('');
    gameState.currentPlayer = 'X';
    gameState.gameActive = true;
    
    messageElement.className = 'message';
    initBoard();
}
function resetScores() {
    gameState.scores = { X: 0, O: 0, draw: 0 };
    updateScores();
    newGame();
}
function handleBackClick(e) {
    e.preventDefault();
    document.body.style.opacity = '0.8';
    document.body.style.transform = 'scale(0.95)';
    messageElement.textContent = 'ПЕРЕХОД НА ГЛАВНУЮ...';
    messageElement.className = 'message';
    
    setTimeout(() => {
        window.location.href = 'https://ramondrole.github.io/Pogreb_Ramondrole-Games/';
    }, 1000);
}
function handleLogoClick(e) {
    e.preventDefault();
    logo.style.transform = 'scale(1.1)';
    logo.style.boxShadow = '0 0 30px #00f3ff, 0 0 50px rgba(0, 243, 255, 0.9)';
    
    setTimeout(() => {
        logo.style.transform = 'scale(1)';
        logo.style.boxShadow = '';
        alert('Добро пожаловать в RAMONDROLE CORPORATION!\n\nЛидер в производстве развлечений с 2077 года.');
    }, 300);
}

// Добавляем эффект наведения для кнопок
function addButtonHoverEffects() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Добавляем эффект мигания для заголовка
function addGlitchEffect() {
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            glitchText.style.textShadow = `
                0 0 10px #00f3ff,
                0 0 20px #00f3ff,
                0 0 30px #0077ff,
                ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #ff00ff,
                ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #00f3ff
            `;
        }, 100);
    }
}

// Добавляем случайные вспышки на сетке
function addGridFlashes() {
    setInterval(() => {
        const grid = document.querySelector('.cyber-grid');
        if (!grid) return;
        
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = Math.random() * 100 + 'vh';
        flash.style.left = Math.random() * 100 + 'vw';
        flash.style.width = '100px';
        flash.style.height = '2px';
        flash.style.background = 'linear-gradient(90deg, transparent, #00f3ff, transparent)';
        flash.style.boxShadow = '0 0 20px #00f3ff';
        flash.style.zIndex = '-1';
        flash.style.pointerEvents = 'none';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            flash.style.transition = 'opacity 0.5s';
            
            setTimeout(() => {
                if (flash.parentNode) {
                    document.body.removeChild(flash);
                }
            }, 500);
        }, 300);
    }, 2000);
}

// Инициализация игры
function initGame() {
    newGameBtn.addEventListener('click', newGame);
    resetScoreBtn.addEventListener('click', resetScores);
    backBtn.addEventListener('click', handleBackClick);
    logo.addEventListener('click', handleLogoClick);
    
    addButtonHoverEffects();
    addGlitchEffect();
    addGridFlashes();
    
    // Запуск игры
    initBoard();
}

// Запускаем игру после загрузки DOM
document.addEventListener('DOMContentLoaded', initGame);