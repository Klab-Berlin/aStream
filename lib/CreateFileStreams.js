var Duplex = require('stream').Duplex,
	fs = require('fs'),
	inherits = require('util').inherits;

var CreateFileStreams = function(){
	Duplex.call(this);

	this.readReady = false;
	this.fileStreamReady = false;

	this.on('finish', function(){
		this.push(null)
	})
}

inherits(CreateFileStreams, Duplex);

CreateFileStreams.prototype._read = function(){
	this.readReady = true;
	this.__read();
}

CreateFileStreams.prototype.__read = function(){
	if (!this.fileStreamReady || !this.readReady) return;

	this.readReady = false;
	this.fileStreamReady = false

	this.push(this.fileStream.read());
}

CreateFileStreams.prototype._write = function(buf, encoding, callback){
	var self = this;

	this.fileStream = fs.createReadStream(buf.toString())
	.on('readable', function(){
		self.fileStreamReady = true;
		self.__read();
	})
	.on('end', callback);
}	

module.exports = CreateFileStreams;