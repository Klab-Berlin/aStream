var Readable = require('stream').Readable,
	fs = require('fs'),
	inherits = require('util').inherits;
	
var ReadDir = function(dir){
	Readable.call(this, { objectMode : true });
	this.dir = dir;
	this.files = fs.readdirSync(dir);
}

inherits(ReadDir, Readable);

ReadDir.prototype._read = function(){
	var data = this.files.length > 0 ? this.dir + '/' + this.files.shift() :  null
	this.push(data);
}

module.exports = ReadDir;