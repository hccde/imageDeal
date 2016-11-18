	let gulp = require('gulp'),
		webpack = require('webpack');
	let webpackConfig = require('./webpack.config.js')
	gulp.task('webpack',function(cb){
		webpack(webpackConfig, (err, stats) => {
			if(err){
				console.log(err)
			}
  			console.log(stats.toString())
  			cb()
  		});
	});

	gulp.task('default',() => {
 		gulp.run(['webpack']);
	});