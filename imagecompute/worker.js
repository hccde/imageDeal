//因为worker需要序列化反序列化，并且是无论如何都拷贝数据，所以在传递图像数据的时候开销极大
//但是通过类似于C++或者rust中的move borrow 我们可以极大的提高数据传递的效率
class Worker{
	constructor(jsArray){
		//
	}
}
module.exports= {
	Worker
}