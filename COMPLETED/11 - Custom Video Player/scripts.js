// Get elements 
const player = document.querySelector(".player"); 
const video = player.querySelector(".viewer"); 
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// functions 
function togglePlay() {
  if (video.paused) {
    video.play(); 
  } else {
    video.pause(); 
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon; 
}

function skip(e) {
  video.currentTime += parseFloat(this.dataset.skip);  
}

function handleRangeUpdate() {
  if (!rangeMouseDown) return; // if mouse not down, ignore
  video[this.name] = this.value; 
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100; 
  progressBar.style.flexBasis = `${percent}%`; 
}

function scrub (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; 
  video.currentTime = scrubTime; 
}

// hook up event listeners 
video.addEventListener("click", togglePlay); 
video.addEventListener("play", updateButton); 
video.addEventListener("pause", updateButton); 
video.addEventListener("timeupdate", handleProgress); 

toggle.addEventListener("click", togglePlay); 

skipButtons.forEach(button => button.addEventListener("click", skip)); 

let rangeMouseDown = false; 
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate)); 
ranges.forEach(range => range.addEventListener("mousedown", (e) => rangeMouseDown = true )); 
ranges.forEach(range => range.addEventListener("mouseup", () => rangeMouseDown = false)); 

let scrubMouseDown = false; 
progress.addEventListener("click", scrub); 
progress.addEventListener("mousemove", (e) => scrubMouseDown && scrub(e)); 
progress.addEventListener("mousedown", () => scrubMouseDown = true); 
progress.addEventListener("mouseup", () => scrubMouseDown = false); 
