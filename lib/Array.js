var Readable = require('stream').Readable,
	inherits = require('util').inherits;

var ArrayStream = function(array) {
	Readable.call(this, { objectMode : true });
	this.array = array;
}

inherits(ArrayStream, Readable);

ArrayStream.prototype._read = function () {
	this.array.forEach(this.push.bind(this));
	this.push(null);
};

module.exports = ArrayStream;