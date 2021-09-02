const timeDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

// 控制定時器
let countdown;

const showTimeLife = function (secondes) {
	/*******
	 * @description: 展示時間
	 * @param {secondes: 秒數}
	 */
	const minutes = Math.floor(secondes / 60);
	const remainedSecondes = secondes % 60;
	const display = `${minutes}:${
		remainedSecondes < 10 ? '0' : ''
	}${remainedSecondes}`;
  document.title = display;
	timeDisplay.textContent = display;
};

const timer = function (secondes) {
	/*******
	 * @description: 計時
	 * @param {secondes : 數秒}
	 */
	clearInterval(countdown);
	const now = Date.now();
	const then = now + secondes * 1000;
	showTimeLife(secondes);
	showEndTime(then);
	countdown = setInterval(() => {
		const secondesLeft = Math.round((then - Date.now()) / 1000);
		if (secondesLeft < 0) {
			clearInterval(countdown);
			return;
		}
		showTimeLife(secondesLeft);
	}, 1000);
};

const showEndTime = function (timestamp) {
	/*******
	 * @description: 計算結束時間
	 * @param {timestamp : 結束時間戳}
	 */
	const end = new Date(timestamp);
	const hours = end.getHours();
	const minutes = end.getMinutes();
	const endDisplay = `在 ${hours}:${minutes < 10 ? '0' : ''}${minutes} 停止`;
	endTimeDisplay.textContent = endDisplay;
};

const startTime = function () {
	/*******
	 * @description: 開始計時
	 * @param {*}
	 */
	const secondes = this.dataset.time;
	timer(secondes);
};

const customFormTime = function (e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
  this.reset();
};

buttons.forEach((button) => button.addEventListener('click', startTime));

document.customForm.addEventListener('submit', customFormTime);
