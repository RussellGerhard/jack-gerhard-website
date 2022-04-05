// Get social icon
const social_icons = document.getElementsByClassName('social');
const primary_social_list = ["images/icons/twitter-icon-200w.png",
                       "images/icons/instagram-icon-200w.png",
                       "images/icons/facebook-icon-200w.png"];
const secondary_social_list = ["images/icons/twitter-icon-secondary-light-200w.png",
                         "images/icons/instagram-icon-secondary-light-200w.png",
                         "images/icons/facebook-icon-secondary-light-200w.png"];

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
for (let i = 0; i < 6; i++) {
    social_icons[i].i = i % 3;
    social_icons[i].addEventListener('mouseenter', handleIconMouseEnter);
    social_icons[i].addEventListener('mouseleave', handleIconMouseLeave);
}