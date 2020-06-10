/* Getting the elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullscreen = player.querySelector('.fullscreen');

/* Setup the functions */
function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function toggleFullscreen() {
    document.fullscreenElement ? document.exitFullscreen : video.requestFullscreen();
}

function updateButton() {
    const button = video.paused ? '►' : '❚❚';
    toggle.textContent = button;
}

function updateTime() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percentage}%`;
}

function handleRanges() {
    video[this.name] = this.value;
}

function handleSkip() {
    video.currentTime += parseFloat(this.dataset.skip);
}


function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/* Setup the event handlers */
video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', updateTime);

toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', toggleFullscreen);

ranges.forEach(range => range.addEventListener('change', handleRanges));
ranges.forEach(range => range.addEventListener('mousemove', handleRanges));

skipButtons.forEach(skipButton => skipButton.addEventListener('click', handleSkip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);