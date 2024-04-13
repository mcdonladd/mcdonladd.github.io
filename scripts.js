//adding a comment here

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}


//keyboard functionality



//Word functions//

let currentWord = '';

//gets word from word list and displays
const getWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("Random Word:", word);
    document.getElementById("hintDisplay").innerText = hint;

    initializeWordDisplay(word)

    currentWord = word;

    return word;
}

//initialize the display of the random word with hidden placeholders
function initializeWordDisplay(word) {
    const wordDisplay = document.getElementById("displayWord");
    //clear previous content
    wordDisplay.innerHTML = '';
    //loop through the word, creating a placeholder for each
    for (let i = 0; i < word.length; i++) {
        const placeholder = document.createElement('span');
        placeholder.textContent = '_'; //display as underscores
        placeholder.classList.add('letter-placeholder'); // Add a class for styling
        wordDisplay.appendChild(placeholder);
    }
}

let wrongGuesses = 0;

function revealLetter(word, guessedLetter){
    const wordDisplay = document.getElementById("displayWord");
    const placeholders = wordDisplay.getElementsByClassName('letter-placeholder');
    let found = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guessedLetter) {
            placeholders[i].textContent = guessedLetter;
            found = true;
        }
    }
    if (!found){
        wrongGuesses++;
        document.getElementById("wrongGuesses").textContent = wrongGuesses;
        document.getElementById("hangmanImage").src = "images/hangman-" + wrongGuesses + ".svg";
    } else {
        // Disable the button corresponding to the guessed letter
        const button = document.querySelector('.keyboard button[data-letter="' + guessedLetter + '"]');
        if (button) {
            button.disabled = true;
        }
    }

    // Count the number of revealed letters
    let revealedLetters = 0;
    for (let i = 0; i < placeholders.length; i++) {
        if (placeholders[i].textContent !== '_') {
            revealedLetters++;
        }
    }

    // Check if all letters in the word have been revealed
    if (revealedLetters === word.length) {
        const playAgain = confirm("YOU WIN! Do you want to play again?");
        if (playAgain) {
            resetGame();
        }
    }

    if (wrongGuesses >= 6){
        document.getElementById("hangmanImage").src = "images/hangman-" + 6 + ".svg";
        endCount()
    }
}











let score = 0; // Initialize score variable

//takes guessed words and adds it to display
function addGuessedWord(word) {
    // Create a new paragraph element
    var paragraph = document.createElement("p");
    // Set the text content to the guessed word
    paragraph.textContent = word;
    // Add the guessed-word class to the paragraph
    paragraph.style.margin = "5px 0";
    paragraph.style.padding = "5px 10px";
    paragraph.style.backgroundColor = "#809bce";
    paragraph.style.borderRadius = "5px";
    paragraph.style.fontStyle = "Cheltenham";
    // Append the paragraph to the guessedWords div
    document.getElementById("guessedWords").appendChild(paragraph);

    // Increment the score
    score += word.length;

    // Update the score display
    document.getElementById("scoreValue").textContent = score;
}


//gets word from input and checks it is valid
document.getElementById("wordInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        var inputText = document.getElementById("wordInput").value;
        // Check if the input word contains only the provided letters
        if (isValidInput(inputText)) {
            // Check if the input word is valid
            isValidWord(inputText)
                .then(isValid => {
                    if (isValid) {
                        // If the word is valid, add it to the list of guessed words
                        addGuessedWord(inputText);
                    } else {
                        // If the word is not valid, display a pop-up message
                        alert("Invalid word! Please enter a valid word.");
                    }
                })
                .catch(error => console.error('Error checking word validity:', error));
        } else {
            // If the input contains invalid characters, display a pop-up message
            alert("Use only the provided letters.");
        }
        // Clear the input field
        document.getElementById("wordInput").value = "";
    }
});


//checks that input is valid
function isValidInput(inputText) {
    // Convert the input text and random letters to lowercase for case-insensitive comparison
    const inputLetters = inputText.toLowerCase().split('');
    const randomLettersArray = randomLetters.toLowerCase().split('');
    // Check if every character in the input text is included in the random letters
    return inputLetters.every(letter => randomLettersArray.includes(letter));
}


//checks that the word is valid
function isValidWord(word) {
    // Make a request to the dictionary API endpoint for the word
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            // Check if the response status is OK (200)
            if (response.ok) {
                // The word exists in the dictionary
                return true;
            } else {
                // The word does not exist in the dictionary
                return false;
            }
        })
        .catch(error => {
            console.error('Error checking word validity:', error);
            return false; // Assuming any error means the word is not valid
        });
}

let randomLetters = '';

// Function to generate a random set of 8 letters
function generateRandomLetters() {
    const vowels = 'AEIOU';
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
    const uniqueLetters = new Set(); // Set to store unique letters

    // Add three random vowels
    while (uniqueLetters.size < 3) {
        const randomIndex = Math.floor(Math.random() * vowels.length);
        const randomVowel = vowels[randomIndex];
        uniqueLetters.add(randomVowel);
    }

    // Add five random consonants
    while (uniqueLetters.size < 8) {
        const randomIndex = Math.floor(Math.random() * consonants.length);
        const randomConsonant = consonants[randomIndex];
        uniqueLetters.add(randomConsonant);
    }

    // Convert set to array and then join to form a string
    const randomLetters = Array.from(uniqueLetters).join('');
    return randomLetters;
}

//function to update the grid with the random letters
function updateGrid() {
    randomLetters = generateRandomLetters();
    const grid = document.getElementById("grid");
    grid.innerHTML = ''; // Clear previous content
    randomLetters.split('').forEach(letter => {
        const div = document.createElement('div');
        div.textContent = letter;
        div.classList.add('animated');
        grid.appendChild(div);
    });
}


//keyboard functionality
document.querySelectorAll('.keyboard button').forEach(button => {
    button.addEventListener('click', () => {
        const key = button.textContent.toLowerCase(); //lowercase letter of the button
        if (key === 'enter') {
            //enter key
            var inputText = document.getElementById("wordInput").value;
            addGuessedWord(inputText);
            document.getElementById("wordInput").value = "";
        } else if (key === 'del') {
            //delete key
            document.getElementById("wordInput").value = "";
        } else {
            //add keys
            document.getElementById("wordInput").value += key;
            revealLetter(currentWord, key);
        }



    });
});


//timer functionality
let timeSecond = 120;
const timeH = document.querySelector("h2");

const countDown = setInterval(() => {
    timeSecond--;
    displayTime(timeSecond);
    if (timeSecond == 0 || timeSecond < 1) {
        endCount();
        clearInterval(countDown);
    }
}, 1000);

function displayTime(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timeH.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
}


//function that ends the game
function endCount() {
    timeH.innerHTML = "Time out";

    // Disable the input field
    document.getElementById("wordInput").disabled = true;

    // Hide the keyboard
    document.querySelector(".keyboard").style.display = "none";

    const playAgain = confirm("Game Over! Do you want to play again?");
    if (playAgain) {
        // Code to reset the game or navigate to the start of a new game
        resetGame();
    }

}

function resetGame() {
    location.reload(); // Refresh the page
}

