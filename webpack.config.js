let webpack = require('webpack');
let path = require('path');
module.exports = {
	devtool:"sourcemap",
	watch:true,
	entry:['babel-polyfill','./default.js'],
	devServer: {
  		contentBase: path.join(__dirname, "dist"),
  		compress: true,
  		port: 9000
	},
	output:{
		path:path.join(__dirname, "dist"),
		filename:"dest.js"
	},
	module:{
		loaders:[{
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                query: {
                	presets: ['es2015', 'stage-3'],
                	// sourceMaps: ['both']//babel的sourcemap
                }
		}]	
	},
	plugins:[
  		new webpack.HotModuleReplacementPlugin()
	]
}