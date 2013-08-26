var http = require('http');
var Jalali = require('../index.js');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var today = Jalali.today('alphabetic');
	var str = 'امروز ' + Jalali.persianDay() + '، ' + today.d + ' ' + today.m + ' ' + today.y; 
	res.end(str);
}).listen(9999);

console.log('Now : go to http://localhost:9999');

