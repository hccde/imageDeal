	let charts = require('./charts');
	let worker = require('./worker');
	let classier = require('../haarjson.js');
	module.exports = {
		imagedata:Array,//原始图像数组
		grayimage:Array,//灰度之后的图像数组,失去rgba信息,不能直接输出为图像
		twoDime:Array,//二维的图像像素数组，不能直接输出为图像
		pic:Array,
		prepic:Array,//所需要的图片，提前加载完毕
		colorfulTunel:Array,
		calculusGrap:Array,
		deal(State){
			this.imagedata = State.imageData;
			this.prepic = State.prepic;
			this.pic = State.imageData;
			
			// console.log(this.imagedata)
				this.toGray();
				this.toTwoDime();
				this.produceWindow()
			// this.transform(110,110);
				// this.spin();
				// this.getCalculusGraph()
				// this.detectFace();
				this.toRawData();
			// this.LaplaceSharpen();
			//彩色图像分为RGBA通道
			// this.divThreeTunel();
			// for(let i = 0;i<3;i++){
			// 	this.grayimage =  this.colorfulTunel[i];
			// 	this.toTwoDime();
			// 	this.LaplaceSharpen();
			// 	this.colorfulTunel[i] = this.toOneDime();
			// 	console.log(i)
			// }
			// this.toColorfulImg();
			//给imagedata 加上set get 方法
			//TODO

			// let that = this;

			// let pre = ['toGray','toTwoDime','createWorkers'];
			// pre.forEach(function(e){
			// 	that[e]();
			// });
			// this.toGray();
			// this.createCameraVideo();
			// this.toTwoDime();
			// this.CarlFilter();
			// this.Sharpen();
			// this.LaplaceSharpen();
			// this.toRawData(this.twoDime);
			// this.reversal()
			// this.toRawData(this.twoDime);
			// this.powerChange(1);
			// this.log(0.9);
			// this.bitmap(6);
			// this.LaplaceSharpen();
			// this.toRawData(this.twoDime);
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
			this.grayimage = [];
			for (let i = 0; i < this.imagedata.data.length;) {
				let gray = (this.imagedata.data[i] * 30 + this.imagedata.data[i + 1] * 59 + this.imagedata.data[i + 2] * 11) / 100;
				gray = parseInt(gray);
				gray = gray>255?255:gray;
				this.imagedata.data[i] = gray;
				this.imagedata.data[i + 1] = gray;
				this.imagedata.data[i + 2] = gray;
				// this.imagedata.data[i + 3] = 1;// aplah 通道置1
				this.grayimage.push(gray);
				i = i + 4;
			}	
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
		toRawData(){//二维图像数组信息同步回原始图像数组
			this.imagedata = this.createEmptyImageData(this.twoDime[0].length,this.twoDime.length);
			let that = this;
			let count=0;
			this.twoDime.forEach(function(e,index){
				e.forEach(function(ee,indexs){
					that.imagedata.data[count*4] = ee;
					that.imagedata.data[count*4+1] = ee;
					that.imagedata.data[count*4+2] = ee;
					that.imagedata.data[count*4+3] = 255;
					count+=1;
				});
			})
		},
		toOneDime(){//二维数组转一维数组
			let res = [];
			for(let i = 0;i<this.twoDime.length;i++){
				for(let j = 0;j<this.twoDime[0].length;j++){
					res[i*this.twoDime[0].length+j] = this.twoDime[i][j];
				}
			}
			return res;
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
			let count = 0;
			for(let i = 0;i<this.imagedata.data.length;i++){
				this.imagedata.data[i] = 255-this.imagedata.data[i];
				// this.imagedata.data[i + 1] = 255-this.imagedata.data[i+1];
				// this.imagedata.data[i + 2] = 255-this.imagedata.data[i+2];
				// i = i + 4;
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
		createCameraVideo(el = document.getElementsByTagName('body')[0]){//TODO 捉猫猫逻辑
			let video = document.createElement('VIDEO');
			el.appendChild(video);
			let that = this;
			navigator.getUserMedia({"video":true},function(stream){
				video.src = window.URL.createObjectURL(stream);
				video.play();
			},function(err){
				console.log(err);
			});

			video.addEventListener('play',function(){//抓取视频流,立刻抓取是白屏的
				function begin(){
					//展示的canvas
					let canvas = document.createElement('CANVAS');
					canvas.height = video.clientHeight;
					canvas.width = video.clientWidth;
					el.appendChild(canvas);
					let ctx = canvas.getContext('2d');
					// ctx.globalCompositeOperation="source-over"
					let that = this;
					setTimeout(function(){
						let streamImageData = getVideoFrame(video);					
						ctx.putImageData(that.dealStream(streamImageData,ctx),0,0,0,0,streamImageData.width,streamImageData.height);
					},0)
				}
					//				}
				setTimeout(begin.bind(that),1000);//处理图像数据
			});

			function getVideoFrame(video){//获取视频流中的帧
				let canvas = document.createElement('CANVAS');
				canvas.height = video.clientHeight;
				canvas.width = video.clientWidth;
				canvas.style.position = "absolute";
				canvas.style.top = '-10000px';
				let ctx = canvas.getContext('2d');
				ctx.drawImage(video,0,0,video.clientWidth, video.clientHeight);
				//返回图像帧数据
				el.appendChild(canvas);
				return ctx.getImageData(0,0,video.clientWidth, video.clientHeight);
			}
		},
		dealStream(imagedata,ctx){
			this.imagedata = imagedata;
			// this.toGray();
			// this.toTwoDime();
			// this.LaplaceSharpen();
			// this.toRawData();
			this.imageAdd(this.pic,20,60);
			this.imageAdd(this.prepic[0],100,50)
			return this.imagedata;
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
			moveTmpl(tmpl,fn,x=0,y=0,width=0,height=0){//移动tmpl 传入对应的回调fn
				let tmplrow = tmpl.length;
				let tmplcol = tmpl[0].length;
				let imagerow = height?(height+x):this.twoDime.length;
				let imagecol = width?(width+y):this.twoDime[0].length;

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

			},
			//高斯模糊，用于去除孤立噪声,默认3*3，也可用作毛玻璃效果
			CarlFilter(){
				this.moveTmpl([
					[1,2,1],
					[2,4,2],
					[1,2,1]
					],function(tmpl,imagearea){
						let row = tmpl.length;
						let col = tmpl[0].length;
						let sum=0;
						let div = 0;
						for(let i =0;i<tmpl.length;i++){
							for(let j = 0;j<tmpl[0].length;j++){
								div+=tmpl[i][j];
							}
						}
						for(let i = 0;i<row;i++){
							for(let j = 0;j<col;j++){
								sum += tmpl[i][j]*imagearea[i][j];
							}
						}
						return parseInt(sum/div);
					})
			},
			//图片锐化
			Sharpen(){
				this.moveTmpl([
					[-1,-1,-1],
					[-1,9.5,-1],
					[-1,-1,-1]
					],function(tmpl,imagearea){
						let row = tmpl.length;
						let col = tmpl[0].length;
						let sum=0;
						for(let i = 0;i<row;i++){
							for(let j = 0;j<col;j++){
								sum += tmpl[i][j]*imagearea[i][j];
							}
						}
						return sum;
				})
			},
			LaplaceSharpen(){
				this.moveTmpl([
					[0,1,0],
					[1,-4,1],
					[0,1,0]
					],function(tmpl,imagearea){
						let row = tmpl.length;
						let col = tmpl[0].length;
						let sum=0;
						for(let i = 0;i<row;i++){
							for(let j = 0;j<col;j++){
								sum += tmpl[i][j]*imagearea[i][j];
							}
						}
						return sum;
				},0,0,0,0)
			},
			createSizeImg(width,height){//创建指定大小的空白图片，返回imagedata
				let imageEle = document.createElement('IMG');
				imageEle.height = height;
				imageEle.width = width;
				let canvasEle = document.createElement(`CANVAS`);
				let ctx = canvasEle.getContext('2d');

				canvasEle.height = height;
				canvasEle.width = width;
				ctx.drawImage(img, 0, 0);
				let imageData = ctx.getImageData(0, 0, width, height);
				return imageData;
			},
			//不同尺寸的图片应该先通过剪裁或者插值变成相同尺寸 todo
			imageAdd(imagedata2,x,y){
				let imagedata2height = imagedata2.height;
				let imagedata2width = imagedata2.width;
				for(let i = 0;i<imagedata2height;i++){
					for(let j = 0;j<imagedata2width*4;){
						if(imagedata2.data[i*imagedata2width*4+j+3] == 0){
							j = j+4;
							continue;
						}
						this.imagedata.data[(this.imagedata.width*4)*(y+i)+x*4+j] = imagedata2.data[i*imagedata2width*4+j];
						this.imagedata.data[(this.imagedata.width*4)*(y+i)+x*4+j+1] = imagedata2.data[i*imagedata2width*4+j+1];
						this.imagedata.data[(this.imagedata.width*4)*(y+i)+x*4+j+2] = imagedata2.data[i*imagedata2width*4+j+2];
						this.imagedata.data[(this.imagedata.width*4)*(y+i)+x*4+j+3] = imagedata2.data[i*imagedata2width*4+j+3];
						j = j+4;
					}
				}
			},
			imageSub(imagedata2){

			},
			divThreeTunel(){//将彩色图片分为RGBA通道
				this.colorfulTunel = [[],[],[],[]];
				this.imagedata.data
				for(let i = 0;i<this.imagedata.data.length;){
					this.colorfulTunel[0].push(this.imagedata.data[i]);//R
					this.colorfulTunel[1].push(this.imagedata.data[i+1]);//G
					this.colorfulTunel[2].push(this.imagedata.data[i+2]);//B
					this.colorfulTunel[3].push(this.imagedata.data[i+3]);//A
					i = i+4;
				}

			},
			toColorfulImg(){//将RGBA通道数据同步回对象
				let length = this.colorfulTunel[0].length;
				for(let i = 0;i<length;i++){
					this.imagedata.data[4*i] = this.colorfulTunel[0][i];
					this.imagedata.data[1+4*i] = this.colorfulTunel[1][i];
					this.imagedata.data[2+4*i] = this.colorfulTunel[2][i];
					this.imagedata.data[3+4*i] = this.colorfulTunel[3][i];

				}
			},
			createEmptyImageData(width,height){//创建空的图像数据 留作他用
				return new ImageData(width,height);
			},
			transform(widths,heights){//双线性插值，注意对边缘的处理，如果性能问题就考虑最邻近插值
				//对原图的边缘像素添加像素
				let height = this.twoDime.length;
				let width = this.twoDime[0].length;
				let extraRow = 1;
				let extraCol = 1;
				let newTwoDime = [];
				let heightfactor = height/heights;
				let widthfactor = width/widths;

				function hasPos(posx,posy){ //判断新像素在旧像素是否有对应位置
					if(parseInt(posx) !== posx || parseInt(posy) !== posy||
						posx>=this.twoDime.length || posy >= this.twoDime[0].length){
						return -1;
					}else{
						return this.twoDime[posx][posy];
					}
				}

				function getNewValue(i,j){
					posx = i*heightfactor+1 //因为增加了一行一列
					posy = j*widthfactor+1;

					let newPos = hasPos.bind(this)(posx,posy);
					if(newPos == -1){
						//双线性插值
						f00 = this.twoDime[Math.floor(posx)][Math.floor(posy)];
						f10 = this.twoDime[Math.floor(posx)][Math.ceil(posy)];
						f01 = this.twoDime[Math.ceil(posx)][Math.floor(posy)];
						f11 = this.twoDime[Math.ceil(posx)][Math.ceil(posy)];
						return Math.floor(f00*(1-posx)*(1-posy)+f10*posy*(1-posx)+f01*posx*(1-posy)+f11*posx*posy);
					}else{
						return newPos;
					}
				}


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
				for(let i = 0;i<heights;i++){
					newTwoDime.push([]);
					for(let j= 0;j<widths;j++){
						newTwoDime[i][j] = getNewValue.bind(this)(i,j);
					}
				}
				this.twoDime = newTwoDime;
			},
			spin(){
				//中心像素，作为旋转点,90度旋转
				this.y = this.twoDime.length / 2;
				this.x = this.twoDime[0].length / 2;
				let newRect = Math.max(this.twoDime.length,this.twoDime[0].length);
				let newTwoDime = [];
				function spinStep(i,j,angle){//90度
					let x = j*Math.sin(angle)+i*Math.cos(angle)-0.5*newRect*Math.sin(angle)-0.5*Math.cos(angle)*newRect+0.5*this.twoDime.length;
					let y = j*Math.cos(angle)-i*Math.sin(angle)-0.5*newRect*Math.cos(angle)+0.5*Math.sin(angle)*newRect+0.5*this.twoDime[0].length;
					return {
						x:parseInt(x),
						y:parseInt(y)
					}
				}

				function getNewValue(i,j){
					let point = spinStep.bind(this)(i,j,Math.PI/2);
					let x= point.x;
					let y=point.y;
					if(this.twoDime[x][y]){
						return this.twoDime[x][y];
					}else{
						return 0;
					}

				}
				for(let i =0;i<newRect;i++){
					newTwoDime.push([]);
					for(let j = 0;j<newRect;j++){
						newTwoDime[i][j] = getNewValue.bind(this)(i,j);
					}
				}
				this.twoDime = newTwoDime;
			},
			detectFace(){//探测人脸
				// console.log(classier);
				let cascade = classier.opencv_storage.cascade
				// console.log(this.calculusGrap);
				let features = classier.opencv_storage.cascade.features._;
				function getOnePointCalGraphValue(x,y){
					return this.calculusGrap[y][x];
				}
				function getCalGraphValue(x,y,width,height){
					x = parseInt(x);
					y = parseInt(y);
					width  = parseInt(width);
					height = parseInt(height);
					return getOnePointCalGraphValue.bind(this)(x+width,y+height) - 
					getOnePointCalGraphValue.bind(this)(x,y+height)- 
					getOnePointCalGraphValue.bind(this)(x+width,y)+
					getOnePointCalGraphValue.bind(this)(x,y)
				}

				function computeFeture(index){
					let rect = cascade.features._[index].rects._;
					let sum = 0;
					for(let i = 0 ;i<rect.length;i++){
						sum += rect[i][4]*getCalGraphValue.bind(this)(rect[i][0],rect[i][1],rect[i][2],rect[i][3]);
					}
					return sum;
				}

				function isCorrect(res,arr){
					let upper = Math.max(arr[0],arr[1]);
					let lower = Math.min(arr[0],arr[1]);
					if(res>=lower && res<=upper){
						return true;
					}else{
						return false
					}
				}
				// console.log(getCalGraphValue.bind(this)(6,4,12,9))
				for(let i = 0;i<cascade.stageNum;i++){
					for(let j = 0;j<cascade.stages._[i]['maxWeakCount'];j++){
						let weakclassier = cascade.stages._[i].weakClassifiers._[j]
						let res = weakclassier.internalNodes[3]*computeFeture.bind(this)(weakclassier.internalNodes[2]);
						if(!isCorrect.bind(this)(res,weakclassier.leafValues)){
							console.log(res)
							console.log('incorrect');
							return;// 当前子图像不合格
						}else{
							//todo 为强分类器投票做准备
							console.log(11111);
						}
					}
				}
					
			},
			getCalculusGraph(twoDime){
				let newTwoDime = [];
				function getSum(height,width){
					let sum = 0;
					for(let i = 0;i<height;i++){
						for(let j = 0;j<width;j++){
							sum+=twoDime[i][j];
						}
					}
					return sum;
				}
				for(let i = 0;i<twoDime.length;i++){
					newTwoDime.push([]);
					for(let j = 0;j<twoDime[0].length;j++){
						newTwoDime[i][j] = getSum.bind(this)(i,j);
					}
				}
				this.calculusGrap = newTwoDime;
			},
			produceWindow(){//产生检测头像的子窗口
				let height = this.twoDime.length;
				let width = this.twoDime[0].length;

				let childWindow = []
				for(let m=0;m<this.twoDime.length;){
					for(let n=0;n<this.twoDime[0].length;){
						for(let i = 0;i<24;i++){
							childWindow.push([]);
							for(let j = 0;j<24;j++){
								childWindow[i][j] = this.twoDime[i+m*24][j+n*24]
							}
						}
						this.getCalculusGraph.bind(this)(childWindow);//
						this.detectFace.bind(this)();
						n+=24;//步长24
						childWindow = [];
					}
					m+=24
				}
			}
}