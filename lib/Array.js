// ARRAYSTREAM
var Readable = require('stream').Readable,
	inherits = require('util').inherits;

var Array = function(array) {
	Readable.call(this, { objectMode : true });
	this.array = array;
}

inherits(Array, Readable);

Array.prototype._read = function () {
	this.array.forEach(this.push.bind(this));
	this.push(null);
};


module.exports = Array;