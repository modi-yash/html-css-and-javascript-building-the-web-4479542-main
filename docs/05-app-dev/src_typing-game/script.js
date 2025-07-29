import { base_sentences } from './sample_quotes.js';

document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    quote: document.getElementById("quote"),
    typedValue: document.getElementById("typed-value"),
    startInfo: document.getElementById("start-info")
  };
  const settings = {
    musicToggle: false,
    sfxToggle: false,
    volume: 0.10,
    difficulty: 'normal'
  };
  const buttons = {
    startButton: document.getElementById("start-button"),
    musicButton: document.getElementById("music-button"),
    sfxButton: document.getElementById("sfx-button")
  };
  const quotes = base_sentences;
  let tensionAudio;
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
    if (elements.typedValue.value === (words[wordsIndex] + " ")) {
      // The typed value matches the current word
      elements.typedValue.value = '';
      // Removes highlight from current word
      let wordElement = document.getElementById(`word${wordsIndex}`);
      wordElement.classList.remove("highlight");
      wordsIndex += 1;
      // Finds the element of the next word in the quote and highlights it
      wordElement = document.getElementById(`word${wordsIndex}`);
      wordElement.classList.add("highlight");
      elements.typedValue.classList.remove('error');
    } else if (wordsIndex === words.length - 1 && elements.typedValue.value.trim() === words[wordsIndex]) {
      // End of game!
      elements.typedValue.classList.remove('error');
      endGame();
    } else {
      if (elements.typedValue.value !== '' && !words[wordsIndex].startsWith(elements.typedValue.value)) {
        elements.typedValue.classList.add('error');
      } else {
        elements.typedValue.classList.remove('error');
      }
    }
  }

  function startGame(e) {
    if (settings.musicToggle) playTenseAudio();
    // Deletes the information displayed at start of every game
    elements.quote.style.display = 'block';
    elements.startInfo.style.display = 'none';
    // Decides which quote is chosen
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    words = quote.split(' ');
    let wordsSpan = words.map(function (word, index) { return `<span id='word${index}' class='word'>${word} </span>` });
    wordsSpan[wordsSpan.length - 1] = wordsSpan.at(-1).trim();
    elements.quote.innerHTML = wordsSpan.join('');
    document.getElementById("word0").classList.add("highlight");
    wordsIndex = 0;
    elements.typedValue.value = '';
    elements.typedValue.focus();
    elements.typedValue.addEventListener('input', checkInput);
  }

  function playWinAudio() {
    if (tensionAudio) { //turns off audio
      tensionAudio.pause();
      tensionAudio.currentTime = 0;
    }
    const winAudio = new Audio('./Audio/tada/tada.mp3');
    winAudio.volume = settings.volume;
    winAudio.play();
  }
  function playTenseAudio() {
    if (tensionAudio) { //turns off the audio if its already playing
      tensionAudio.pause();
      tensionAudio.currentTime = 0;
    }
    tensionAudio = new Audio(`./Audio/tension/tension (${Math.floor(Math.random() * 7)}).mp3`)
    tensionAudio.volume = settings.volume;
    tensionAudio.play();
  }

  function endGame() {
    if (settings.sfxToggle) playWinAudio();
    elements.typedValue.removeEventListener('input', checkInput);
    elements.typedValue.blur();
    elements.typedValue.value = '';
    elements.quote.style.display = 'none';
    gameActive = false;
    const passedTime = (new Date().getTime() - startTime) / 1000;
    const message = `CONGRATULATIONS! You finished ${words.length} words in ${passedTime} seconds.\nThat gives you an average words per minute of ${(Math.floor(words.length / (passedTime) * 6000) / 100)}.`;
    elements.startInfo.innerText = message;
    elements.startInfo.style.display = 'block';
    elements.quote.innerHTML = '';
  }

  function toggleMusic() {
    settings.musicToggle = !settings.musicToggle;
    if (settings.musicToggle) { // music is turned on
      buttons.musicButton.style.backgroundColor = 'rgb(0, 85, 25)';
    } else { //music is turned off
      buttons.musicButton.style.backgroundColor = 'rgb(255, 69, 69)';
      if (gameActive) {
        tensionAudio.pause();
        tensionAudio.currentTime = 0;
      }
    }
  }
  function toggleSfx() {
    settings.sfxToggle = !settings.sfxToggle;
    if (settings.sfxToggle) { // sfx is turned on
      buttons.sfxButton.style.backgroundColor = 'rgb(0, 85, 25)';
    } else { // sfx is turned off
      buttons.sfxButton.style.backgroundColor = 'rgb(255, 69, 69)';
    }
  }

  buttons.startButton.addEventListener("click", startGame);
  buttons.musicButton.addEventListener("click", toggleMusic);
  buttons.sfxButton.addEventListener("click", toggleSfx);
  // End of all
});
