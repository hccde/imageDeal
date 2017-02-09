let webpack = require('webpack');
module.exports = {
	devtool:"sourcemap",
	watch:true,
	entry:['babel-polyfill','./default.js'],
	output:{
		path:'./dest',
		filename:"dest.js"
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