import './style.css';
import { createBingoGame } from './bingo.js';

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gray-900 py-8 px-4">
    <div class="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border border-amber-600/20">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2 text-amber-500">Bingo Royal</h1>
        <p class="text-amber-200/60">Get 5 in a row to win!</p>
      </div>
      
      <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div class="stats space-x-4 flex items-center">
          <div class="stat-box">
            <div class="text-amber-200/60 text-sm">Credits</div>
            <div class="text-2xl font-bold text-amber-400" id="credits">100</div>
          </div>
          <div class="stat-box">
            <div class="text-amber-200/60 text-sm">Wins</div>
            <div class="text-2xl font-bold text-amber-400" id="wins">0</div>
          </div>
        </div>
        <button id="newGame" class="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors font-semibold">
          New Game (10 credits)
        </button>
      </div>

      <div class="mb-8">
        <div class="text-amber-200/60 mb-2 text-sm">Game Rules:</div>
        <ul class="text-amber-200/80 text-sm space-y-1 mb-4">
          <li>• Match any row, column, or diagonal</li>
          <li>• Win 50 credits for each BINGO</li>
          <li>• Numbers auto-mark when drawn</li>
          <li>• Click numbers to mark manually</li>
        </ul>
      </div>

      <div id="bingoBoard" class="grid grid-cols-5 gap-2 mb-8"></div>
      
      <div class="text-center space-y-6">
        <button id="drawNumber" class="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-lg hover:from-amber-500 hover:to-orange-500 transition-all transform hover:scale-105 font-semibold">
          Draw Number (5 credits)
        </button>
        <div id="drawnNumber" class="text-3xl font-bold text-amber-400 drawn-number-animation">
          Draw a number to start!
        </div>
        <div id="lastNumbers" class="text-amber-200/60 text-sm">
          Last numbers: <span class="text-amber-400"></span>
        </div>
      </div>
    </div>
  </div>
`;

// Initialize the game after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  createBingoGame();
});