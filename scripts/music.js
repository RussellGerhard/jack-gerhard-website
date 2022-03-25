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
const titles = ["Roseanne", "One Last Time", "Can't Slow Down"];

// Keep track of state of player
let currentSongIndex = -1;
let isPaused = false;


// Update displays and audio control when a song display is clicked
function handleSongClick(e) {

  // Change track if new song is clicked
  if (currentSongIndex !== this.i) {
    // Remove active background and play/pause button, restore track number
    if (currentSongIndex >= 0) {
      songDisplays[currentSongIndex].classList.remove('current-song');
      playBoxNumbers[currentSongIndex].classList.remove('fa', 'fa-play', 'fa-pause', 'fa-icon-adjust');
      playBoxNumbers[currentSongIndex].textContent = `${currentSongIndex + 1}`;
    }

    // Update current song, remove track number,
    // and add active background and play symbol
    currentSongIndex = this.i;
    songDisplays[currentSongIndex].classList.add('current-song');
    playBoxNumbers[currentSongIndex].classList.add('fa', 'fa-pause', 'fa-icon-adjust');
    playBoxNumbers[currentSongIndex].textContent = '';

    // Change displayed title, audio source, then load, play, and update state
    currentTitle.innerText = titles[this.i];
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

for (let i = 0; i < songDisplays.length; i++) {
  songDisplays[i].i = i;
  songDisplays[i].addEventListener('click', handleSongClick);
}

audio.onplay = handleAudioPlay;
audio.onpause = handleAudioPause;