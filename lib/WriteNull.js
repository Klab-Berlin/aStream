var Writable = require('stream').Writable,
	inherits = require('util').inherits;

var WriteNull = function() {
	Writable.call(this, { objectMode : true });
}

inherits(WriteNull, Writable);

WriteNull.prototype._write = function(file, encoding, callback){
	callback();
};

module.exports = WriteNull;