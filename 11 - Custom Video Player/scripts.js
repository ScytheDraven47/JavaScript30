/* Get Elements */
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

/* Build Functions */
function togglePlay() {
	const method = video.paused ? 'play' : 'pause'
	video[method]()
}

function updatePlayIcon() {
	toggle.textContent = this.paused ? '►' : '❚ ❚'
}

function skip() {
	video.currentTime += Number(this.dataset.skip)
}

function setRange() {
	video[this.name] = Number(this.value)
}

function updateProgressBar(e) {
	progressBar.style.flexBasis = `${
		(video.currentTime / video.duration) * 100
	}%`
}

function handleProgressChange(e) {
	if (e.buttons == 0 && e.type == 'mousemove') return
	video.currentTime = video.duration * (e.offsetX / progress.offsetWidth)
}

/* Event Listeners */
video.addEventListener('click', togglePlay)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('timeupdate', updateProgressBar)
toggle.addEventListener('click', togglePlay)
progress.addEventListener('click', handleProgressChange)
progress.addEventListener('mousemove', handleProgressChange)
skipButtons.forEach((button) => {
	button.addEventListener('click', skip)
})
ranges.forEach((range) => {
	range.addEventListener('input', setRange)
})
