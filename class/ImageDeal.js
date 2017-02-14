import utils from '../lib/utils'

class ImageDeal{

	constructor(img){
		img instanceof ImageData? (this.imageData = img):
			utils.error('image must be a instance of ImageData');
		this._imageData = this.imageData //keep initally imageData;
		this._grayimageMatrix = [];
		this._grayimage2DMatrix = [];
		this._apha = [];//keep initally imageData apha channel
	};

	/**
	 * @param  {ImageData} imagedata
	 * @return {Array} [generate two-dimensional Array for loop]
	 */
	static imageDataTo2DMatrix(imagedata){
		//for colorful image
	};

	get grayimageMatrix(){
		if(!this._grayimageMatrix || this._grayimageMatrix.length <= 0){
			this.toGray()
		}
		return this._grayimageMatrix;
	};

	set grayimageMatrix(val){
		this._grayimageMatrix = val;
	};

	get grayimage2DMatrix(){
		if(!this._grayimage2DMatrix || this._grayimage2DMatrix.length <= 0){
			this.tograyimage2DMatrix();
		}
		return this._grayimage2DMatrix;
	};

	set grayimage2DMatrix(val){
		this._grayimage2DMatrix = val;
	};

	tograyimage2DMatrix(){
		if(!this._grayimage2DMatrix || this._grayimage2DMatrix.length <= 0){
			let matrix = this.grayimageMatrix,
				width = this.imageData.width,
				height = this.imageData.height,
				matrix2D = [];

			for(let i = 0;i<height;i++){
				 let onerow = [],
				 	rowoffset = i*width;
				for(let j = 0;j<width;j++){
					onerow[j] = matrix[rowoffset+j];
				}
				matrix2D[i] = onerow;
			}
			this._grayimage2DMatrix = matrix2D;
		}
		return this._grayimage2DMatrix;
	}

	out(el,imagedata){
		imagedata = imagedata?imagedata:this.imageData;
		console.log(imagedata)
		return utils.imageOutput(imagedata,el);
	};

	outgrayImageData(){
		let [width,height] = [this.imageData.width,this.imageData.height],
			imagedata = new ImageData(width,height),
			data = imagedata.data;

		let rowoffset 
		for(let i = 0; i<height; i++){
				rowoffset = i*width*4;

				let offset,value;
				for(let j = 0; j<width;j++){
					value = this.grayimage2DMatrix[i][j];
					imagedata.data[rowoffset] = value;
					imagedata.data[rowoffset+1] = value;
					imagedata.data[rowoffset+2] = value;
					imagedata.data[rowoffset+3] = this._apha[rowoffset/4];
					rowoffset+=4;
				}
		}
		this.imageData = imagedata;
		return this;
	};

	toGray(){
		if(!this._grayimageMatrix || this._grayimageMatrix.length <= 0){
			const length = this.imageData.data.length
			for (let i = 0,j=0; i < length;j++) {
				let gray = (this.imageData.data[i] * 30 + this.imageData.data[i + 1] * 59
					 + this.imageData.data[i + 2] * 11) / 100;
				gray = parseInt(gray);
				this._grayimageMatrix[j] = gray;
				this._apha[j] = this.imageData.data[i+3];
				i = i + 4;
			}
		}
		return this._grayimageMatrix;
	}
}
export default ImageDeal;