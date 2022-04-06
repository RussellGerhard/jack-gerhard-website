// Apparently a better alternative to autoplay attribute (using for desktop)
const buddy_video = document.getElementById('buddy-holly');
const audio = document.getElementById('audio');
let autoplayed = false;

// Decide how to treat video based on mobile or desktop layout
let width = document.documentElement.clientWidth;
const mq = window.matchMedia( '(min-width: 1024px)' );

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

if (mq.matches) {
    console.log(width);
    console.log(mq.matches);
    autoplay();
} else {
    handleMobileVideoViewIntersection();
}

// Listen for desktop click
buddy_video.addEventListener('click', handleVideoClick);