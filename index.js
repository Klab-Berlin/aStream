var fs = require('fs'),
	lib = __dirname + '/lib';
	
fs.readdirSync(lib).forEach(function(plugin){
	module.exports[plugin.replace(/\.js$/g, "")] = require(lib + '/' + plugin);
});