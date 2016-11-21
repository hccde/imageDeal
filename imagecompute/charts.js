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
		console.log(opt.data)
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
		let dataYStep = this.canvas.height/(dataMax - dataMin)*50;
		let that = this;
		opt.data.forEach(function(e,index){
			//画图
			data.moveTo(index*dataXStep,e*dataYStep);
			data.lineTo((index+1)*dataXStep,e*dataYStep);
			data.lineTo((index+1)*dataXStep,that.canvas.height);
		});
		this.ctx.stroke(data);
	}
}

module.exports= {
	Histogram

}