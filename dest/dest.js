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
	
			init('./1.jpg');
	
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
/***/ function(module, exports, __webpack_require__) {

		let charts = __webpack_require__(3);
		let worker = __webpack_require__(4);
		module.exports = {
			imagedata:Array,//原始图像数组
			grayimage:Array,//灰度之后的图像数组,失去rgba信息,不能直接输出为图像
			twoDime:Array,//二维的图像像素数组，不能直接输出为图像
			deal(imagedata) {
				this.imagedata = imagedata;
	
				//给imagedata 加上set get 方法
				//TODO
	
				let that = this;
	
				// let pre = ['toGray','toTwoDime','createWorkers'];
				// pre.forEach(function(e){
				// 	that[e]();
				// });
				this.toGray();
				this.toTwoDime();
				this.moveTmpl([[0,0],[0,0]],function(templ,imagearea){
					return imagearea[0][0]*0.5;
				});
				this.toRawData(this.twoDime);
				// this.toRawData(this.twoDime);
				// this.powerChange(1);
				// this.log(0.9);
				// this.bitmap(6);
				// let del = this.operImageData(0,this.imagedata,this.imagedata.width,this.imagedata.height/2);
				// for(let i = 0;i< this.imagedata.height/2;i++){
					// del.next(i);
					// for(let j = 0;j<this.imagedata.width;j++){
						// del.next(j+i*this.imagedata.width);
					// }
				// }
				// this.imagedata = del.next(true).value;
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
			toRawData(twoDime){//二维图像数组信息同步回原始图像数组,大小不更改
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
			*operImageData (oper,imagedata,width,height){
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
						if(oper == 0){ //只能4个4个的删
							delete copyarry[flag];
							delete copyarry[flag+1]
							delete copyarry[flag+2]
							delete copyarry[flag+3]
						}else{
							//添加像素
						}
					}
				}
				let copyimage = new ImageData(width,height);
				for(let i = 0;i<copyimage.data.length;i++){
					if(copyarry[i]){
						copyimage.data[i] = copyarry[i];
					}
				}
				return copyimage;
			},
			reversal(){//图像反转
				for(let i = 0;i<this.imagedata.data.length;i++){
					this.imagedata.data[i] =  255 - this.imagedata.data[i];
				}
			},
			powerChange(param,weight=1){//幂次变换
				for(let i = 0;i<this.imagedata.data.length;i++){
					let newdata = (weight*Math.pow(this.imagedata.data[i]/255,param)*this.imagedata.data[i]);
					this.imagedata.data[i] = newdata<=255?newdata:255;
				}
			},
			log(param,weight=1){//对数变换 parm 是 [0,1]
				for(let i = 0;i<this.imagedata.data.length;i++){
					let newdata = (weight*Math.log(this.imagedata.data[i]*param+1)/
						Math.log(this.imagedata.data[i]+1))*this.imagedata.data[i];
					this.imagedata.data[i] = newdata;
				}
			},
			bitmap(index=0){//比特分层,输出哪个比特面
				if(index > 7){
					throw("invaild");
				}
				index = 7 - index;
				let base = parseInt(10000000,2);
				let bit = base >> index;
				for(let i = 0;i<this.imagedata.data.length;i++){
					let newdata = this.imagedata.data[i] & bit;
					this.imagedata.data[i] = newdata;
				}
			},
			histogram(){//直方图均衡
				
				function getHistogram(grayimages){
					let data = [0];
					let grayimage = grayimages.slice(0);
					let sortArray = grayimage.sort(function(a,b){
						return a-b
					});
					let len = grayimage.length;
					let last = 0;
	
					for(let i = 1;i<=255;i++){
					let count = sortArray.indexOf(i);
					// console.log(count)
					if(count == -1){
						count = 0;
					}else{
						let tem = count;
						count = count - last;
						last =tem;
					}
					data[i-1] = count;
					len -= count;
					}
	
					data[255] = len;
					return data;
				}
	
				let data = getHistogram(this.grayimage);
				new charts.Histogram({//原图的直方图
					data:data
				});
				//均衡
				let table = [];
				let sum=0;
				for(let i = 0;i<256;i++){
					sum += data[i];
					table[i] = parseInt(255*1*sum/this.grayimage.length);
				}
				console.log(table)
				//原像素到目标像素的映射 TODO
				for(let i = 0;i<this.grayimage.length;i++){
					this.grayimage[i] = table[this.grayimage[i]];
				}
	
				data = getHistogram(this.grayimage);
				console.log(charts.Histogram);
				let fn = charts.Histogram;
				new charts.Histogram({data:data})
			},
			graytoPic(){//一维的灰度数组转化为图片
				let that = this;
				let count = 0;
				this.grayimage.forEach(function(e){
					that.imagedata.data[count*4] = e;
					that.imagedata.data[count*4+1] = e;
					that.imagedata.data[count*4+2] = e;
					count+=1;
				})	
			},
			createCameraVideo(el = document.getElementsByTagName('body')[0]){
				let video = document.createElement('VIDEO');
				navigator.getUserMedia({"video":true},function(stream){
					video.src = window.URL.createObjectURL(stream);
					video.play();
				},function(err){
					console.log(err);
				});
	
				video.addEventListener('play',function(){//抓取视频流,立刻抓取是白屏的
					setTimeout(function(){console.log(getVideoFrame(video))},3000);//处理图像数据
				});
	
				function getVideoFrame(video){//获取视频流中的帧
					let canvas = document.createElement('CANVAS');
					let ctx = canvas.getContext('2d');
					ctx.drawImage(video,0,0,video.clientWidth, video.clientHeight);
					//返回图像帧数据
					console.log(video.height)
					el.appendChild(canvas);
					return ctx.getImageData(0,0,video.clientWidth, video.clientHeight);
				}
			},
			createWorkers(){
				//写一个最简单的测试一下
				jsstr = `
					function t(){
						return 0;
					}
				`
				let w = new worker.Worker([jsstr]);
				let r = w.receive();
				console.log(r.next(function(){
					console.log(1);
					// console.log(e);
				}))
				console.log(r.next(function(e){
					console.log(1);
					// console.log(e);
				}))
	
				let s = w.send();
				// w.receive().next(function(e){
				// 	console.log(e);
				// });
				s.next('111');			
				console.log(s.next('1111'));
				},
				//模板运算
				moveTmpl(tmpl,fn){//移动tmpl 传入对应的回调fn
					let tmplrow = tmpl.length;
					let tmplcol = tmpl[0].length;
					let imagerow = this.twoDime.length;
					let imagecol = this.twoDime[0].length;
	
					//对原图的边缘像素添加像素
					let extraRow = Math.ceil((tmplrow-1)/2);
					let extraCol = Math.ceil((tmplcol-1)/2);
					//上面添加行
					for(let i = 0;i<extraRow;i++){
						this.twoDime.unshift(this.twoDime[2*i+1])//插入行的时候下标也变了！注意
					}
				// 	//下面添加行
					for(let i = 0;i<extraRow;i++){
						this.twoDime.push(this.twoDime[this.twoDime.length-2-i])
					}
				// 	//左边添加列
					for(let i = 0;i<this.twoDime.length;i++){
						for(let k = 0;k<extraCol;k++){
							this.twoDime[i].unshift(this.twoDime[i][2*k+1]);
						}
					}
				// 	//右边添加列
					for(let i = 0;i<this.twoDime.length;i++){
						for(let k = 0;k<extraCol;k++){
							this.twoDime[i].push(this.twoDime[i][this.twoDime[0].length-2-k])
						}
					}
	
					function getArea(r,c){
						let area = []
						for(let i = 0;i<tmplrow;i++){	
							area.push([]);
							for(let j = 0;j<tmplcol;j++){
								area[i][j] = this.twoDime[r+i][j+c];
							}
						}
						return area;
					}
				// 	//key step
					for(let i = extraRow;i < imagerow;i++){//逐像素处理
						for(let j = extraCol;j < imagecol;j++){
							this.twoDime[i][j] = fn(tmpl,getArea.bind(this)(i,j));
						}
					}
	
				// 	//消除多余的行
					for(let i = 0;i<extraRow;i++){
						this.twoDime.shift();
						this.twoDime.pop();
					}
	
				// 	//消除多余的列
					for(let i = 0;i<this.twoDime.length;i++){
						for(let k = 0;k<extraCol;k++){
							this.twoDime[i].shift();
							this.twoDime[i].pop();
						}
					}
	
				}
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	function _init(el = document.getElementsByTagName('body')[0]){
			let canvas = document.createElement('CANVAS');
			canvas.height = el.height?el.height:600;
			canvas.width = el.width?el.width:800;
			el.appendChild(canvas);
			return canvas;
	}
	
	function _coordinate(canvas){
		let {width,height} = canvas;
	
		let coor = new Path2D();
		coor.moveTo(0,height);
		coor.lineTo(width,height);
		coor.moveTo(0,height);
		coor.lineTo(0,0);
		coor.closePath();
	
		canvas.getContext('2d').stroke(coor);
	}
	
	/**
		opt{
			el:ElementObject,
			data:Array
		}
	**/
	class Histogram {
		constructor(opt){
			this.canvas = _init(opt.el);
			this.ctx = this.canvas.getContext('2d');
			new _coordinate(this.canvas);
			let data = new Path2D();
			let dataMax = Number.NEGATIVE_INFINITY;
			let dataMin = Number.POSITIVE_INFINITY;
			let dataXStep = opt.data.length > 5 ? this.canvas.width/opt.data.length:80;
			opt.data.forEach(function(e){
				dataMax = e > dataMax?e:dataMax;
				dataMin = e < dataMin?e:dataMin;
			});
			console.log(dataMax)
			let dataYStep = this.canvas.height/dataMax;
			let that = this;
			opt.data.forEach(function(e,index){
				data.moveTo(index*dataXStep,that.canvas.height);
				data.lineTo(index*dataXStep,that.canvas.height-e*dataYStep);
				data.lineTo((index+1)*dataXStep,that.canvas.height-e*dataYStep);
				data.lineTo((index+1)*dataXStep,that.canvas.height);
			});
			this.ctx.stroke(data);
		}
	}
	
	module.exports= {
		Histogram
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	//这个worker类以一个函数初始化，建立worker，receive,send 分别为发送函数所需的数据，接收函数执行的结果
	//因为worker需要序列化反序列化，并且是无论如何都拷贝数据，所以在传递图像数据的时候开销极大
	//但是通过类似于C++或者rust中的move borrow 我们可以极大的提高数据传递的效率
	class Worker{
		constructor(jsArray){
			this.workers = jsArray.map(function(e) { //根据机器核的数目来确定开的webworker的数目，一个新的worker就是新的线程
				let w = new window.Worker('worker.js');//由页面上的url确定
				w.postMessage(JSON.stringify({
					type:'function',
					value:e,
				}));
				return w;
			});
		}
	
		*_receive(){//主线程接受来自worker的消息调用fn，生成器函数
			let fn = function(){};
			for(let i = 0;i< this.workers.length;i++){
				this.workers[i].onmessage = yield fn;
			}
			return 0;
		}
	
		*_send(){
			let param = {};
			for(let i = 0;i<this.workers.length;i++){
				 let realparam = yield param;
				  // window.Worker.prototype.postMessage.call(this.workers[i],'11')
				this.workers[i].postMessage('11');//主线程向worker传递数据,move和borrow
			}
			return 11;
		}
	
		receive(){
			let rece = this._receive();
			return rece;
		}
	
		send(){
			let sen = this._send();
			return sen;
		}
	
	}
	module.exports= {
		Worker
	}

/***/ }
/******/ ]);
//# sourceMappingURL=dest.js.map