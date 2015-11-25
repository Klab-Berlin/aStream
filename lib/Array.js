var Readable = require('stream').Readable,
	inherits = require('util').inherits;

var ArrayStream = function(array) {
	Readable.call(this, { objectMode : true });
	this.array = array;
	this.counter = 0;
}

inherits(ArrayStream, Readable);

ArrayStream.prototype._read = function () {
	var value = this.counter < this.array.length ? this.array[this.counter] : null; 
	
	this.counter += 1;
	this.push(value);
};

module.exports = ArrayStream;