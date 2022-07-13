;(function(){
	// update temporarily for Secure Render:

	var http = require('http'), fs = require('fs'), path = require('path');

	http.createServer(function(req, res){
		if(res.setHeader){ res.setHeader('Access-Control-Allow-Origin', '*') }
		if(!req.url){ return res.end(404+'') }
		var dir = path.resolve(), file = path.join(dir, req.url);
		if(file.slice(0, dir.length) != dir){ return res.end(404+'') }
		var ext = file.split('.').slice(-1)[0];
		if(ext == 'js'){ res.writeHead(200, {'Content-Type': 'text/javascript'}) }
		if(ext == 'css'){ res.writeHead(200, {'Content-Type': 'text/css'}) }
		if(ext == 'html'){ res.writeHead(200, {'Content-Type': 'text/html'}) }
		var stream = fs.createReadStream(file);
		stream.on('error', function(err){ res.end(404+'') });
		stream.pipe(res);
	}).listen(8769);
	console.log(":8769");

	return;
	var gun = require('gun/examples/http');
	if(!gun.back){ return } // http example auto spawns subprocess
	
	var fs = require('fs');
	var server = gun.back('opt.web');
	var route = server.route = {}
	
	fs.readdir('./route', function(err, dir){
		if(err || !dir){ return }
		dir.forEach(function(file){
			if(!file){ return }
			route[file.split('.')[0]] = require('./route/'+file);
		});
	});
}());