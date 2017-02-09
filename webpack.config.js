let webpack = require('webpack');
module.exports = {
	devtool:"sourcemap",
<<<<<<< HEAD
	entry:['babel-polyfill','./default.js'],
=======
	watch:true,
	entry:{
		dest:['./default.js']	
	},
>>>>>>> 71ecb9725f4a9df43b7ea61b49260520d38aca96
	output:{
		path:'./dest',
		filename:"dest.js"
	},
<<<<<<< HEAD
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
=======
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
>>>>>>> 71ecb9725f4a9df43b7ea61b49260520d38aca96
}