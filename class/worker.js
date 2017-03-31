//judge event target
(function(_this) {
	_this.onmessage = function(e) {
		console.log(e)
		console.log('get some info')
	}

	_this.postmessage = function(e) {
		console.log(e)
	}
})(window)