// Nav elements and pages
const nav_links = document.getElementsByClassName('mobile-nav-text');
const mobile_nav_checkbox = document.getElementById('side-menu');
const mobile_nav_checkbox_label = document.getElementsByClassName('hamb')[0];
const mobile_nav = document.getElementById('mobile-nav');
const pages = document.getElementsByClassName('site-page');
const num_pages = pages.length;
let current_page_index = 0;

// Prevent scrolling in mobile nav
function handleHambClick() {
    // If we're in mobile nav, we're about to leave so add back the scroll
    if (mobile_nav_checkbox.checked) {
      document.body.classList.remove('no-scroll');
    // Else we're entering nav so take away scroll
    } else {
      document.body.classList.add('no-scroll');

    }
}

// Navigate to a new page on nav click
function handleNavLinkClick() {

    // We're using mobile navigation and must remove overlay and add back scroll
    if (mobile_nav_checkbox.checked) {
        mobile_nav_checkbox.checked = false;
        document.body.classList.remove('no-scroll');
    }

    if (this.i !== current_page_index) {
        pages[current_page_index].classList.add('hidden');
        pages[this.i].classList.remove('hidden');
        current_page_index = this.i;
    }
}

// Listen for hamburger click
mobile_nav_checkbox_label.addEventListener('click', handleHambClick);

// Listen for navigation click
for (let i = 0; i < num_pages; i++) {
    nav_links[i].i = i;
    nav_links[i].addEventListener('click', handleNavLinkClick);
};