	module.exports = {
		deal(imagedata) {
			var count = 0;
			var gray = (imagedata.data[i] * 30 + imagedata.data[i + 1] * 59 + imagedata.data[i + 2] * 11) / 100;
			for (var i = 0; i < imagedata.data.length;) {
			imagedata.data[i] = gray;
			imagedata.data[i + 1] = gray;
			imagedata.data[i + 2] = gray;
			i = i + 4;
		}	
		return imagedata;
	}
}
