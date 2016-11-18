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
					console.log(State.imageData.height)
					let imagedata = Compute.deal(State.imageData);
					//clear
					State.ctx.clearRect(0,0,State.imageData.width,State.imageData.height);
					//调整大小
					State.canvasEle.height = imagedata.height;
					State.canvasEle.width = imagedata.width;
					State.ctx.putImageData(imagedata,0,0,0,0,imagedata.width,imagedata.height);
					return;
				}
	
				gen = initCanvas(pic);
				gen.next();
			}


/***/ },
/* 2 */
/***/ function(module, exports) {

		module.exports = {
			imagedata:Array,//原始图像数组
			grayimage:Array,//灰度之后的图像数组,失去rgba信息,不能直接输出为图像
			twoDime:Array,//二维的图像像素数组，不能直接输出为图像
			deal(imagedata) {
				this.imagedata = imagedata;
	
				//给imagedata 加上set get 方法
				//TODO
	
				let that = this;
				let pre = ['toGray','toTwoDime'];
				pre.forEach(function(e){
					that[e]();
				});
				// this.toRawData(this.twoDime);
	
				let del = this.delImageData(this.imagedata,this.imagedata.width,this.imagedata.height/2);
				for(let i = 0;i< this.imagedata.height/2;i++){
					// del.next(i);
					for(let j = 0;j<this.imagedata.width;j++){
						del.next(j+i*this.imagedata.width);
					}
				}
				this.imagedata = del.next(true).value;
				return this.imagedata;
			},
			toGray(){//灰度
				let imagedata = this.imagedata;
				this.grayimage = [];
				for (let i = 0; i < imagedata.data.length;) {
					let gray = (imagedata.data[i] * 30 + imagedata.data[i + 1] * 59 + imagedata.data[i + 2] * 11) / 100;
					gray = parseInt(gray);
					imagedata.data[i] = gray;
					imagedata.data[i + 1] = gray;
					imagedata.data[i + 2] = gray;
					this.grayimage.push(gray);
					i = i + 4;
				}	
				return imagedata;
			},
			toTwoDime(){//一维图像数组转二维
				this.twoDime = [];
				let {height , width} = this.imagedata;
				let row = Math.pow(this.grayimage.length/(height/width),0.5);
				let column = this.grayimage.length/row;
				let count = 0;
				for(let i = 0;i<column;i++){
					let item = [];
					this.twoDime.push(item);
					for(let j = 0;j<row;j++){
						item.push(this.grayimage[count]);
						count+=1;
					}
				}
			},
			toRawData(twoDime){//二维图像数组信息同步回原始图像数组
				let that = this;
				let count=0;
				this.imagedata.data
				twoDime.forEach(function(e,index){
					e.forEach(function(ee,indexs){
						that.imagedata.data[count*4] = ee;
						that.imagedata.data[count*4+1] = ee;
						that.imagedata.data[count*4+2] = ee;
						count+=1;
					});
				})
			},
			*delImageData (imagedata,width,height){//只能4个4个的删
				let copyarry = [];
				let flag = false;
				for(let i = 0;i<imagedata.data.length;i++){
					copyarry.push(imagedata.data[i]);
				}
				while(1){
					flag = yield flag;
					if(flag === true){
						break;
					}else{
						copyarry.splice(parseInt(flag),4);
					}
				}
				let copyimage = new ImageData(width,height);
				for(let i = 0;i<copyimage.data.length;i++){
					copyimage.data[i] = copyarry[i];
				}
				return copyimage;
			}
	}


/***/ }
/******/ ]);
//# sourceMappingURL=dest.js.map