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

	transform(width,height,mask=[
			[1,2,1],
			[2,4,2],
			[1,2,1]]){//version 2
		width = parseInt(width);
		height = parseInt(height);
		let xfactor = this._width/width,
			yfactor = this._height/height;

		this.Matrix = this.Matrix.map((arr,index)=>{
			return this._transform(width,height,arr,xfactor,yfactor)
		});
		
		if(xfactor==1&&yfactor==1){
			return ImageDeal.MatrixtoImageData(this.Matrix);			
		}else{
			//default CarlFilter
			return this.CarlFilter(mask);
		}
	}

	_transform(width,height,arr,xfactor,yfactor){
		let transformed = [];
		for(let i = 0;i<height;i++){
			transformed.push([]);
			for(let j = 0;j<width;j++){
				//get transformed value
				transformed[i][j] = this._bilinear(j,i,xfactor,yfactor,arr);
			}
		}
		
		return transformed;
	}
	//Bilinear interpolation
	_bilinear(w,h,xfactor,yfactor,arr){//arr is one of rgba channel
		let x = w*xfactor,y = h*yfactor;
		if(arr[y] && arr[y][x]!=undefined){
			return arr[y][x];
		}

		let height = this._height,width = this._width,
			intx = parseInt(x),inty = parseInt(y),
			intx1 = intx+1,inty1 = inty+1;
			intx1 = intx1>=width?width-1:intx1;
			inty1 = inty1>=height?height-1:inty1;

		let x0y0 = arr[inty][intx],x1y0 = arr[inty][intx1],
			x0y1  = arr[inty1][intx],x1y1 = arr[inty1][intx1];
			// console.log(x0y0,x1y0,x0y1,x1y1);
		let newval = x0y1*(intx1-x)*(inty1-y)+x1y1*(x-intx)*(inty1-y)+
			x0y0*(intx1-x)*(y-inty)+x1y0*(x-intx)*(y-inty);
		return newval;
	}


}

export default AbstructCompute;