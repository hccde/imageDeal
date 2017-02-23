import utils from '../lib/utils';
import ImageDeal from './ImageDeal';
import classier from '../haarjson.js';

class Compute{
	constructor(matrix){
		this.Matrix = matrix;
		this._Matrix = utils.copyArray(matrix);
	}
	/**
	 * Template operation
	 * @param  {Array} tmpl [2D Array]
	 * @param  {Array} fn [compute function]
	 * @param  { int } height [ Moving distance]
	 * @param  { int } width [Moving distance]
	 * @return {[Array]}   [Calculation results]
	 */
	moveTmpl(tmpl,fn,begin_x=0,begin_y=0,width_len,height_len){//移动tmpl 传入对应的回调fn
		// copy
		let matrix = utils.copyArray(this._Matrix);
		let tmplrow = tmpl.length,
			tmplcol = tmpl[0].length,
			imagerow = this.Matrix.length,
			imagecol = this.Matrix[0].length;
		//extra pixel
		let extraRow = Math.ceil((tmplrow - 1) / 2),
		extraCol = Math.ceil((tmplcol - 1) / 2);
		begin_y = begin_y?begin_y+extraRow:extraRow,
		begin_x = begin_x?begin_x+extraCol:extraCol;

		height_len = height_len?height_len:imagerow;
		width_len = width_len?width_len:imagecol;
		//extra row
		for (let i = 0; i < extraRow; i++) {
			matrix.unshift(matrix[0].concat([]))
			matrix.push(matrix[matrix.length - 1].concat([]))
		}
		//extra col
		for (let i = 0; i < matrix.length; i++) {
			for (let k = 0; k < extraCol; k++) {
				matrix[i].unshift(matrix[i][0]);
				matrix[i].push(matrix[i][matrix[i].length - 1])
			}
		}

		let _row = Math.floor(tmplrow/2),
			_col = Math.floor(tmplcol/2);
		function getArea(r, c) {
			let area = []
			
			for (let i = 0; i < tmplrow; i++) {
				area.push([]);
				for (let j = 0; j < tmplcol; j++) {
					area[i][j] = matrix[r -_row+i][c - _col+j];
				}
			}
			return area;
		}
		//key step
		for (let i = begin_y,n=begin_y-extraRow; i < height_len+begin_y; i++,n++) { //for loop compute 
			for (let j = begin_x,m=begin_x-extraCol; j < width_len+begin_x; j++,m++) {
				this._Matrix[n][m] = fn(tmpl, getArea(i, j));
			}
		}

		return this._Matrix;
	};

	split(n,m){
		let width = this.Matrix[0].length,
			height = this.Matrix.length,
			row = Math.floor(width/n),
			col = Math.floor(height/m);

			// console.log(row,col) 250 167
			//cant be split into more than 36
			if(n*m >36 )
				utils.error('cant be split into more than 36')

			let getArea = (rowindex,colindex)=>{
				let area = [];
				let height_begin = colindex*col,
					height_end = height_begin+col,
					width_begin = rowindex*row,
					width_end = width_begin+row;
				for(let i = height_begin,k=0;i<height_end;i++,k++){
					area.push([])
					for(let j = width_begin,l=0;j<width_end;j++,l++){
						area[k][l] = this.Matrix[i][j];
					}
				}
				return area;
			}

			let res = []
			for(let i = 0;i<n;i++){
				res.push([])
				for(let j = 0;j<m;j++){
					res[i][j] = getArea(i,j);
				}
			}
			return res;
	};

	GetIntegralImage(){
		let graymatrix = utils.copyArray(this.Matrix);
		let height = graymatrix.length,
			width = graymatrix[0].length,
			integralImage = utils.copyArray(graymatrix);
		//extra row 
		integralImage.unshift(new Array(width).fill(0));
		//extra col
		for (let i = 0; i < height; i++) {
				integralImage[i].unshift(0);
		}

		for(let n=1;n<=height;n++){
			for(let m=1;m<=width;m++){
				integralImage[n][m]  =  integralImage[n][m]+integralImage[n-1][m]+
					integralImage[n][m-1]-integralImage[n-1][m-1];
			}
		}

		integralImage.shift();
		//extra col
		for (let i = 0; i < height; i++) {
				integralImage[i].shift();
		}

		return this.integralImage = integralImage;
	};

	classify(pointx,pointy){
		let weakSum = 0,
			cascade = classier.opencv_storage.cascade,
			features = classier.opencv_storage.cascade.features._,
			stageNum = cascade.stageNum,
			length = this.Matrix.length*this.Matrix[0].length;
		let getOnePointCalGraphValue = (x,y)=>{
			return this.integralImage[y][x]; //todo
		}

		function isCorrect(res,arr,jud){
			console.log(res,jud)
			if (res > jud) {
				// console.log('arr[1]',arr[1])
				return arr[1];
			} else {
				// console.log('arr[0]',arr[0])
				return arr[0]
			}
		}

		function getCalGraphValue(x, y, width, height) {
			x = parseInt(x);
			y = parseInt(y);
			width = parseInt(width);
			height = parseInt(height);
			return getOnePointCalGraphValue(pointx+x + width, pointy+y + height) -
				getOnePointCalGraphValue(pointx+x,pointy+y + height) -
				getOnePointCalGraphValue(pointx+x + width, pointy+y) +
				getOnePointCalGraphValue(x+pointx, y+pointy)
		}

		let computeFeture = (index)=>{
			let rect = features[index].rects._;
			let sum = 0;
			for(let i = 0 ;i<rect.length;i++){
				sum += rect[i][4]*getCalGraphValue(rect[i][0],rect[i][1],rect[i][2],rect[i][3]);
			}
			return sum;
		}

		for (let i = 0; i < stageNum; i++) {
			 let maxWeakCount = cascade.stages._[i]['maxWeakCount']
			for (let j = 0; j < maxWeakCount; j++) {
				let weakclassier = cascade.stages._[i].weakClassifiers._[j];
				let res = computeFeture(weakclassier.internalNodes[2]) / length;

				weakSum += isCorrect(res, weakclassier.leafValues, weakclassier.internalNodes[3]);
			}

			let stageThreshold = cascade.stages._[i]['stageThreshold'];

			// console.log(weakSum)
			// console.log(stageThreshold)

			if (weakSum <= stageThreshold) {
				weakSum = 0;
				console.log('no');
				return;
			}
			weakSum = 0;
		}
		console.log('ok')
	}

	detectface(){
		let height = this.Matrix.length-24,
			width = this.Matrix[0].length-24;

		this.GetIntegralImage();
		// this.classify(150,250);
		for(let i = 0;i<height;i++){
			for(let j = 0;j<width;j++){
				this.classify(j,i);
			}
		}
	}
}

export default Compute;