let webpack = require('webpack');
module.exports = {
	devtool:"sourcemap",
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