import { base_sentences } from './sample_quotes.js';

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById("start-button");
  const quoteElement = document.getElementById("quote");
  const typedValue = document.getElementById("typed-value");
  const startInfo = document.getElementById("start-info");
  const quotes = base_sentences;
  let gameActive = false;
  let wordsIndex = 0;

  function checkInput(e) {
    if (!gameActive) gameActive = true;
    if (typedValue.value === (words[wordsIndex] + " ")) {
      typedValue.value = '';
      console.log(words[wordsIndex]);
      wordsIndex += 1;
    } else if (wordsIndex === words.length - 1 && typedValue.value.trim() === words[wordsIndex]) {
      gameActive = false;
      typedValue.removeEventListener('input');
    } else if ( !words[wordsIndex].startsWith( typedValue.value ) ) {
      
    }
  }

  function displayQuote(e) {
    // Deletes the information displayed at start of every game
    startInfo.style.display = 'none';
    // Decides which quote is chosen
    var quote = quotes[Math.floor(Math.random() * quotes.length)];
    var words = quote.split(' ');
    let wordsSpan = words.map(function (word) { return `<span>${word} </span>` });
    wordsSpan[wordsSpan.length - 1] = wordsSpan.at(-1).trim();
    quoteElement.innerHTML = wordsSpan.join('');
    wordsIndex = 0;
    typedValue.value = '';
    typedValue.focus();
    typedValue.addEventListener('input', checkInput);
  }

  startButton.addEventListener("click", displayQuote);

});
