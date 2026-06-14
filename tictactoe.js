const gameState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameActive: true,
    scores: { X: 0, O: 0, draw: 0 },
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
    if (gameState.board[index] !== '' || !gameState.gameActive) return;
    
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
        if (gameState.board[a] !== '' &&
            gameState.board[a] === gameState.board[b] &&
            gameState.board[a] === gameState.board[c]) {
            combination.forEach(idx => {
                document.querySelector(`.cell[data-index="${idx}"]`).classList.add('winner');
            });
            return 'win';
        }
    }
    if (!gameState.board.includes('')) return 'draw';
    return 'continue';
}

function handleWin() {
    gameState.gameActive = false;
    gameState.scores[gameState.currentPlayer]++;
    messageElement.textContent = getTranslation('winMessage') + gameState.currentPlayer + '!';
    messageElement.classList.add('win');
    statusElement.textContent = getTranslation('winStatus');
    updateScores();
    updateDisplay();
}

function handleDraw() {
    gameState.gameActive = false;
    gameState.scores.draw++;
    messageElement.textContent = getTranslation('drawMessage');
    messageElement.classList.add('draw');
    statusElement.textContent = getTranslation('drawStatus');
    updateScores();
    updateDisplay();
}

function updateDisplay() {
    document.querySelectorAll('.cell').forEach((cell, index) => {
        cell.textContent = gameState.board[index];
        cell.className = 'cell';
        if (gameState.board[index] === 'X') cell.classList.add('x');
        else if (gameState.board[index] === 'O') cell.classList.add('o');
        if (!gameState.gameActive && cell.classList.contains('winner')) cell.classList.add('winner');
    });
    
    const playerName = gameState.currentPlayer === 'X' ? getTranslation('playerX') : getTranslation('playerO');
    const playerColor = gameState.currentPlayer === 'X' ? '#00f3ff' : '#ff00ff';
    currentPlayerNameElement.textContent = playerName;
    currentPlayerNameElement.style.textShadow = `0 0 8px ${playerColor}`;
    currentPlayerSymbolElement.textContent = gameState.currentPlayer;
    currentPlayerSymbolElement.style.color = playerColor;

    if (gameState.gameActive) {
        messageElement.textContent = getTranslation('turnMessage') + gameState.currentPlayer;
        messageElement.className = 'message';
        statusElement.textContent = getTranslation('playingStatus');
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

newGameBtn.addEventListener('click', newGame);
resetScoreBtn.addEventListener('click', resetScores);

const tictactoeTranslations = {
    ru: {
        title: "Ramondrole XO",
        subtitle: "НОВЫЕ КРЕСТИКИ-НОЛИКИ",
        difficulty: "СЛОЖНОСТЬ:",
        easy: "ЛЕГКО",
        mode: "РЕЖИМ:",
        twoPlayer: "2 ИГРОКА",
        statusLabel: "СТАТУС:",
        playing: "ИГРАЕМ",
        currentPlayer: "ТЕКУЩИЙ ИГРОК",
        newGame: "НОВАЯ ИГРА",
        resetScore: "СБРОС СЧЕТА",
        scoreX: "КРЕСТИКИ (X)",
        scoreDraw: "НИЧЬИ",
        scoreO: "НОЛИКИ (O)",
        footer: "Ramondrole СЕТЬ 2077 | СИСТЕМА v2.0 | АДАПТИВНЫЙ ДИЗАЙН",
        firstMove: "СДЕЛАЙТЕ ПЕРВЫЙ ХОД!",
        winMessage: "ПОБЕДА! ИГРОК ",
        drawMessage: "НИЧЬЯ! НИКТО НЕ ВЫИГРАЛ!",
        winStatus: "ПОБЕДА",
        drawStatus: "НИЧЬЯ",
        playingStatus: "ИГРАЕМ",
        playerX: "ИГРОК X",
        playerO: "ИГРОК O",
        turnMessage: "ХОД ИГРОКА: "
    },
    en: {
        title: "Ramondrole XO",
        subtitle: "NEW TIC-TAC-TOE",
        difficulty: "DIFFICULTY:",
        easy: "EASY",
        mode: "MODE:",
        twoPlayer: "2 PLAYERS",
        statusLabel: "STATUS:",
        playing: "PLAYING",
        currentPlayer: "CURRENT PLAYER",
        newGame: "NEW GAME",
        resetScore: "RESET SCORE",
        scoreX: "CROSSES (X)",
        scoreDraw: "DRAWS",
        scoreO: "NOUGHTS (O)",
        footer: "Ramondrole NETWORK 2077 | SYSTEM v2.0 | RESPONSIVE DESIGN",
        firstMove: "MAKE THE FIRST MOVE!",
        winMessage: "VICTORY! PLAYER ",
        drawMessage: "DRAW! NO ONE WINS!",
        winStatus: "VICTORY",
        drawStatus: "DRAW",
        playingStatus: "PLAYING",
        playerX: "PLAYER X",
        playerO: "PLAYER O",
        turnMessage: "PLAYER'S TURN: "
    },
    de: {
        title: "Ramondrole XO",
        subtitle: "NEUES TIC-TAC-TOE",
        difficulty: "SCHWIERIGKEIT:",
        easy: "LEICHT",
        mode: "MODUS:",
        twoPlayer: "2 SPIELER",
        statusLabel: "STATUS:",
        playing: "SPIELT",
        currentPlayer: "AKTUELLER SPIELER",
        newGame: "NEUES SPIEL",
        resetScore: "PUNKTE ZURÜCKSETZEN",
        scoreX: "KREUZE (X)",
        scoreDraw: "UNENTSCHIEDEN",
        scoreO: "KREISE (O)",
        footer: "Ramondrole NETZWERK 2077 | SYSTEM v2.0 | RESPONSIVES DESIGN",
        firstMove: "MACHE DEN ERSTEN ZUG!",
        winMessage: "SIEG! SPIELER ",
        drawMessage: "UNENTSCHIEDEN! NIEMAND GEWINNT!",
        winStatus: "SIEG",
        drawStatus: "UNENTSCHIEDEN",
        playingStatus: "SPIELT",
        playerX: "SPIELER X",
        playerO: "SPIELER O",
        turnMessage: "SPIELER AM ZUG: "
    }
};

function getTranslation(key) {
    const lang = currentLang || 'ru';
    return tictactoeTranslations[lang]?.[key] || tictactoeTranslations.ru[key];
}

function updateTictactoeLanguage() {
    const elements = ['title', 'subtitle', 'difficulty', 'easy', 'mode', 'twoPlayer', 
                      'statusLabel', 'scoreX', 'scoreDraw', 'scoreO', 'footer', 'firstMove'];
    elements.forEach(key => {
        const el = document.querySelector(`[data-key="${key}"]`);
        if (el) el.textContent = getTranslation(key);
    });
    
    if (!gameState.gameActive) {
        if (statusElement.textContent === getTranslation('winStatus') || 
            statusElement.textContent === getTranslation('drawStatus')) {
        } else {
            statusElement.textContent = getTranslation('playingStatus');
        }
    } else {
        statusElement.textContent = getTranslation('playingStatus');
    }
}

setInterval(() => {
    if (window.currentLang) {
        updateTictactoeLanguage();
        if (gameState.gameActive) {
            messageElement.textContent = getTranslation('turnMessage') + gameState.currentPlayer;
        }
    }
}, 100);

Object.defineProperty(window, 'currentLang', {
    set: function(lang) {
        this._currentLang = lang;
        updateTictactoeLanguage();
    },
    get: function() {
        return this._currentLang || 'ru';
    }
});

updateTictactoeLanguage();
initBoard();