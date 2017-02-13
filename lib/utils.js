async function imageLoad(urls, fn) {
	function get_url_promise(url) {
		let img = new Image();
		img.src = url;
		return new Promise(function(resolve, reject) {
			img.onload = function() {
				let canvasEle = document.createElement('canvas'),
					ctx = canvasEle.getContext('2d'),
					{ height , width } = img;
				let imageData;
				canvasEle.height = height;
				canvasEle.width = width;
				ctx.drawImage(img, 0, 0);
				imageData = ctx.getImageData(0, 0, width, height);
				ctx.clearRect(0, 0, imageData.width, imageData.height);
				resolve(imageData);
			}
			img.onerror = function(err) {
				reject(err);
			}
		})
	}

	if (typeof urls == 'string') {
		let imagedata = await get_url_promise(urls);
		fn(imagedata);
	} else if (Array.isArray(urls)) {
		let url_promise_array = urls.map((url) => {
			return get_url_promise(url)
		});
		let imagedata_array = await Promise.all(url_promise_array);
		fn(imagedata_array)
	}
}

function error(msg) {
	throw new Error(msg)
}

function imageOutput(imagedata, el) {
	imagedata instanceof ImageData ? imagedata :
		error('imagedata must be an instance of ImageData');
	let canvas = document.createElement('CANVAS'),
		img = new Image(),
		ctx = canvas.getContext('2d');

	[canvas.height, canvas.width] = [imagedata.height, imagedata.width];
	ctx.putImageData(imagedata, 0, 0);
	img.src = canvas.toDataURL("image/png");
	el && el.append(img);
	return img;
}

function isflatArray(array){
	if(Array.isArray(array)){
		if(array.length<=0){
			return true
		}else{
			return !Array.isArray(array[0]);
		}
	}else{
		return false;
	}
}

export default {
	imageLoad,
	error,
	imageOutput,
	isflatArray
}