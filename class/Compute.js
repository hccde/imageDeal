import utils from '../lib/utils';

class Compute{
	constructor(matrix){
		this.Matrix = matrix;
		this._Matrix = utils.copyArray(matrix);
	}
	/**
	 * Template operation
	 * @param  {Array} tmpl [2D Array]
	 * @return {[Array]}   [computed array]
	 */
	moveTmpl(tmpl,fn){//移动tmpl 传入对应的回调fn
		// copy
		let matrix = utils.copyArray(this._Matrix);
		let tmplrow = tmpl.length,
			tmplcol = tmpl[0].length,
			imagerow = this.Matrix.length,
			imagecol = this.Matrix[0].length;
		//extra pixel
		let extraRow = Math.ceil((tmplrow - 1) / 2);
		let extraCol = Math.ceil((tmplcol - 1) / 2);

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

		function getArea(r, c) {
			let area = []
			for (let i = 0; i < tmplrow; i++) {
				area.push([]);
				for (let j = 0; j < tmplcol; j++) {
					area[i][j] = matrix[r + i][j + c];
				}
			}
			return area;
		}
		//key step
		for (let i = extraRow,n=0; i <= imagerow; i++,n++) { //for loop compute 
			for (let j = extraCol,m=0; j <= imagecol; j++,m++) {
				this._Matrix[n][m] = fn(tmpl, getArea(n, m));
			}
		}

		return this._Matrix;
	};

}

export default Compute;