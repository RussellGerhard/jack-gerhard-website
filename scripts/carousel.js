const carousels = document.getElementsByClassName("carousel");
const prevButtonList = document.getElementsByClassName("carousel-prev");
const nextButtonList = document.getElementsByClassName("carousel-next");
const numberOfCarousels = carousels.length;
let positions = new Array(numberOfCarousels).fill(0);
const numSlides = [4,4];

function handleMoveToPrevSlide() {
    // Get carousel's content items and make the current one hidden
    carousels[this.i].children[0].children[positions[this.i]].classList.remove("carousel-item-visible");
    // Get carousel's tabs and style the current as inactive 
    carousels[this.i].children[1].children[positions[this.i]].classList.remove("active-tab");

    // Check if this was the first slide in the carousel
    if (positions[this.i] === 0) {
        positions[this.i] = numSlides[this.i] - 1;
    } else {
        positions[this.i] = positions[this.i] - 1;
    }

    // Make current slide visible
    carousels[this.i].children[0].children[positions[this.i]].classList.add('carousel-item-visible');
    // Activate tab of current slide
    carousels[this.i].children[1].children[positions[this.i]].classList.add('active-tab');
}

function handleMoveToNextSlide() {
    // Get carousel's content items and make the current one hidden
    carousels[this.i].children[0].children[positions[this.i]].classList.remove("carousel-item-visible");
    // Get carousel's tabs and style the current as inactive 
    carousels[this.i].children[1].children[positions[this.i]].classList.remove("active-tab");

    // Check if this was the last slide in the carousel
    if (positions[this.i] === numSlides[this.i] - 1) {
        positions[this.i] = 0;
    } else {
        positions[this.i] = positions[this.i] + 1;
    }

    // Make current slide visible
    carousels[this.i].children[0].children[positions[this.i]].classList.add('carousel-item-visible');
    // Activate tab of current slide
    carousels[this.i].children[1].children[positions[this.i]].classList.add('active-tab');
}

for (let i = 0; i < numberOfCarousels; i++){
    prevButtonList[i].i = i;
    nextButtonList[i].i = i;
    // prevButtonList[i].addEventListener("touchstart", handleMoveToPrevSlide);
    // nextButtonList[i].addEventListener("touchstart", handleMoveToNextSlide);
    prevButtonList[i].addEventListener("click", handleMoveToPrevSlide);
    nextButtonList[i].addEventListener("click", handleMoveToNextSlide);
};