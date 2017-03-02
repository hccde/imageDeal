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
	utils.imageLoad('./people.jpg',function(imagedata){
		let image = new ImageDeal(imagedata,1);
		
		// utils.imageOutput(t(image.scale.bind(image)),ele)
		// utils.imageOutput(t(image.gray.bind(image)),ele);
		// utils.imageOutput(t(image.power.bind(image,{factor:6,degree:1,offset:6})),ele);
		// utils.imageOutput(t(image.reversal.bind(image)),ele);
		// utils.imageOutput(t(image.log.bind(image,0.2,1)),ele)
		// utils.imageOutput(t(image.bitmap.bind(image,7)),ele);
		// utils.imageOutput(t(image.histogram.bind(image)),ele);

		// utils.imageOutput(t(image.LaplaceSharpen.bind(image)),ele)
		// utils.imageOutput(t(image.Sharpen.bind(image)),ele)
		// utils.imageOutput(t(ImageDeal.grayMatrixtoImageData.bind(image,image.grayMatrix)),ele)
		// utils.imageLoad('./amazingball.png',function(imaged){
		// 	let images = new ImageDeal(imaged);
		// 	utils.imageOutput(t(image.Merge.bind(image,images.Matrix,50,50)),ele);
		// })
		// utils.imageOutput(t(image.Mosaic.bind(image,20,20,10,10)),ele)
		// utils.imageOutput(t(image.Rotate.bind(image,0,334,Math.PI/4)),ele)
		
		// let arr = image.Split.bind(image)(4,4)
		// arr.forEach((arry)=>{
		// 	arry.forEach((e)=>{
		// 		utils.imageOutput(e,ele);
		// 	})
		// })
		
		utils.imageOutput(new ImageDeal(image.histogram(),4).DetectFace(),ele);
 	});

	 // 	let arr = [1,2,3,[4,5,6,7]];
		// var worker = new Worker('worker.js');
		// worker.postMessage('haha')
		// let imageData = new ImageData(100,100)
		// worker.postMessage('hahha',[imageData.data.buffer]);
		// worker.onmessage = function(e){
		// 	console.log('from worker',e);
		// }
		// // console.log(arr);
		// arr = [];