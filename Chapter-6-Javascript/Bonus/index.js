// Get references to DOM elements
const rgbCode = document.getElementById('rgb-code');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const colorOptions = document.getElementById('color-options');
const result = document.getElementById('result');
const playAgainBtn = document.getElementById('play-again');

// Game state
let score = 0;
let lives = 3;

// Start the first round
startRound();

// Function to start a round
function startRound() {
  // Clear previous colors and messages
  colorOptions.innerHTML = '';
  result.textContent = '';

  // Generate target color
  const correctColor = randomRGB();
  rgbCode.textContent = correctColor;

  // Create an array of options including correct color
  const options = [correctColor];
  while (options.length < 3) {
    const newColor = randomRGB();
    if (!options.includes(newColor)) {
      options.push(newColor);
    }
  }

  // Shuffle the options
  shuffleArray(options);

  // Render the color boxes
  options.forEach(color => {
    const box = document.createElement('div');
    box.classList.add('color-box');
    box.style.backgroundColor = color;

    // Add click event
    box.addEventListener('click', () => checkAnswer(color, correctColor));

    colorOptions.appendChild(box);
  });
}

// Generate random RGB color string
function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Check if selected answer is correct
function checkAnswer(selected, correct) {
  if (selected === correct) {
    score++;
    result.textContent = '✅ Correct!';
  } else {
    lives--;
    result.textContent = `❌ Wrong! The correct color was ${correct}`;
  }

  // Update UI
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;

  // Check for game over
  if (lives <= 0) {
    result.textContent = `💀 Game Over! Final Score: ${score}`;
    playAgainBtn.style.display = 'inline-block';
    colorOptions.innerHTML = '';
  } else {
    // Start next round after a short delay
    setTimeout(startRound, 1000);
  }
}

// Shuffle an array (Fisher-Yates algorithm)
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Restart game
playAgainBtn.addEventListener('click', () => {
  score = 0;
  lives = 3;
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  playAgainBtn.style.display = 'none';
  startRound();
});
