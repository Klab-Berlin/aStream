var Duplex = require('stream').Duplex,
	inherits = require('util').inherits;

var Lines = function() {
	Duplex.call(this, { objectMode : true, highWaterMark : 10});
	
	var options = (typeof arguments[0] === 'object') ? arguments[0] : {}
	
	this.chunksLines = [];
	this.linebreak = options.linebreak || '\r\n';
	this.reading = false;
	this.callbacks = [];
}
inherits(Lines, Duplex);

Lines.prototype._read = function(){
	this.reading = true;
	this.send();
}

Lines.prototype._write = function (chunk, encoding, callback) {
	var preChunk = this.chunksLines.length > 0 ? this.chunksLines.pop() : "";
	
	var chunksLines = preChunk
	.concat(chunk.toString())
	.split(this.linebreak);
	
	this.chunksLines = this.chunksLines.concat(chunksLines)
	
	this.callbacks.push(callback);
	this.send();
};

Lines.prototype.send = function() {
	while (this.reading && this.chunksLines.length > 0) {
		this.reading = this.push(this.chunksLines.shift());
	}
	
	if (this.chunksLines.length > 0) return;
	
	if (this.callbacks.length > 0){
		return this.callbacks.shift()();
	}
}

module.exports = Lines;
