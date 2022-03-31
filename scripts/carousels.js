const carousels = document.getElementsByClassName("carousel");
const titles = document.getElementsByClassName("title");
const roles = document.getElementsByClassName("role");
const prevButtonList = document.getElementsByClassName("carousel-prev");
const nextButtonList = document.getElementsByClassName("carousel-next");

// The (theoretical) "model" of the "state" of our carousels #MVC
const numberOfCarousels = carousels.length;
let positions = new Array(numberOfCarousels).fill(0);
const numSlides = [3,3,2,4,3,9]

// The (theoretical) "control"

// Helper function to update show title and role below carousels
function changeShowText(index) {
    // Only change text when transitioning to different show
    // Don't want to reload text every time (multiple photos for same show)
    if (index == 3) {
        if (positions[3] === 0 || positions[3] === 1) {
            titles[index].classList.remove('title-small-font')
            titles[index].textContent = 'Jesus Christ Superstar';
            roles[index].textContent = 'Jesus';
        } else if (positions[3] === 2 || positions[3] === 3) {
            titles[index].classList.add('title-small-font')
            titles[index].textContent = "A Gentleman's Guide to Love and Murder";
            roles[index].textContent = 'Man #1';
        }
    } else if (index == 4) {
        if (positions[4] === 0 || positions[4] === 1) {
            titles[index].textContent = 'Life Could Be A Dream';
            roles[index].textContent = 'Eugene';
        } else if (positions[4] === 2) {
            titles[index].textContent = 'Smoke On The Mountain';
            roles[index].textContent = 'Dennis';
        }
    } else if (index == 5) {
        if (positions[5] === 0 || positions[5] === 1) {
            titles[index].textContent = 'Oklahoma';
            roles[index].textContent = 'Curly';
        } else if (positions[5] === 2 || positions[5] === 3 || positions[5] === 4) {
            titles[index].textContent = 'Heathers';
            roles[index].textContent = 'Kurt';
        } else if (positions[5] === 5 || positions[5] === 6 || positions[5] === 7) {
            titles[index].textContent = 'Bonnie & Clyde';
            roles[index].textContent = 'Buck';
        } else if (positions[5] === 8) {
            titles[index].textContent = 'Assassins';
            roles[index].textContent = 'Leon Czolgoz';
        }
    }
}

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

    // Update show title and role
    changeShowText(this.i);

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

    // Update show title and role
    changeShowText(this.i);

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