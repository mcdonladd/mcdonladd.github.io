//JavaScript file for all hangman functions

let currentWord = '';

// function that displays hint and retrieves word from word list
const getWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    document.getElementById("hintDisplay").innerText = hint;
    initializeWordDisplay(word);
    currentWord = word;
    return word;
}

// function that takes word and replaces letters with underscores
function initializeWordDisplay(word) {
    const wordDisplay = document.getElementById("displayWord");
    wordDisplay.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        const placeholder = document.createElement('span');
        placeholder.textContent = '_';
        placeholder.classList.add('letter-placeholder');
        wordDisplay.appendChild(placeholder);
    }
}

let wrongGuesses = 0;

// reveals the word based
function revealWord(word) {
    const wordDisplay = document.getElementById("displayWord");
    const placeholders = wordDisplay.getElementsByClassName('letter-placeholder');
    for (let i = 0; i < word.length; i++) {
        placeholders[i].textContent = word[i];
    }
    if (wrongGuesses >= 6) {
        wordDisplay.classList.add('word-lost'); // Add the class for lost animation
    }
}

// reveals the letter based on input / ends game based on number of guesses
function revealLetter(word, guessedLetter) {
    const wordDisplay = document.getElementById("displayWord");
    const placeholders = wordDisplay.getElementsByClassName('letter-placeholder');
    let found = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guessedLetter) {
            placeholders[i].textContent = guessedLetter;
            found = true;
        }
    }
    if (!found) {
        wrongGuesses++;
        document.getElementById("hangmanImage").src = "images/hangman-" + wrongGuesses + ".svg";
    }

    let revealedLetters = 0;
    for (let i = 0; i < placeholders.length; i++) {
        if (placeholders[i].textContent !== '_') {
            placeholders[i].classList.add('animated');
            revealedLetters++;
        }
    }

    if (revealedLetters === placeholders.length && wrongGuesses < 6) {
        wordDisplay.classList.add('word-revealed');
        setTimeout(() => {
            const playAgain = confirm("YOU WIN! Do you want to play again?");
            if (playAgain) {
                resetGame();
            }
        }, 1000);
    }

    if (wrongGuesses >= 6) {
        revealWord(word);
        setTimeout(() => {
            endCount();
        }, 1000);
    }
}


// disables keyboard button of guessed letters
document.querySelectorAll('.keyboard button').forEach(button => {
    button.addEventListener('click', () => {
        const key = button.textContent.toLowerCase();
        if (key === 'enter') {
            var inputText = document.getElementById("wordInput").textContent;
            addGuessedWord(inputText);
            document.getElementById("wordInput").textContent = "";
        } else if (key === 'del') {
            document.getElementById("wordInput").textContent = "";
        } else {
            const wordInput = document.getElementById("wordInput");
            wordInput.textContent += key;
            revealLetter(currentWord, key);
            if (!isCorrectLetter(currentWord, key)) {
                button.disabled = true;
                button.classList.add('disabled');
            }
        }
    });
});

// word contains letter
function isCorrectLetter(word, guessedLetter) {
    return word.includes(guessedLetter);
}