let webpack = require('webpack');
module.exports = {
	entry:{
		dest:['./default.js']	
	},
	output:{
		path:'./dest',
		filename:"[name].js"
	},
	module:{
		
	}
}