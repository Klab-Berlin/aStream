var Transform = require('stream').Transform;

var Lines = function() {
	
	var options = (typeof arguments[0] === 'object') ? typeof arguments[0] : {}
	
	this.preChunks = "";
	this.linebreak = options.linebreak || '\r\n';
}

Lines.prototype = new Transform({objectMode : true});
Lines.prototype.constructor = Lines;

Lines.prototype._transform = function (chunk, encoding, callback) {
	
	var chunksLines = this.preChunks
	.concat(chunk.toString())
	.split(this.linebreak);
	
	this.preChunks = chunksLines.pop();
	
	chunksLines.forEach(this.push.bind(this));
	
	callback();
};

Lines.prototype._flush = function(callback){
	this.push(this.preChunks)
	callback();
}

module.exports = Lines;
