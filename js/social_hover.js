// Decide how to treat social icons based on mobile or desktop layout
let mq2 = window.matchMedia( '(min-width: 1024px)' );

// Get social icon
const social_icons = document.getElementsByClassName('social');
const primary_social_list = ["images/icons/instagram-icon-200w-cmp.png",
                             "images/icons/facebook-icon-200w-cmp.png"];
const secondary_social_list = ["images/icons/instagram-icon-secondary-light-200w-cmp.png",
                               "images/icons/facebook-icon-secondary-light-200w-cmp.png"];

// Change source to light social on hover                         
function handleIconMouseEnter() {
    this.src = secondary_social_list[this.i];
    this.classList.add('bounce');
}

// Change source back when mouse leaves
function handleIconMouseLeave() {
    this.src = primary_social_list[this.i];
    this.classList.remove('bounce');
}

// Listen for mouse enter and exit to change source image
if (mq.matches) {
    for (let i = 0; i < 4; i++) {
        social_icons[i].i = i % 2;
        social_icons[i].addEventListener('mouseenter', handleIconMouseEnter);
        social_icons[i].addEventListener('mouseleave', handleIconMouseLeave);
    }
}