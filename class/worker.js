//judge event target
//change data form 
//data = {type:'Worker',data:any}

(function(_this) {
	_this.onmessage = function(e) {
		if(e.data&&e.data.type=='Worker'){
			console.log('onmessage')
		}
	}

	_this.postmessage = function(e) {
		if(e.data&&e.data.type=='Worker'){
			console.log('postmessage')
		}
	}
})(window)