//因为worker需要序列化反序列化，并且是无论如何都拷贝数据，所以在传递图像数据的时候开销极大
//但是通过类似于C++或者rust中的move borrow 我们可以极大的提高数据传递的效率
class Worker{
	constructor(jsArray){
		for(let i = 0;i<jsArray.length;i++){

		};
		this.workers = jsArray.map(function(e) { //根据机器核的数目来确定开的webworker的数目，一个新的worker就是新的线程
			return new window.Worker(e);
		});
	}

	*_receive(){//主线程接受来自worker的消息调用fn，生成器函数
		let fn = function(){};
		for(let i = 0;i< this.workers.length;i++){
			this.workers[i].onmessage = yield fn;
		}
		return 0;
	}

	*_send(){
		let param = {};
		for(let i = 0;i<this.workers.length;i++){
			 let realparam = yield param;
			  // window.Worker.prototype.postMessage.call(this.workers[i],'11')
			this.workers[i].postMessage('11');//主线程向worker传递数据,move和borrow
		}
		return 11;
	}

	receive(){
		let rece = this._receive();
		return rece;
	}

	send(){
		let sen = this._send();
		return sen;
	}

}
module.exports= {
	Worker
}