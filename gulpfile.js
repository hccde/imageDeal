	let gulp = require('gulp'),
		webpack = require('webpack');

	let webpackConfig = require('./webpack.config.js');
	let connect = require('gulp-connect');//livereload

	gulp.task('webpack',function(cb){
		webpack(webpackConfig, (err, stats) => {
			if(err){
				console.log(err)
			}
  			console.log(stats.toString())
  			cb()
  		});
	});

	gulp.task('watch',function(){
		gulp.watch(['*.html'],['html']);
		gulp.watch(['./*.js','./imagecompute/**/*.js'],['webpack']);
		gulp.watch(['./dest/**/*.js'],['js']);
	})


	gulp.task('html',function(){
		gulp.src('./*.html')
    		.pipe(connect.reload());
	});

	gulp.task('js',function(){
		gulp.src('./dest/*.js')
    		.pipe(connect.reload());
	})

	gulp.task('reload',function(){
		connect.server({
	       livereload: true
	    });
	})

	gulp.task('default',['webpack','reload'],() => {
 		gulp.run(['watch']);
	});