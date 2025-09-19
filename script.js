// Grab elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play/Pause toggle logic
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

// Update Play/Pause button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚❚';
}

// Skip video forwards/backwards
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle range updates (volume/playback speed)
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update progress bar visually
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub (seek) via progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Error handling for video load failure
video.addEventListener('error', () => {
  const errorMsg = document.createElement('div');
  errorMsg.textContent = 'Error: Failed to load video.';
  errorMsg.style.cssText = 'position: absolute; top: 0; left: 0; background: rgba(255,0,0,0.8); color: white; width: 100%; text-align: center; font-size: 2em; padding: 20px;';
  player.appendChild(errorMsg);
  player.querySelector('.player__controls').style.display = 'none';
});

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

skipButtons.forEach(button => button.addEventListener('click', skip));

// Scrubbing functionality
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Optional: Initialize UI on video load
video.addEventListener('loadedmetadata', handleProgress);
