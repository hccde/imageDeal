import Compute from './Compute';
import ImageDeal from './ImageDeal';
import utils from '../lib/utils';

class AbstructCompute{
	constructor(matrix){
		this.Matrix = matrix
	}
	/**
	 * [Gaussian blur]
	 * @param {Array}  mask [mask tmpl]
	 */
	CarlFilter(mask = [
					[2,4,5,4,2],
					[4,9,12,9,4],
  					[5,12,15,12,5],
  					[4,9,12,9,4],
  					[2,4,5,4,2]] ){
		let arr = [this.Matrix[0],this.Matrix[1],this.Matrix[2]].map((matrix)=>{
			let compute = new Compute(matrix)
			return compute.moveTmpl(mask,function(tmpl,imagearea){
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
		})
		arr.push(this.Matrix[3]);
		return ImageDeal.MatrixtoImageData(arr);
	}

	//图片锐化
	Sharpen(mask=[
				[-1, -1, -1],
				[-1, 9.5, -1],
				[-1, -1, -1]
			]) {
		let arr = [this.Matrix[0],this.Matrix[1],this.Matrix[2]].map((matrix)=>{
			let compute = new Compute(matrix)
			return compute.moveTmpl(mask, function(tmpl, imagearea) {
				let row = tmpl.length,
					col = tmpl[0].length,
					sum = 0;
				for (let i = 0; i < row; i++) {
					for (let j = 0; j < col; j++) {
						sum += tmpl[i][j] * imagearea[i][j];
					}
				}
				return sum;
			})
		})
		arr.push(this.Matrix[3]);

		return ImageDeal.MatrixtoImageData(arr);
	};

	LaplaceSharpen(mask = [
				[0, 1, 0],
				[1, -4, 1],
				[0, 1, 0]
			]){
		let arr = [this.Matrix[0],this.Matrix[1],this.Matrix[2]].map((matrix)=>{
			let compute = new Compute(matrix)
			return compute.moveTmpl(mask, function(tmpl, imagearea) {
				let row = tmpl.length;
				let col = tmpl[0].length;
				let sum = 0;
				for (let i = 0; i < row; i++) {
					for (let j = 0; j < col; j++) {
						sum += tmpl[i][j] * imagearea[i][j];
					}
				}
				return sum;
			})
		});
		arr.push(this.Matrix[3]);

		return ImageDeal.MatrixtoImageData(arr);
	}
	/**
	 * merge image,will change matrix
	 * @param {[Array]} matrix array
	 * @param {[int]} x      point x
	 * @param {[int]} y      point y
	 */
	Merge(matrix,x,y){
		let [r,g,b,a] = matrix,
		width_small = r[0].length,
		height_small = r.length;

		let [_r,_g,_b,_a] = this.Matrix;
		for(let i = y,m=0;i<height_small+y;i++,m++){
			for(let j =x,n=0;j<width_small+x;j++,n++){
				let apha = (a[m][n]/255).toFixed(2);
				_r[i][j] = r[m][n]*apha+(1-apha)*_r[m][n];
				_g[i][j] = g[m][n]*apha+(1-apha)*_g[m][n];
				_b[i][j] = b[m][n]*apha+(1-apha)*_b[m][n];
				// _r[i][j] = a[m][n];
			}
		}
		return ImageDeal.MatrixtoImageData(this.Matrix);
	}
	/**
	 * [Mosaic description]
	 * @param {[int]} n      [begin point-x]
	 * @param {[int]} m     [begin point-y]
	 * @param {[int]} height [area height]
	 * @param {[int]} width  [area width]
	 */
	Mosaic(n,m,width=20,height=20){
		let arr = [this.Matrix[0],this.Matrix[1],this.Matrix[2]].map((matrix)=>{
				let value = matrix[m][n],
				_height = height+m,
				_width = width+n;

				for(let i = n;i<_height;i++){
					for(let j = m;j<_width;j++){
						matrix[i][j] = value;
					}
				}
				return matrix;
			})

		arr.push(this.Matrix[3]);

		return ImageDeal.MatrixtoImageData(arr);
	};
	//rotate image
	//todo  something error
	Rotate(x,y,deg){
		let newmatrix = utils.copyArray(this.Matrix);
		let [width,height] = [newmatrix[0][0].length,newmatrix[0].length];
		function getr(n,m){
				return Math.pow(Math.pow(n-x,2)+Math.pow(m-y,2),0.5);
			}
		
		let arr = [this.Matrix[0],this.Matrix[1],this.Matrix[2]].map((matrix,index)=>{
			let cur = newmatrix[index];
			function rotate(matri){
				let mappointx,mappointy;
				for(let i = 0;i<height;i++){
					for(let j = 0;j<width;j++){
						// newmatrix[i][j]
						let r = getr(j,i);
						// mappointx = parseInt(j+r*Math.sin(deg));
						// mappointy = parseInt(i+r-r*Math.cos(deg));
						mappointy = parseInt((j-x)*Math.cos(deg)+(j-y)*Math.sin(deg)+y);
						mappointx = parseInt((j-x)*Math.sin(deg)+(i-y)*Math.cos(deg)+x);
						if(matri[mappointy] && matrix[mappointy][mappointx]){
							cur[i][j] = matrix[mappointy][mappointx];
						}else{
							cur[i][j] = 255;
						}
					}
				}
				return cur;
		}
			return rotate(matrix);
		})
		arr.push(this.Matrix[3]);

		return ImageDeal.MatrixtoImageData(arr);
	};

	/**
	 * split image
	 * @param  {[int]} n [each line]
	 * @param  {[int]} m [each col]
	 * @return {[type]}   [description]
	 */
	Split(n,m){
		let arr = [this.Matrix[0],this.Matrix[1],this.Matrix[2],this.Matrix[3]].map((matrix)=>{
				let compute = new Compute(matrix);
				return compute.split(n,m);
		});
		let res = []
		for(let i = 0;i<n;i++){
			res.push([]);
			for(let j = 0;j<m;j++){
				let smallimage = [arr[0][i][j],arr[1][i][j],arr[2][i][j],arr[3][i][j]];
				res[i][j] = ImageDeal.MatrixtoImageData(smallimage);
			}
		}
		console.log(res);
		return res
	};

	DetectFace(){
		let compute = new Compute(this.grayMatrix[0]);
		compute.detectface();
		// console.log(this.GetIntegralImage(this.grayMatrix[0]))
		return ImageDeal.grayMatrixtoImageData(this.grayMatrix);
		// 
	}

	transform() {
		let height = this.grayMatrix.length;
		let width = this.grayMatrix[0].length;
		let extraRow = 1;
		let extraCol = 1;
		let newgrayMatrix = [];
		let heightfactor = height / heights;
		let widthfactor = width / widths;

		function hasPos(posx, posy) { //判断新像素在旧像素是否有对应位置
			if (parseInt(posx) !== posx || parseInt(posy) !== posy ||
				posx >= this.grayMatrix.length || posy >= this.grayMatrix[0].length) {
				return -1;
			} else {
				return this.grayMatrix[posx][posy];
			}
		}

		function getNewValue(i, j) {
			posx = i * heightfactor + 1 //因为增加了一行一列
			posy = j * widthfactor + 1;

			let newPos = hasPos.bind(this)(posx, posy);
			if (newPos == -1) {
				//双线性插值
				f00 = this.grayMatrix[Math.floor(posx)][Math.floor(posy)];
				f10 = this.grayMatrix[Math.floor(posx)][Math.ceil(posy)];
				f01 = this.grayMatrix[Math.ceil(posx)][Math.floor(posy)];
				f11 = this.grayMatrix[Math.ceil(posx)][Math.ceil(posy)];
				return Math.floor(f00 * (1 - posx) * (1 - posy) + f10 * posy * (1 - posx) + f01 * posx * (1 - posy) + f11 * posx * posy);
			} else {
				return newPos;
			}
		}


		//上面添加行
		for (let i = 0; i < extraRow; i++) {
			this.grayMatrix.unshift(this.grayMatrix[2 * i + 1]) //插入行的时候下标也变了！注意
		}
		// 	//下面添加行
		for (let i = 0; i < extraRow; i++) {
			this.grayMatrix.push(this.grayMatrix[this.grayMatrix.length - 2 - i])
		}
		// 	//左边添加列
		for (let i = 0; i < this.grayMatrix.length; i++) {
			for (let k = 0; k < extraCol; k++) {
				this.grayMatrix[i].unshift(this.grayMatrix[i][2 * k + 1]);
			}
		}
		// 	//右边添加列
		for (let i = 0; i < this.grayMatrix.length; i++) {
			for (let k = 0; k < extraCol; k++) {
				this.grayMatrix[i].push(this.grayMatrix[i][this.grayMatrix[0].length - 2 - k])
			}
		}
		for (let i = 0; i < heights; i++) {
			newgrayMatrix.push([]);
			for (let j = 0; j < widths; j++) {
				newgrayMatrix[i][j] = getNewValue.bind(this)(i, j);
			}
		}
		this.grayMatrix = newgrayMatrix;
	}


}

export default AbstructCompute;