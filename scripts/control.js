// ********** NAV AND PAGE ELEMENTS **********
const nav_links = document.getElementsByClassName('mobile-nav-text');
const mobile_nav_checkbox = document.getElementById('side-menu');
const mobile_nav_checkbox_label = document.getElementsByClassName('hamb')[0];
const mobile_nav = document.getElementById('mobile-nav');
const pages = document.getElementsByClassName('site-page');
const num_pages = pages.length;
let current_page_index = 0;


// ********** HOME PAGE ELEMENTS **********
// Apparently a better alternative to autoplay attribute (using for desktop)
const buddy_video = document.getElementById('buddy-holly');
let autoplayed = false;

// Decide how to treat video based on mobile or desktop layout
let width = document.documentElement.clientWidth;
const mq = window.matchMedia( '(min-width: 1024px)' );


// ********** PRODUCTION PAGE ELEMENTS **********
const carousels = document.getElementsByClassName("carousel");
const titles = document.getElementsByClassName("title");
const roles = document.getElementsByClassName("role");
const prevButtonList = document.getElementsByClassName("carousel-prev");
const nextButtonList = document.getElementsByClassName("carousel-next");
const numberOfCarousels = carousels.length;
let positions = new Array(numberOfCarousels).fill(0);
const numSlides = [3,3,2,4,3,9]


// ********** VIDEOS PAGE ELEMENTS **********
const text_overlays = document.getElementsByClassName('video-overlay');
const screen_overlays = document.getElementsByClassName('video-screen-overlay');
const videos = document.getElementsByClassName('overlayed-video');
const num_videos = videos.length;


// ********** MUSIC PAGE ELEMENTS **********
// Get HTML audio element and its source
const audio = document.getElementById('audio');
const audioSource = document.getElementById('audio-source');

// Get HTML element displaying current title
const currentTitle = document.getElementById('current-title-display');

// Get lists of HTML song display divs and boxes w/ track numbers
const songDisplays = document.getElementsByClassName('song-display');
const playBoxNumbers = document.getElementsByClassName('play-box-number');

// Constants for changing source, title
const sources = ["audio/01 - Jack Gerhard - Roseanne.mp3",
                 "audio/02 - Jack Gerhard - One Last Time.mp3",
                 "audio/03 - Jack Gerhard - Can't Slow Down.mp3"];
const song_titles = ["Roseanne", "One Last Time", "Can't Slow Down"];

// Keep track of state of player
let currentSongIndex = -1;
let isPaused = false;


// ********** NAV FUNCTIONS **********
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

// Pause and play music on spacebar as well
function handleSpaceBar(e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32){
    e.preventDefault();
    if (currentSongIndex >= 0) {
      if (isPaused) {
      // Remove pause icon, add play icon
      playBoxNumbers[currentSongIndex].classList.remove('fa-play');
      playBoxNumbers[currentSongIndex].classList.add('fa-pause');
      // Resume track
      audio.play();
      isPaused = false;
      } else {
      // Remove play icon, add pause icon
      playBoxNumbers[currentSongIndex].classList.remove('fa-pause');
      playBoxNumbers[currentSongIndex].classList.add('fa-play');
      // Pause track
      audio.pause();
      isPaused = true;
      }
    }
  }
}


// ********** HOME PAGE FUNCTIONS **********
// Autoplay once (function for desktop)
function autoplay() {
    console.log(autoplayed);
    if (!autoplayed) {
        buddy_video.play();
        autoplayed = true;
    };
}

// Autoplay when video slides into view on mobile
// OG source for this code: https://benfrain.com/automatically-play-and-pause-video-as-it-enters-and-leaves-the-viewport-screen/
// The idea here is to create a virtual observer that tells us when our video is at least 80% of the viewport.
// I'll use this for mobile scrolling since the headshot is stacked on the video, I don't want it autoplay on load (like desktop)
function handleMobileVideoViewIntersection() {
    let play_promise = buddy_video.play();
    if (play_promise !== undefined) {
        play_promise.then(() => {
            let observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.intersectionRatio !== 1 && !buddy_video.paused) {
                            buddy_video.pause();
                        } else if (entry.intersectionRatio > 0.9 && buddy_video.paused) {
                            buddy_video.play();
                        }
                    });
                },
                { threshold: 0.9 }
            );
            observer.observe(buddy_video);
        });
    }
}

// Handle desktop click to pause/play video
function handleVideoClick() {
    if (!buddy_video.paused) {
        buddy_video.play();
    } else {
        buddy_video.pause();
    };
}


// ********** PRODUCTION PAGE FUNCTIONS **********
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


// ********** VIDEOS PAGE FUNCTIONS **********
function toggleControls(video) {
    if (video.hasAttribute("controls")) {
        video.removeAttribute("controls");
    } else {
        video.setAttribute("controls", "controls");
    }
}

function handleOverlayClick() {
    for (let j = 0; j < num_videos; j++) {
        if (this.i == j) {
            this.classList.add('hidden');
            screen_overlays[j].classList.add('hidden');
            videos[j].play();
            videos[j].setAttribute("controls", "controls");
        } else {
            text_overlays[j].classList.remove('hidden');
            screen_overlays[j].classList.remove('hidden');
            videos[j].pause();
            videos[j].removeAttribute("controls");
        }
    }
}

function handleVideoPlay() {
    for (let j = 0; j < num_videos; j++) {
        if (this.i == j) {
            text_overlays[j].classList.add('hidden');
            screen_overlays[j].classList.add('hidden');
            videos[j].play();
        } else {
            text_overlays[j].classList.remove('hidden');
            screen_overlays[j].classList.remove('hidden');
            videos[j].pause();
        }
    }
}

function handleVideoEnd() {
    text_overlays[this.i].classList.remove('hidden');
    screen_overlays[this.i].classList.remove('hidden');
}


// ********** MUSIC PAGE FUNCTIONS **********
// Update displays and audio control when a song display is clicked
function handleSongClick(e) {

  // Change track if new song is clicked
  if (currentSongIndex !== this.i) {
    // Remove active background and play/pause button, restore track number
    if (currentSongIndex >= 0) {
      songDisplays[currentSongIndex].classList.remove('current-song');
      playBoxNumbers[currentSongIndex].classList.remove('fa', 'fa-play', 'fa-pause', 'fa-icon-adjust');
      playBoxNumbers[currentSongIndex].classList.add('display-text');
      playBoxNumbers[currentSongIndex].textContent = `${currentSongIndex + 1}`;
    }

    // Update current song, remove track number,
    // and add active background and play symbol
    currentSongIndex = this.i;
    songDisplays[currentSongIndex].classList.add('current-song');
    playBoxNumbers[currentSongIndex].classList.remove('display-text');
    playBoxNumbers[currentSongIndex].classList.add('fa', 'fa-pause', 'fa-icon-adjust');
    playBoxNumbers[currentSongIndex].textContent = '';

    // Change displayed title, audio source, then load, play, and update state
    currentTitle.innerText = song_titles[this.i];
    audioSource.src = sources[this.i];
    audio.load();
    audio.play();
    isPaused = false;
  } else if (isPaused) { 
    // Remove pause icon, add play icon
    playBoxNumbers[currentSongIndex].classList.remove('fa-play');
    playBoxNumbers[currentSongIndex].classList.add('fa-pause');
    // Resume track
    audio.play();
    isPaused = false;
  } else {
    // Remove play icon, add pause icon
    playBoxNumbers[currentSongIndex].classList.remove('fa-pause');
    playBoxNumbers[currentSongIndex].classList.add('fa-play');
    // Pause track
    audio.pause();
    isPaused = true;
  }
}

// Update song displays when the audio is played 
function handleAudioPlay(e) {
  // If user clicks on audio control before song display,
  // the currentSongIndex must be initialized
  if (currentSongIndex === -1) {
    currentSongIndex = 0;

    songDisplays[currentSongIndex].classList.add('current-song');
    playBoxNumbers[currentSongIndex].classList.remove('display-text');
    playBoxNumbers[currentSongIndex].classList.add('fa', 'fa-pause', 'fa-icon-adjust');
    playBoxNumbers[currentSongIndex].textContent = '';
  } else {
    playBoxNumbers[currentSongIndex].classList.remove('fa-play');
    playBoxNumbers[currentSongIndex].classList.add('fa-pause');
  }

  isPaused = false;
}

// Update song displays when the audio is paused
function handleAudioPause(e) {
  playBoxNumbers[currentSongIndex].classList.remove('fa-pause');
  playBoxNumbers[currentSongIndex].classList.add('fa-play');

  isPaused = true;
}


// ********** NAV LISTENERS **********
// Listen for hamburger click
mobile_nav_checkbox_label.addEventListener('click', handleHambClick);

// Listen for navigation click
for (let i = 0; i < num_pages; i++) {
    nav_links[i].i = i;
    nav_links[i].addEventListener('click', handleNavLinkClick);
};


// ********** HOME PAGE LISTENERS **********
if (mq.matches) {
    console.log(width);
    console.log(mq.matches);
    autoplay();
} else {
    handleMobileVideoViewIntersection();
}

// Listen for desktop click
buddy_video.addEventListener('click', handleVideoClick);

// ********** PRODUCTION PAGE LISTENERS **********
for (let i = 0; i < numberOfCarousels; i++){
    prevButtonList[i].i = i;
    nextButtonList[i].i = i;
    // prevButtonList[i].addEventListener("touchstart", handleMoveToPrevSlide);
    // nextButtonList[i].addEventListener("touchstart", handleMoveToNextSlide);
    prevButtonList[i].addEventListener("click", handleMoveToPrevSlide);
    nextButtonList[i].addEventListener("click", handleMoveToNextSlide);
};

// ********** VIDEOS PAGE LISTENERS **********
for (let i = 0; i < num_videos; i++) {
    videos[i].i = i;
    videos[i].addEventListener('play', handleVideoPlay);
    videos[i].addEventListener('ended', handleVideoEnd);
    text_overlays[i].i = i;
    text_overlays[i].addEventListener('click', handleOverlayClick);
}


// ********** MUSIC LISTENERS **********
for (let i = 0; i < songDisplays.length; i++) {
  songDisplays[i].i = i;
  songDisplays[i].addEventListener('click', handleSongClick);
}

document.body.addEventListener("keydown", handleSpaceBar);
audio.addEventListener("play", handleAudioPlay);
audio.addEventListener("pause", handleAudioPause);