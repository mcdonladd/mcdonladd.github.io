//JavaScript file for all wordShuffle functions

let score = 0;

function addGuessedWord(word) {
    var paragraph = document.createElement("p");
    paragraph.textContent = word;
    paragraph.style.margin = "5px 0";
    paragraph.style.padding = "5px 10px";
    paragraph.style.backgroundColor = "#809bce";
    paragraph.style.borderRadius = "5px";
    paragraph.style.fontStyle = "Cheltenham";
    document.getElementById("guessedWords").appendChild(paragraph);
    score += word.length;
    document.getElementById("scoreValue").textContent = score;
}

let randomLetters = '';

function generateRandomLetters() {
    const vowels = 'AEIOU';
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
    const uniqueLetters = new Set();
    while (uniqueLetters.size < 3) {
        const randomIndex = Math.floor(Math.random() * vowels.length);
        const randomVowel = vowels[randomIndex];
        uniqueLetters.add(randomVowel);
    }
    while (uniqueLetters.size < 8) {
        const randomIndex = Math.floor(Math.random() * consonants.length);
        const randomConsonant = consonants[randomIndex];
        uniqueLetters.add(randomConsonant);
    }
    const randomLetters = Array.from(uniqueLetters).join('');
    return randomLetters;
}

function updateGrid() {
    randomLetters = generateRandomLetters();
    const grid = document.getElementById("grid");
    grid.innerHTML = '';
    randomLetters.split('').forEach(letter => {
        const div = document.createElement('div');
        div.textContent = letter;
        div.classList.add('animated');
        grid.appendChild(div);
    });
}

// Add event listener to the keyboard buttons
document.querySelectorAll('.keyboard button').forEach(button => {
    button.addEventListener('click', () => {
        const key = button.textContent.toLowerCase(); // Get the lowercase letter of the button
        if (key === 'enter') {
            // Handle the Enter key press
            submitWord();
        } else if (key === 'del') {
            // Handle the Delete key press, clear the input field
            clearInput();
        } else {
            // For other keys, append the character to the input field
            appendToInput(key);
        }
    });
});

// Function to append a character to the input field
function appendToInput(character) {
    const inputField = document.getElementById('wordInput');
    inputField.value += character;
}

// Function to clear the input field
function clearInput() {
    const inputField = document.getElementById('wordInput');
    inputField.value = '';
}

// Function to submit the word
function submitWord() {
    const inputField = document.getElementById('wordInput');
    const word = inputField.value.trim().toLowerCase();
    if (word.length > 0) {
        if (isValidInput(word)) {
            addGuessedWord(word);
            clearInput();
        } else {
            alert('Invalid word! Please use only the provided letters.');
            clearInput();
        }
    }
}

// Function to check if the input word is valid
function isValidInput(word) {
    const inputLetters = word.split('');
    const randomLettersArray = randomLetters.toLowerCase().split('');
    return inputLetters.every(letter => randomLettersArray.includes(letter));
}

// Event listener for Enter key press
document.getElementById('wordInput').addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        submitWord();
    }
});
