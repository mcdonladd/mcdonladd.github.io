

document.addEventListener("DOMContentLoaded", function() {

    // gets word from hint and word from word list
    const getWord = () => {
        const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
        document.getElementById("hintDisplay").innerHTML = `<p>Hint: ${hint}</p>`;
        return { word, hint };
    };

    // correct or incorrect
    document.querySelectorAll('.wordButton').forEach(button => {
        button.addEventListener('click', function() {
            const correctWord = wordObj.word;
            selectedWord = this.innerText
            if (selectedWord === correctWord) {
                alert('Correct! You win!');
                setTimeout(() => { location.reload(true); }, 1000);
            } else {
                alert(`Incorrect! The correct word is: ${correctWord}. Try again.`);
                setTimeout(() => { location.reload(true); }, 1000);
            }
        });
    });

    // shuffles array to display words in random order
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // creates array with the word and 2 random from word list
    function createArray(wordObj) {
        const word = wordObj.word;
        const filteredWords = wordList.filter(item => item.word !== word);
        const randomWords = [];
        for (let i = 0; i < 2; i++) {
            randomWords.push(filteredWords[Math.floor(Math.random() * filteredWords.length)].word);
        }
        const options = randomWords.concat(word);
        const shuffledOptions = shuffle(options);
        document.getElementById('button1').innerText = shuffledOptions[0];
        document.getElementById('button2').innerText = shuffledOptions[1];
        document.getElementById('button3').innerText = shuffledOptions[2];
    }

    const wordObj = getWord();
    createArray(wordObj);
});
