var Transform = require('stream').Transform,
	inherits = require('util').inherits;

var Lines = function() {
	Transform.call(this, { objectMode : true });
	
	var options = (typeof arguments[0] === 'object') ? arguments[0] : {}
	
	this.preChunks = "";
	this.linebreak = options.linebreak || '\r\n';
}
inherits(Lines, Transform);


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
