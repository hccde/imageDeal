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
		utils.imageOutput(image.power({factor:6,degree:1,offset:6})[0],document.getElementsByTagName('body')[0])
 	});