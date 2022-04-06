const text_overlays = document.getElementsByClassName('video-overlay');
const screen_overlays = document.getElementsByClassName('video-screen-overlay');
const videos = document.getElementsByClassName('overlayed-video');
const num_videos = videos.length;

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

for (let i = 0; i < num_videos; i++) {
    videos[i].i = i;
    videos[i].addEventListener('play', handleVideoPlay);
    videos[i].addEventListener('ended', handleVideoEnd);
    text_overlays[i].i = i;
    text_overlays[i].addEventListener('click', handleOverlayClick);
}