let countdown
let endTime
const timerDisplay = document.querySelector('.display__time-left')
const timeEnd = document.querySelector('.display__time-end')
const buttons = document.querySelectorAll('.timer__button')

function timer(seconds) {
	clearInterval(countdown)
	const now = Date.now()
	endTime = now + seconds * 1000
	displayTimeLeft(seconds * 1000)
	displayEndTime(endTime)
	countdown = setInterval(timerInterval, 1000)
}

function timerInterval() {
	let timeLeft = endTime - Date.now()
	if (timeLeft <= 0) {
		timeLeft = 0
		clearInterval(countdown)
	}
	displayTimeLeft(timeLeft)
}

function displayTimeLeft(ms) {
	const timeLeft = formatTime({ ms })
	timerDisplay.textContent = timeLeft
	document.title = timeLeft
}

function displayEndTime(timestamp) {
	const timeLeft = formatTime({ timestamp })
	timeEnd.textContent = `Be Back At ${timeLeft}`
}

function formatTime({ timestamp = null, ms = null }) {
	if (timestamp != undefined) {
		const time = new Date(timestamp)
		return [time.getHours(), time.getMinutes(), time.getSeconds()]
			.map((n) => n.toString().padStart(2, '0'))
			.join(':')
	}
	if (ms != undefined) {
		return [
			(ms / 1000 / 3600) % 60,
			(ms / 1000 / 60) % 60,
			(ms / 1000) % 60,
		]
			.map((n) => Math.round(n).toString().padStart(2, '0'))
			.join(':')
	}
	throw new Error('missing required parameter')
}

function startTimer() {
	timer(this.dataset.time)
}

buttons.forEach((button) => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function (e) {
	e.preventDefault()
	const minutes = this.minutes.value
	timer(minutes * 60)
	this.reset()
})
