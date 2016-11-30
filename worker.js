	onmessage = function(e){//newWorker时把js函数传进来
		let receObject = JSON.parse(e.data);
		let jsFn = function(){};
		if(receObject.type == 'function'){
			let jsStr = receObject.value;
			jsFn = new Function(jsStr);
		}else{
			let res = jsFn(e.data);
			postMessage(JSON.stringify(res));
		}
		// jsFn()
	// postMessage("I\'m working before postMessage(\'ali\').");
	}