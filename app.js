// Module dependencies.
var fs = require('fs');
var connect = require('connect');
var express = require('express');
var assetManager = require('connect-assetmanager');
var assetHandler = require('connect-assetmanager-handlers');
var sass = require('sass');

process.title = 'node-express-boilerplate';
process.addListener('uncaughtException', function (err, stack) {
	console.log('Caught exception: ' + err);
	console.log(err.stack.split('\n'));
});

// Path to our public directory
var pub = __dirname + '/public';

// preManipulate handler for compiling .sass files to .css
sass_compile = function (file, path, index, isLast, callback) {
	fs.readFile(path, 'utf8', function(err, str){
		if (err) {
			next(err);
		} else {
			callback(sass.render(str))
		}
	});
};

// assetManager serves our css and js files
var assets = assetManager({
	'js': {
		'route': /\/public\/js\/[0-9]+\/.*\.js/,
		'path': './public/js/',
		'dataType': 'js',
		'files': [
			'jquery-1.4.3.min.js'
			, 'script.js'
		],
		'preManipulate': {
			'^': []
		},
		'postManipulate': {
			'^': [
				assetHandler.uglifyJsOptimize
			]
		},
	}, 
	'css': {
		'route': /\/public\/css\/[0-9]+\/.*\.css/,
		'path': './public/css/',
		'dataType': 'css',
		'files': [
			'styles.sass'
		],
		'preManipulate': {
			'^': [
				sass_compile
				, assetHandler.yuiCssOptimize
				, assetHandler.fixVendorPrefixes
				, assetHandler.fixGradients
				, assetHandler.replaceImageRefToBase64(__dirname + '/public')
			]
		},
		'postManipulate': {
			'^': [
				function (file, path, index, isLast, callback) {
					// Notifies the browser to refresh the CSS.
					// This enables coupled with jquery.reload.js 
					// enables live CSS editing without reload.
					callback(file);
					lastChangedCss = Date.now();
				}
			]
		},
	}
});


var app = express.createServer(
    express.staticProvider(pub)
);

app.configure(function() {
	app.use(connect.conditionalGet());
	app.use(connect.gzip());
	app.use(connect.bodyDecoder());
	app.use(connect.logger());
	app.use(assets);
});

// Optional since express defaults to CWD/views
app.set('views', __dirname + '/views');

// Set our default template engine to "jade"
app.set('view engine', 'jade');

app.dynamicHelpers({
	cacheTimeStamps: function(req, res) {
		return assets.cacheTimestamps;
	},
});

app.get('/', function(req, res){
    res.render('index');
});

var lastChangedCss = 0;
app.get('/reload/', function(req, res) {
	var reloadCss = lastChangedCss;
	(function reload () {
		setTimeout(function () {
			if ( reloadCss < lastChangedCss) {
				res.send('reload');
				reloadCss = lastChangedCss;
			} else {
				reload();
			}
		}, 100);
	})();
});

app.listen(3000);
console.log('Express app started on port 3000');