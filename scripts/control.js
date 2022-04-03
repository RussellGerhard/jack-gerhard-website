const nav_links = document.getElementsByClassName('mobile-nav-text');
const pages = document.getElementsByClassName('site-page');
const num_pages = pages.length;
let current_page_index = 0;

function handleNavClick() {
    if (this.i !== current_page_index) {
        pages[current_page_index].classList.add('hidden');
        pages[this.i].classList.remove('hidden');
        current_page_index = this.i;
    }
}

for (let i = 0; i < num_pages; i++) {
    nav_links[i].i = i;
    nav_links[i].addEventListener('click', handleNavClick);
};