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
	utils.imageLoad('./amazingball.png',function(imagedata){
		let image = new ImageDeal(imagedata);
		console.log(image.toGray().out(document.getElementsByTagName('body')[0]));
	});