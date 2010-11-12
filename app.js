// Module dependencies.
'use strict';
var fs = require('fs');
var connect = require('connect');
var express = require('express');
var assetManager = require('connect-assetmanager');
var assetHandler = require('connect-assetmanager-handlers');
var sass = require('sass');

function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}

process.title = 'node-express-boilerplate';
process.addListener('uncaughtException', function (err, stack) {
	console.log('Caught exception: ' + err);
	console.log(err.stack.split('\n'));
});

// Path to our public directory
var pub = __dirname + '/public';

// preManipulate handler for compiling .sass files to .css
var sass_compile = function (file, path, index, isLast, callback) {
	if (path.match(/\.sass$/)) {
		fs.readFile(path, 'utf8', function (err, str) {
			if (err) {
				next(err);
			} else {
				callback(sass.render(str));
			}
		});
	} else {
		callback(file);
	}
};

// assetManager serves our css and js files
var lastChangedCss = 0;
var assets = assetManager({
	'js': {
		'route': /\/public\/js\/[0-9]+\/scripts\.js/,
		'path': './public/js/',
		'dataType': 'js',
		'files': [
			'plugins.js',
			'script.js'
		],
		'preManipulate': {
			'^': []
		},
		'postManipulate': {
			'^': [
				assetHandler.uglifyJsOptimize
			]
		}
	},
	'css': {
		'route': /\/public\/css\/[0-9]+\/styles\.css/,
		'path': './public/css/',
		'dataType': 'css',
		'files': [
			'boilerplate.css',
			'style.sass',
			'boilerplate_media.css'
		],
		'preManipulate': {
			'^': [
				sass_compile,
				assetHandler.fixVendorPrefixes,
				assetHandler.fixGradients
			]
		},
		'postManipulate': {
			'^': [
				assetHandler.yuiCssOptimize,
				assetHandler.replaceImageRefToBase64(__dirname + '/public'),
				function (file, path, index, isLast, callback) {
					// Notifies the browser to refresh the CSS.
					// This enables coupled with jquery.reload.js
					// enables live CSS editing without reload.
					callback(file);
					lastChangedCss = Date.now();
				}
			]
		}
	}
});


var app = express.createServer(
    express.staticProvider(pub)
);

app.configure(function () {
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
	cacheTimeStamps: function (req, res) {
		return assets.cacheTimestamps;
	}
});

//setup the errors
app.error(function (err, req, res, next) {
    if (err instanceof NotFound) {
        res.render('404');
    } else {
        res.render('500');
    }
});

app.get('/', function (req, res) {
    res.render('index');
});

//A Route for Creating a 500 Error (Useful to keep around)
app.get('/500', function (req, res) {
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('/*', function (req, res) {
    throw new NotFound();
});

app.get('/reload/', function (req, res) {
    var reloadCss = lastChangedCss;
    (function reload() {
        setTimeout(function () {
            if (reloadCss < lastChangedCss) {
                res.send('reload');
                reloadCss = lastChangedCss;
            } else {
                reload();
            }
        }, 100);
    }());
});

app.listen(3000);
console.log('Express app started on port 3000');
