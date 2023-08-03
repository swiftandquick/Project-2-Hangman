import { word_list as words } from './wordList.js';

const start = document.querySelector("#start");
const img = document.querySelector("img");
const msg = document.querySelector("#msg");
const word = document.querySelector("#word");
const letters = document.querySelectorAll(".letter");

let count = 0;
let secretWord, displayWord; 

function newGame() {
    count = 0;
    img.src = `img/${count}.bmp`;
    for(const letter of letters) {
        letter.disabled = false;
    }
    secretWord = words[Math.floor(Math.random() * words.length)];
    displayWord = secretWord.replace(/\w/g, '_');
    msg.textContent = `Please choose a letter.`;
    word.textContent = displayWord;
}

function guess() {
    this.disabled = true;
    let indexes = [];
    for (let i = 0; i < secretWord.length; i++) {
        if (this.value === secretWord[i]) {
            indexes.push(i);
        }
    }
    if (indexes.length > 0) {
        for (let index of indexes) {
            displayWord = displayWord.substring(0, index) + this.value + displayWord.substring(index + 1);
        }
        msg.textContent = `${this.value} is a letter in the secret word!`;
    }
    else {
        count++;
        img.src = `img/${count}.bmp`;
        msg.textContent = `${this.value} is not a letter in the secret word!`;
    }
    word.textContent = displayWord;
    if (displayWord.indexOf('_') < 0) {
        for(const letter of letters) {
            letter.disabled = true;
        }
        msg.textContent = "Congrations, you won!  Do you want to play again?";
    }
    if (count === 10) {
        for(const letter of letters) {
            letter.disabled = true;
        }
        msg.textContent = `You lost!  The secret word is ${secretWord}.  Do you want to play again?`;
    }
}

start.addEventListener("click", newGame);

for (const letter of letters) {
    letter.addEventListener("click", guess);
}