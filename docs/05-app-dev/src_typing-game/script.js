import { base_sentences } from './sample_quotes.js';

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById("start-button");
  const quoteElement = document.getElementById("quote");
  const typedValue = document.getElementById("typed-value");
  const startInfo = document.getElementById("start-info");
  const quotes = base_sentences;
  let quote;
  let words;
  let gameActive = false;
  let wordsIndex = 0;
  let startTime;

  function checkInput(e) {
    // Starts game if its not active.
    if (!gameActive) {
      gameActive = true;
      startTime = new Date().getTime();
    }
    if (typedValue.value === (words[wordsIndex] + " ")) {
      // The typed value matches the current word
      typedValue.value = '';
      // Removes highlight from current word
      let wordElement = document.getElementById(`word${wordsIndex}`);
      wordElement.classList.remove("highlight");
      wordsIndex += 1;
      // Finds the element of the next word in the quote and highlights it
      wordElement = document.getElementById(`word${wordsIndex}`);
      wordElement.classList.add("highlight");
    } else if (wordsIndex === words.length - 1 && typedValue.value.trim() === words[wordsIndex]) {
      // End of game!
      endGame();
    } else {
      if (typedValue.value !== '' && !words[wordsIndex].startsWith(typedValue.value)) {
        typedValue.classList.add('error');
      } else {
        typedValue.classList.remove('error');
      }
    }
  }

  function startGame(e) {
    // Deletes the information displayed at start of every game
    quoteElement.style.display = 'block';
    startInfo.style.display = 'none';
    // Decides which quote is chosen
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    words = quote.split(' ');
    let wordsSpan = words.map(function (word, index) { return `<span id='word${index}'>${word} </span>` });
    wordsSpan[wordsSpan.length - 1] = wordsSpan.at(-1).trim();
    quoteElement.innerHTML = wordsSpan.join('');
    document.getElementById("word0").classList.add("highlight");
    wordsIndex = 0;
    typedValue.value = '';
    typedValue.focus();
    typedValue.addEventListener('input', checkInput);
  }

  startButton.addEventListener("click", startGame);

  function endGame() {
    typedValue.removeEventListener('input', checkInput);
    typedValue.blur();
    typedValue.value = '';
    quoteElement.style.display = 'none';
    gameActive = false;
    const passedTime = (new Date().getTime() - startTime) / 1000;
    const message = `CONGRATULATIONS! You finished in ${passedTime} seconds.`;
    startInfo.innerText = message;
    startInfo.style.display = 'block';
    quoteElement.innerHTML = '';
  }
});
