let webpack = require('webpack');
module.exports = {
	devtool:"sourcemap",
	entry:['babel-polyfill','./default.js'],
	output:{
		path:'./dest',
		filename:"dest.js"
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