import { base_sentences } from './sample_quotes.js';

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById("start-button");
  const quote = document.getElementById("quote");
  const typedValue = document.getElementById("typed-value");
  const startInfo = document.getElementById("start-info");
  const quotes = base_sentences;

  startButton.addEventListener("click", displayQuote);

  function displayQuote() {
    startInfo.style.display = 'none';
    quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    typedValue.focus();
  }
});