var Readable = require('stream').Readable,
	inherits = require('util').inherits;

var ArrayStream = function(array) {
	Readable.call(this, { objectMode : true });
	this.array = array;
}

inherits(ArrayStream, Readable);

ArrayStream.prototype._read = function () {
	var value = this.array.length > 0 ? this.array.shift() : null; 
	this.push(value);
};

module.exports = ArrayStream;