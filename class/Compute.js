import utils from '../lib/utils';

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

	
}

export default Compute;