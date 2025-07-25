import { base_sentences } from './sample_quotes.js';

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById("start-button");
  const quoteElement = document.getElementById("quote");
  const typedValue = document.getElementById("typed-value");
  const startInfo = document.getElementById("start-info");
  const quotes = base_sentences;
  let quote;
  let words;

  startButton.addEventListener("click", displayQuote);

  function displayQuote() {
    startInfo.style.display = 'none';
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    words = quote.split(' ');
    quoteElement.textContent = quote;
    typedValue.value = '';
    typedValue.focus();
  }
});