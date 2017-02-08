let webpack = require('webpack');
module.exports = {
	devtool:"sourcemap",
	watch:true,
	entry:{
		dest:['./default.js']	
	},
	output:{
		path:'./dest',
		filename:"[name].js"
	},
	module:{
		loaders:[{
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                query: {
                	presets: ['es2015', 'stage-3']
                }
		}]	
	}
}