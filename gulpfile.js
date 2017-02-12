	const gulp = require('gulp'),
		xml = require('xml2js').parseString,
		fs = require('fs'),
		babel = require('gulp-babel'),
		path = require('path'),
		webpack = require('webpack');

	const webpackConfig = require('./webpack.config.js');
	const WebpackDevServer = require("webpack-dev-server");

	gulp.task('webpack', function(cb) {
		const compiler = webpack(webpackConfig);
		const server = new WebpackDevServer(compiler, {
			contentBase: path.join(__dirname, "dest"),
			stats: {
				colors: true,
			}
		});
		console.log(path.join(__dirname, "dest"))
		server.listen(8080, "127.0.0.1", function() {
			console.log("Starting server on http://localhost:8080");
		});
	});

	gulp.task('watch', function() {
		gulp.watch(['*.html'],['html']);
	})


	gulp.task('html', function() {
		//todo production env
		// copy html move to dist
		// gulp.src('./*.html')
		fs.readdir(__dirname,(err,files)=>{

			if(err){

			}else{
				files.forEach((file)=>{
					if(file.split('.').pop().toLowerCase() == 'html'){
						gulp.src(file).pipe(gulp.dest("dest"))
					}
				})
			}
		})
	});

	gulp.task('default', ['html'], () => {
		gulp.run(['webpack','watch']);
	});


	gulp.task('xml', function() {
		// let str = fs.readFileSync('./haar.js');
		let obj = require('./haarJSON.js');

		function toNumber(str) {
			str = str.toString()
			if (str.indexOf('e') == -1) {
				console.log(str)
				str = str.split('');
				str.pop();
				return str.join();
			}
			console.log(str)
			let tem = str.split('e');
			tem[1][1] == 0 ? tem[1][1].replace('0', '') : undefined;
			return tem[0] * Math.pow(10, tem[1]);
		}
		//对过滤器的修改
		// obj.opencv_storage.cascade.stages._.forEach(function(e){
		// 	e['weakClassifiers']['_'].forEach(function(ee){
		// 		let tem = ee['internalNodes'].trim().split(' ');
		// 		tem[tem.length-1] = toNumber(tem[tem.length-1]);
		// 		ee['internalNodes'] = tem;

		// 		ee['leafValues'] = ee['leafValues'].trim().split(' ').map(function(eee){
		// 			return toNumber(eee);
		// 		});
		// 	})
		// })

		//对feature的修改
		// obj.opencv_storage.cascade.features._.forEach(function(e){
		// 	e.rects._ = e.rects._.map(function(e){
		// 		let tem = e.trim().split(' ');
		// 		let last = tem[tem.length-1].split('');
		// 		last.pop();
		// 		tem[tem.length-1] = last.join('');
		// 		return tem;
		// 	})
		// })
		fs.writeFileSync('./haarJson.js', JSON.stringify(obj));
	})