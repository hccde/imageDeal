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
	module: {
	loaders: [
		{
			test: /\.js$/,
			loader: "babel",
			query: {
			  presets: ['es2015', 'stage-3']
			}
		},
	]
}
}