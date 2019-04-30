var fs = require('fs');

var javascript = fs.readFileSync('./distribution/index.js');
var header = fs.readFileSync('./openuserjs/header.js');
var start = fs.readFileSync('./openuserjs/start.js');
var end = fs.readFileSync('./openuserjs/end.js');

fs.openSync('./openuserjs/script-dist.js', 'w');
fs.appendFileSync('./openuserjs/script-dist.js', header);
fs.appendFileSync('./openuserjs/script-dist.js', start);
fs.appendFileSync('./openuserjs/script-dist.js', javascript);
fs.appendFileSync('./openuserjs/script-dist.js', end);