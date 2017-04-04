//judge event target
//change data form 
//data = {type:'Worker',data:any}

(function() {
	function start(){
		onmessage = function(e) {
			if(e.data&&e.data.type=='Worker'){
				console.log('onmessage'+e.data.data);
				post();
			}
		}
	}

	function post(){
		let data = {content:'from Worker'};
		postMessage(JSON.stringify(data));
	}
	
	start();
})()