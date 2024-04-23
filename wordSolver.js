
//JavaScript file for all word solver functions
let currentWord = '';

const getWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(hint)
    document.getElementById("hintDisplay").innerText = hint;
    document.getElementById("poo").innerText = hint;
    console.log(word)
    document.getElementById("displayWord").innerText = word;
    currentWord = word;
    return word;

    console.log(word)
}


const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function createArray(word) {
    console.log(word)
    console.log(currentWord)
    const words_array = [currentWord, "random1", "random2"]; // Only include the word and two random words
    const shuffledArray = shuffle(words_array);
    console.log(words_array)
    document.getElementById('button1').innerText = shuffledArray[0]; // Display word on button1
    document.getElementById('button2').innerText = shuffledArray[1]; // Display random word on button2
    document.getElementById('button3').innerText = shuffledArray[2]; // Display random word on button3

}


const word = getWord();
createArray(word);

