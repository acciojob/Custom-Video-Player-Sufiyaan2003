// Select elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚❚';
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Error handling if video fails to load
video.addEventListener('error', () => {
  const msg = document.createElement('div');
  msg.textContent = 'Error: Failed to load video.';
  msg.style.cssText = 'position: absolute; top: 0; left: 0; background: rgba(255,0,0,0.9); color: white; width: 100%; text-align: center; font-size: 2em; padding: 20px;';
  player.appendChild(msg);
  player.querySelector('.player__controls').style.display = 'none';
});

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener('click', skip));

// Scrubbing functionality
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Initialize UI on video load
video.addEventListener('loadedmetadata', handleProgress);
