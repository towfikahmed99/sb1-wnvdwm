export function createBingoGame() {
  let credits = 100;
  let wins = 0;
  let currentBoard = [];
  let markedCells = new Set();
  let drawnNumbers = new Set();
  let lastNumbers = [];
  
  const creditsDisplay = document.getElementById('credits');
  const winsDisplay = document.getElementById('wins');
  const bingoBoard = document.getElementById('bingoBoard');
  const drawButton = document.getElementById('drawNumber');
  const newGameButton = document.getElementById('newGame');
  const drawnNumberDisplay = document.getElementById('drawnNumber');
  const lastNumbersDisplay = document.getElementById('lastNumbers').querySelector('span');

  function generateBoard() {
    const numbers = new Set();
    while (numbers.size < 25) {
      numbers.add(Math.floor(Math.random() * 75) + 1);
    }
    return Array.from(numbers);
  }

  function updateBoard() {
    if (!bingoBoard) return; // Safety check
    
    bingoBoard.innerHTML = currentBoard.map((num, idx) => `
      <div class="bingo-cell${markedCells.has(idx) ? ' marked' : ''}" data-index="${idx}">
        ${num}
      </div>
    `).join('');
  }

  function updateLastNumbers() {
    if (!lastNumbersDisplay) return; // Safety check
    lastNumbersDisplay.textContent = lastNumbers.slice(-5).join(', ');
  }

  function checkWin() {
    const winPatterns = [
      [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24], // rows
      [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24], // columns
      [0,6,12,18,24], [4,8,12,16,20] // diagonals
    ];

    for (const pattern of winPatterns) {
      if (pattern.every(idx => markedCells.has(idx))) {
        return true;
      }
    }
    return false;
  }

  function startNewGame() {
    if (credits < 10) {
      alert('Not enough credits! Game Over!');
      return;
    }
    credits -= 10;
    creditsDisplay.textContent = credits;
    currentBoard = generateBoard();
    markedCells.clear();
    drawnNumbers.clear();
    lastNumbers = [];
    drawnNumberDisplay.textContent = 'Draw a number to start!';
    updateBoard();
    updateLastNumbers();
    
    // Enable draw button at start of new game
    if (drawButton) {
      drawButton.disabled = false;
    }
  }

  function drawNumber() {
    if (credits < 5) {
      alert('Not enough credits!');
      return;
    }
    if (drawnNumbers.size >= 75) {
      alert('All numbers have been drawn! Start a new game.');
      return;
    }

    credits -= 5;
    creditsDisplay.textContent = credits;

    let number;
    do {
      number = Math.floor(Math.random() * 75) + 1;
    } while (drawnNumbers.has(number));

    drawnNumbers.add(number);
    lastNumbers.push(number);
    
    if (drawnNumberDisplay) {
      drawnNumberDisplay.textContent = number.toString();
      drawnNumberDisplay.classList.remove('drawn-number-animation');
      void drawnNumberDisplay.offsetWidth; // Trigger reflow
      drawnNumberDisplay.classList.add('drawn-number-animation');
    }
    
    updateLastNumbers();

    const index = currentBoard.indexOf(number);
    if (index !== -1) {
      markedCells.add(index);
      updateBoard();

      if (checkWin()) {
        wins++;
        winsDisplay.textContent = wins;
        credits += 50;
        creditsDisplay.textContent = credits;
        setTimeout(() => {
          alert('BINGO! You won 50 credits!');
          startNewGame();
        }, 100);
      }
    }
  }

  // Event Listeners
  if (bingoBoard) {
    bingoBoard.addEventListener('click', (e) => {
      const cell = e.target.closest('.bingo-cell');
      if (cell && drawnNumbers.has(currentBoard[cell.dataset.index])) {
        markedCells.add(parseInt(cell.dataset.index));
        updateBoard();
        
        if (checkWin()) {
          wins++;
          winsDisplay.textContent = wins;
          credits += 50;
          creditsDisplay.textContent = credits;
          setTimeout(() => {
            alert('BINGO! You won 50 credits!');
            startNewGame();
          }, 100);
        }
      }
    });
  }

  if (drawButton) {
    drawButton.addEventListener('click', drawNumber);
  }

  if (newGameButton) {
    newGameButton.addEventListener('click', startNewGame);
  }

  // Initialize the first game
  startNewGame();
}