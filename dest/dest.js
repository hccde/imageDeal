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

	'use strict';
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	// let Compute =  require('./imagecompute/main.js');
	// loadPrePic(['./amazingball.png'])
	// function loadPrePic(picArray){
	// 	let count  = picArray.length;
	// 	let picarray = [];
	// 	picArray.forEach(function(e){
	// 		let canvasEle = document.createElement(`CANVAS`);
	// 		let ctx = canvasEle.getContext('2d');
	
	// 		let img = new Image();
	// 		img.src = e;
	// 		img.onload = function(){
	// 			let {
	// 				height,
	// 				width
	// 			} = img;
	// 			canvasEle.height = height;
	// 			canvasEle.width = width;
	// 			count-=1;
	// 			ctx.drawImage(img, 0, 0);
	// 			let imageData = ctx.getImageData(0, 0, width, height);
	// 			ctx.clearRect(0,0,imageData.width,imageData.height);
	// 			picarray.push(imageData);//不保证图片的顺序
	// 			if(count == 0){
	// 				init('./2.jpg',picarray);//前置图片加载完毕之后初始化
	// 			}
	// 		}
	// 	});
	// }
	// function init(pic,prepic) {
	// 	let State = {
	// 		canvasEle: Object,
	// 		ctx: Object,
	// 		imageData: Object,
	// 		prepic:Array
	// 	};
	// 	let gen;
	
	// 	function load(img, el) {
	// 		let {
	// 			height,
	// 			width
	// 		} = img;
	// 		let canvasEle = document.createElement(`CANVAS`);
	// 		let ctx = canvasEle.getContext('2d');
	
	// 		canvasEle.height = height;
	// 		canvasEle.width = width;
	// 		ctx.drawImage(img, 0, 0);
	// 		el.appendChild(canvasEle);
	
	// 		let imageData = ctx.getImageData(0, 0, width, height);
	// 		State = {
	// 			canvasEle,
	// 			ctx,
	// 			imageData,
	// 			prepic
	// 		};
	// 		console.log(prepic)
	// 		gen.next();
	// 	}
	
	// 	function* initCanvas(pic,
	// 		el = document.getElementsByTagName('BODY')[0]) {
	// 		let img = new Image();
	// 		img.src = pic;
	// 		yield img.onload = function() {
	// 			load(img, el)
	// 		};
	// 		//全局的状态 canvas元素，绘图上下文，图像数据
	// 		//进行图片的处理
	// 		let imagedata = Compute.deal(State);
	// 		//clear
	// 		State.ctx.clearRect(0,0,State.imageData.width,State.imageData.height);
	// 		//调整大小
	// 		State.canvasEle.height = imagedata.height;
	// 		State.canvasEle.width = imagedata.width;
	// 		State.ctx.putImageData(imagedata,0,0,0,0,imagedata.width,imagedata.height);
	// 		return;
	// 	}
	
	// 	gen = initCanvas(pic);
	// 	gen.next();
	// }
	
	var Image = __webpack_require__(2);
	var image = new Image('./amazingball.png');
	var t = {
		test: function test() {
			var _this = this;
	
			return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var m;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return 2;
	
							case 2:
								m = _context.sent;
	
							case 3:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this);
			}))();
		}
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Image = function () {
		function Image(url) {
			_classCallCheck(this, Image);
	
			console.log(url);
			function _getImageData(url) {
				var _marked = [load_img].map(regeneratorRuntime.mark);
	
				var handle = load_img(url);
				function load_img(src) {
					var img, canvasEle, ctx, imageData;
					return regeneratorRuntime.wrap(function load_img$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									img = new Image();
	
									console.log(src);
									img.src = src;
									canvasEle = document.createElement('CANVAS');
									ctx = canvasEle.getContext('2d');
									imageData = void 0;
	
									img.onload = function () {
										var height = img.height,
										    width = img.width;
	
										canvasEle.height = height;
										canvasEle.width = width;
										ctx.drawImage(img, 0, 0);
										imageData = ctx.getImageData(0, 0, width, height);
										ctx.clearRect(0, 0, imageData.width, imageData.height);
										console.log('over');
										handle.next();
									};
									_context.next = 9;
									return imageData;
	
								case 9:
									return _context.abrupt('return', imageData);
	
								case 11:
								case 'end':
									return _context.stop();
							}
						}
					}, _marked[0], this);
				}
			}
			_getImageData(url);
		}
	
		_createClass(Image, null, [{
			key: '_getImageData',
			value: function _getImageData(url) {
				var _marked2 = [load_img].map(regeneratorRuntime.mark);
	
				var handle = load_img(url);
				function load_img(src) {
					var img, canvasEle, ctx, imageData;
					return regeneratorRuntime.wrap(function load_img$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									img = new Image();
	
									img.src = src;
									canvasEle = document.createElement('CANVAS');
									ctx = canvasEle.getContext('2d');
									imageData = void 0;
	
									img.onload = function () {
										var height = img.height,
										    width = img.width;
	
										canvasEle.height = height;
										canvasEle.width = width;
										ctx.drawImage(img, 0, 0);
										imageData = ctx.getImageData(0, 0, width, height);
										ctx.clearRect(0, 0, imageData.width, imageData.height);
										console.log('over');
										handle.next();
									};
									_context2.next = 8;
									return imageData;
	
								case 8:
									return _context2.abrupt('return', imageData);
	
								case 10:
								case 'end':
									return _context2.stop();
							}
						}
					}, _marked2[0], this);
				}
			}
		}]);
	
		return Image;
	}();
	
	module.exports = Image;

/***/ }
/******/ ]);
//# sourceMappingURL=dest.js.map