let webpack = require('webpack');
let path = require('path');
module.exports = {
	devtool:"sourcemap",
	watch:true,
	entry:['webpack-dev-server/client?http://localhost:8080/','babel-polyfill','./default.js'],
	devServer: {
  		contentBase: path.join(__dirname, "dest"),
  		compress: true,
  		port: 8080
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
            	},{
                	test:/\.html$/,
                	loader: 'html-loader',
    				query: {
      					minimize: true
    				}
                },{
                	test: /\.jpg$/, loader: "file-loader" 
             	},
      			{ 
      				test: /\.png$/, loader: "url-loader?mimetype=image/png" 
      			}]	
	},
	plugins:[
  		new webpack.HotModuleReplacementPlugin(),
  		new webpack.DefinePlugin({
  			_ENV_DEV:JSON.stringify(true)// we can judge environment in source code
		  }),
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false
      //   }
      // })
	]
}