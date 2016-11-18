		let Compute =  require('./imagecompute/main.js');

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
