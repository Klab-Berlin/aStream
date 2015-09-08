var Duplex = require('stream').Duplex,
	fs = require('fs'),
	inherits = require('util').inherits;

var CreateFileStreams = function(){
	Duplex.call(this, { objectMode : true });
	this.files = [];
	this.status = {
		read : false,
		send : false
	}
}

inherits(CreateFileStreams, Duplex);

CreateFileStreams.prototype._read = function(){
	this.status.read = true;
	this.send();
}	

CreateFileStreams.prototype._write = function(file, encoding, callback){
	this.files.push(file);
	this.send();
	callback();
}	

CreateFileStreams.prototype.create = function(){
	if (this.files.length === 0) return;
	var self = this,
		path = this.files.shift();

	this.fileStream = fs.createReadStream(path);
	
	this.fileStream
	.on('readable', this.onFileStreamReadable.bind(this))
	.on('end', this.onFileStreamEnd.bind(this));
}

CreateFileStreams.prototype.onFileStreamReadable = function(){
	this.status.send=true;
	this.send();
}

CreateFileStreams.prototype.onFileStreamEnd = function(){
	if (this.files.length === 0) return this.push(null);
	this.create();
}

CreateFileStreams.prototype.send = function(){
	if (typeof this.fileStream === 'undefined') this.create();
	if (!this.status.send || !this.status.read) return;
	
	this.status.send=false;
	this.status.read=false;
	this.push(this.fileStream.read());
}

module.exports = CreateFileStreams;