	if(_ENV_DEV == true){
		let html = require('./dest/default.html');
	}

	import ImageDeal from './class/ImageDeal';
	import utils from './lib/utils'

	// State = {
	// 				canvasEle,
	// 				ctx,
	// 				imageData,
	// 				prepic
	// };

	utils.imageLoad('./house.jpg',function(imagedata){
		let image = new ImageDeal(imagedata);
		image.test()
		// utils.imageOutput(image.toGray(),document.getElementsByTagName('body')[0])
 	});