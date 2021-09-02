let type = 2;
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const switchType = function (num) {
	type = num;
};

const getVideo = function () {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then((localMediaStream) => {
			console.log(localMediaStream);
			video.srcObject = localMediaStream;
			video.play();
		})
		.catch((err) => {
			console.error(`OH OH!!!`, err);
		});
};

const paintToCanvas = function () {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;
	let pixels = ctx.getImageDate(0, 0, width, height);
	console.log(`Aera: ${width * height}, Pixels: ${pixels.data.length}`);

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		pixels = ctx.getImageData(0, 0, width, height);

		switch (type) {
			case 1:
				pixels = redEffect(pixels);
				break;
			case 2:
				pixels = rgbSplit(pixels);
				break;
			case 3:
				pixels = greenScreen(pixels);
				break;
		}
	}, 16);
};

const takePhoto = function () {
	snap.currentTime = 0;
	snap.play();

	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome');
	link.innerHTML = `<img src="${data}" alt="Handsome Man"/>`;
	strip.insertBefore(link, strip.firstChild);
};

const redEffect = function (pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i + 0] = pixels.data[i + 0] + 200; //Red
		pixels.data[i + 1] = pixels.data[i + 1] + 0; //Green
		pixels.data[i + 2] = pixels.data[i + 2] * 5; //Blue
	}
	return pixels;
};

const rgbSplit = function (pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - 150] = pixels.data[i + 0]; //Red
		pixels.data[i + 500] = pixels.data[i + 1]; //Green
		pixels.data[i - 500] = pixels.data[i + 2]; //Blue
	}
	return pixels;
};
const greenScreen = function (pixels) {
	const levels = {};

	document.querySelectorAll('.rgb input').forEach((input) => {
		levels[input.name] = input.value;
	});
	for (let i = 0; i < pixels.data.length; i = i + 4) {
		red = pixels.data[i + 0];
		green = pixels.data[i + 1];
		blue = pixels.data[i + 2];
		alpha = pixels.data[i + 3];
		if (
			red >= levels.rmin &&
			green >= levels.gmin &&
			blue >= levels.bmin &&
			red <= levels.rmax &&
			green <= levels.gmax &&
			blue <= levels.bmax
		) {
			pixels.data[i + 3] = 0;
		}
	}
  return pixels;
};

getVideo();

video.addEventListener('canplay', paintToCanvas);
