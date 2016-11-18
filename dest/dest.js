/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

			let Compute =  __webpack_require__(2);
	
			init('./1.png');
	
			function init(pic) {
				let State = {
					canvasEle: Object,
					ctx: Object,
					imageData: Object
				};
				let gen;
	
				function load(img, el) {
					let {
						height,
						width
					} = img;
					let canvasEle = document.createElement(`CANVAS`);
					let ctx = canvasEle.getContext('2d');
	
					canvasEle.height = height;
					canvasEle.width = width;
					ctx.drawImage(img, 0, 0);
					el.appendChild(canvasEle);
	
					let imageData = ctx.getImageData(0, 0, width, height);
					State = {
						canvasEle,
						ctx,
						imageData
					};
					gen.next();
				}
	
				function* initCanvas(pic,
					el = document.getElementsByTagName('BODY')[0]) {
					let img = new Image();
					img.src = pic;
					yield img.onload = function() {
						load(img, el)
					};
					//全局的状态 canvas元素，绘图上下文，图像数据
					//进行图片的处理
					let imagedata = Compute.deal(State.imageData);
					State.ctx.putImageData(imagedata,0,0);
					return;
				}
	
				gen = initCanvas(pic);
				gen.next();
			}
	
			function writeImg(imagedata,ctx,el) {
				ctx.putImageData(dealimg(imagedata),0,0);
	
			}


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=dest.js.map