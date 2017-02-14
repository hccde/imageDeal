import utils from '../lib/utils'

class ImageDeal{

	constructor(img){
		img instanceof ImageData? (this._imageData = img):
			utils.error('image must be a instance of ImageData');
		this._height = this._imageData.height;
		this._width = this._imageData.width;
		this._oldimageData = this.imageData //keep initally imageData;
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

	get imageData(){
		return this._imageData;
	}

	set imageData(val){
		this._imageData = val;
		this._grayimageMatrix = undefined;
		this._grayimage2DMatrix = undefined;
		this._height = val.height;
		this._width = val.width;
		this.toGray();
		this.tograyimage2DMatrix();
	}

	get grayimageMatrix(){
		if(!this._grayimageMatrix || this._grayimageMatrix.length <= 0){
			this.toGray();
		}
		return this._grayimageMatrix;
	};

	set grayimageMatrix(val){
		//it should not be assigned out of class explicitly
		//if it be assigned we will async 2DMatrix,but it's unable,because we don't know height value or w
		//width value
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
		this._height = val.length;
		this._width = val[0].length;

		//todo async Matrix
		this._imageData = ImageDeal.Matrix2DtoImageData(val,this._apha);
		this._grayimageMatrix = undefined;
		this._grayimage2DMatrix = undefined;
		this.toGray();
		this.tograyimage2DMatrix();
	};

	tograyimage2DMatrix(){
		if(!this._grayimage2DMatrix || this._grayimage2DMatrix.length <= 0){
			let matrix = this.grayimageMatrix,
				width = this._width,
				height = this._height,
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
		imagedata = imagedata?imagedata:this._imageData;
		console.log(imagedata)
		return utils.imageOutput(imagedata,el);
	};

	static Matrix2DtoImageData(grayimage2DMatrix,apha){
		let [width,height] = [this._width,this._height],
			imagedata = new ImageData(width,height),
			data = imagedata.data,
			length = width*height*4;
			if(!apha){
				let obj = new Proxy({}, {
      				get: function (target, key, receiver) {
        				return 255;
      				},
      				set: function (target, key, value, receiver) {
        				return 255;
      				}
    			});
      		apha = obj
		}
		let rowoffset 
		for(let i = 0; i<height; i++){
				rowoffset = i*width*4;

				let offset,value;
				for(let j = 0; j<width;j++){
					value = grayimage2DMatrix[i][j];
					imagedata.data[rowoffset] = value;
					imagedata.data[rowoffset+1] = value;
					imagedata.data[rowoffset+2] = value;
					imagedata.data[rowoffset+3] = apha[rowoffset/4];
					rowoffset+=4;
				}
		}
		return imagedata;
	};

	toGray(){
		if(!this._grayimageMatrix || this._grayimageMatrix.length <= 0){
			const length = this._imageData.data.length
			for (let i = 0,j=0; i < length;j++) {
				let gray = (this._imageData.data[i] * 30 + this._imageData.data[i + 1] * 59
					 + this._imageData.data[i + 2] * 11) / 100;
				gray = parseInt(gray);
				this._grayimageMatrix[j] = gray;
				this._apha[j] = this._imageData.data[i+3];
				i = i + 4;
			}
		}
		return this;
	}
}
export default ImageDeal;