//JavaScript file for all utility functions

//opens side nav bar
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";

}

//closes side nav bar
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";

}

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

function resetGame() {
    location.reload();
}

function endCount() {
    timeH.innerHTML = "Time out";
    document.getElementById("wordInput").disabled = true;
    document.querySelector(".keyboard").style.display = "none";
    setTimeout(() => {
        const playAgain = confirm("Game Over! Do you want to play again?");
        if (playAgain) {
            resetGame();
        }
    }, 1000);
}