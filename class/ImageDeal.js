import utils from '../lib/utils'
import Compute from './Compute'
class ImageDeal{

	constructor(img){
		img instanceof ImageData? (this._imageData = img):
			utils.error('image must be a instance of ImageData');
		this._height = this._imageData.height;
		this._width = this._imageData.width;
		this._oldimageData = this.imageData //keep initally imageData;
		this._Matrix = [];
		this._grayMatrix = [];
	};

	get grayMatrix(){
		if(!this._grayMatrix || this._grayMatrix.length <= 0){
			this.toGrayAbstract();
		}
		return this._grayMatrix;
	};

	set grayMatrix(val){
		return val
	};

	set Matrix(val){
		this._Matrix = val;
	}

	get Matrix(){
		if(!this._Matrix || this._Matrix.length <= 0){
			this.toGrayAbstract();
		}
		return this._Matrix;
	}
	/**
	 * @param  {Element} [dom element wait be appended a child]
	 * @param  {ImageData} [image's imagedata]
	 * @return {[Element]} [image element]
	 */
	out(el,imagedata){
		//async Matrix,grayMatrix and imageData
		if(!imagedata){
			this.asyncData()
			imagedata = this._imageData;
		}
		console.log(imagedata)
		return utils.imageOutput(imagedata,el);
	};
	/**
	 *forced graySaclas and imageData to update ,should avoid this
	 * @return {void}
	 */
	asyncData(){
		this.imageData = ImageDeal.MatrixtoImageData(this.Matrix);
		this._grayMatrix = undefined;
		this.toGrayAbstract();
	}
	/**
	 * turn grayScala Matrix into imagedata
	 * @param  {Array}
	 * @return {ImageData}
	 */
	static grayMatrixtoImageData(grayMatrix){
		let [height,width] = [grayMatrix[0].length,grayMatrix[0][0].length],
			imagedata = new ImageData(width,height),
			data = imagedata.data,
			length = width*height*4,
			apha = grayMatrix[1];
		let offset,value;
		for(let i = 0; i<height; i++){
				offset = i*width*4;
				for(let j = 0; j<width;j++){
					value = grayMatrix[0][i][j];
					data[offset] = value;
					data[offset+1] = value;
					data[offset+2] = value;
					data[offset+3] = apha[i][j];
					offset+=4;

				}
		}
		return imagedata;
	};

	static MatrixtoImageData(Matrix){
		let [r,g,b,a] = [Matrix[0] ,Matrix[1],Matrix[2],Matrix[3]];
		let [height,width] = [r.length,r[0].length];
		let imagedata = new ImageData(width,height),
			data = imagedata.data,
			offset = 0;
		for(let i = 0; i<height; i++){
				offset = i*width*4;
				for(let j = 0; j<width;j++){
					data[offset] = r[i][j];
					data[offset+1] =g[i][j];
					data[offset+2] = b[i][j];
					data[offset+3] = a[i][j];
					offset += 4;
				}
		}
		return imagedata;
	}

	/**
	 * turn imagedata into array
	 * @return {Array} [turn imageData into RGB 2DArray]
	 */
	toAbstract(){
		if(!this._Matrix || this._Matrix.length <= 0){
			let r = [],g=[],b=[],a=[];
			let [width,height,data] = [this._imageData.width,this._imageData.height,this._imageData.data];
			let offset = 0;
			for(let i = 0;i<height;i++){
				r[i] = [];
				b[i] = [];
				g[i] = [];
				a[i] = [];
				offset = i*width*4;
				for(let j = 0;j<width;j++){
					let gray = ( data[offset] * 30 +  data[offset+1] * 59+  data[offset+2] * 11) / 100;
					r[i][j] = data[offset];
					g[i][j] = data[offset+1];
					b[i][j] =data[offset+2];
					a[i][j] = data[offset+3];
					offset += 4;
				}
			}
			this._Matrix = [r,g,b,a];
		}
		return this;
	};

	/**
	 * @return {Array} [turn imageData into gray 2DArray]
	 */
	toGrayAbstract(){
		if(!this._grayMatrix || this._grayMatrix.length <= 0){
			let [width,height,data,grayimageMatrix,apha] = [this._imageData.width,this._imageData.height,
			this._imageData.data,[],[]];
			let offset  = 0;

			for(let i = 0;i<height;i++){
				grayimageMatrix[i] = [];
				apha[i] = [];
				offset = i*width*4;
				for(let j = 0;j<width;j++){
					let gray = ( data[offset] * 30 +  data[offset+1] * 59+  data[offset+2] * 11) / 100;
					// gray = parseInt(gray);
					apha[i][j] = data[offset+3];
					grayimageMatrix[i][j] = gray;
					offset+=4;
				}
			}
			this._grayMatrix = [grayimageMatrix,apha]
		}
		return this;
	};

	toGray(){
		this._imageData =  ImageDeal.grayMatrixtoImageData(this.grayMatrix);
		return this._imageData
	};
}
export default ImageDeal;