	if(_ENV_DEV == true){
		let html = require('./dest/default.html');
	}

	import ImageDeal from './class/ImageDeal';
	import utils from './lib/utils'
	let t = utils.execTime
	// State = {
	// 				canvasEle,
	// 				ctx,
	// 				imageData,
	// 				prepic
	// };
	let ele = document.getElementsByTagName('body')[0];
	utils.imageLoad('./house.jpg',function(imagedata){
		let image = new ImageDeal(imagedata);
		
		// utils.imageOutput(t(image.scale.bind(image)),ele)
		// utils.imageOutput(t(image.gray.bind(image)),ele);
		// utils.imageOutput(t(image.power.bind(image,{factor:6,degree:1,offset:6})),ele);
		// utils.imageOutput(t(image.reversal.bind(image)),ele);
		// utils.imageOutput(t(image.log.bind(image,0.2,1)),ele)
		// utils.imageOutput(t(image.bitmap.bind(image,7)),ele);
		// utils.imageOutput(t(image.histogram.bind(image)),ele);

		// utils.imageOutput(t(image.LaplaceSharpen.bind(image)),ele)
		// utils.imageOutput(t(ImageDeal.grayMatrixtoImageData.bind(image,image.grayMatrix)),ele)
		// utils.imageLoad('./amazingball.png',function(imaged){
		// 	let images = new ImageDeal(imaged);
		// 	utils.imageOutput(t(image.Merge.bind(image,images.Matrix,50,50)),ele);
		// })
		
 	});