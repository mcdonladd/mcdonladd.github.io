var slideIndex = 0;
var timer;

// Function to show images

// adapted from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_auto


// Function to change slide by a specified increment (direction)
function plusDivs(n) {
    showSlides(slideIndex += n);
}


function showSlides() {
    var slides = document.getElementsByClassName("tile");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.transition = "transform 0.3s ease-in-out"; // transition effect
        slides[i].style.transform = "scale(1) translateY(0)"; // reset
    }
    if (slideIndex >= slides.length) {
        slideIndex = 0; // to the first slide if at the end
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1; // to the last slide if at the beginning
    }
    slides[slideIndex].style.transform = "scale(1.2) translateY(-10px)"; // jump effect
    setTimeout(function() {
        slides[slideIndex].style.transform = "scale(1) translateY(0)"; // reset after a few seconds
        slideIndex++;
        showSlides();
    }, 3000); //display each slide for 3 seconds
}


// function to start automatic scrolling
function startAutoScroll() {
    timer = setInterval(function () {
        plusDivs(1);
    }, 5000); // Change image every 5 seconds
}

// start automatic scrolling when the page loads
window.onload = function () {
    showSlides();
    startAutoScroll();
}

