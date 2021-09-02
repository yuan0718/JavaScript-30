const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

// video 啟動暫停
const togglePlay = function () {
	/**
	 * video.paused 判斷是否是暫停狀態
	 * console.log(video.paused);
	 * play方法 啟動
	 * pause方法 暫停
	 */
	const method = video.paused ? 'play' : 'pause';
	video[method]();
};
// 切換圖標
const updateToggle = function () {
	const icon = video.paused ? '►' : '◼';
	toggle.textContent = icon;
};
// 控制 video 時間前進後退
const skip = function () {
	// dataset 可以獲取 HTML data自定義值
	// console.log(this.dataset.skip);
	// parseFloat 解析浮點數
	video.currentTime += parseFloat(this.dataset.skip);
};
// 控制 video 聲音,速度
const handleRange = function () {
	/**
	 *  video.volume 控制影片音量
	 *  video.playbackRate 控制影片速度
	 * 	console.log(this.name);
	 * 	console.log(this.value);
	 */
	video[this.name] = this.value;
};
// 控制 影片進度條和時間一致
const handleProgress = function () {
	/**
	 * video.currentTime 當前時間
	 * video.duration 總時間
	 * toFixed 保留小數點後幾位數
	 */
	const percent = ((video.currentTime / video.duration) * 100).toFixed(2);
	progressBar.style.flexBasis = `${percent}%`;
};
// 進度條自由選取
const screb = function (e) {
	/**
	 * progress.offsetWidth 獲取進度條全長
	 * e.offsetX 當前 長度位置
	 */
	const serebTime = (e.offsetX / progress.offsetWidth) * video.duration;
	// 改變撥放時間 會觸發 timeupdate 事件
	video.currentTime = serebTime;
};
// 事件綁定
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
// ontimeupdate 事件 video自帶事件 影片播放觸發
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach((button) => button.addEventListener('click', skip));

ranges.forEach((range) => range.addEventListener('change', handleRange));
ranges.forEach((range) => range.addEventListener('mousemove', handleRange));

progress.addEventListener('click', screb);

// 控制 可滑動進度條
let mousedown = false;
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
// progress.addEventListener('mouseout', () => (mousedown = false));
progress.addEventListener('mousemove', (e) => mousedown && screb(e));
