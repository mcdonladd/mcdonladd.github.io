var slideIndex = 0;
var timer;

// Function to show images


// Function to change slide by a specified increment (direction)
function plusDivs(n) {
    showSlides(slideIndex += n);
}
function showSlides() {
    var slides = document.getElementsByClassName("tile");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (slideIndex >= slides.length) {
        slideIndex = 0; // Reset to the first slide if at the end
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1; // Go to the last slide if at the beginning
    }
    slides[slideIndex].style.display = "block";
}
// Function to start automatic scrolling
function startAutoScroll() {
    timer = setInterval(function () {
        plusDivs(1); // Scroll to the next image
    }, 5000); // Change image every 5 seconds
}

// Start automatic scrolling when the page loads
window.onload = function () {
    showSlides(); // Show the first slide immediately
    startAutoScroll();
}

// Pause automatic scrolling when mouse is over the index-content container
document.querySelector('.index-content').addEventListener('mouseover', function () {
    clearInterval(timer);
});

// Resume automatic scrolling when mouse leaves the index-content container
document.querySelector('.index-content').addEventListener('mouseout', function () {
    startAutoScroll();
});
