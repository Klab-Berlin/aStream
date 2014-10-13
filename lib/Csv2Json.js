var Transform = require('stream').Transform,
	inherits = require('util').inherits;

var Csv2Json = function(options) {
	Transform.call(this,{ objectMode : true });
	this.counter = 0;
	this.options = typeof options === 'object' ? options : {};
	this.split = ';';
	this.firstClear = false;
	this.headNames;
}

inherits(Csv2Json, Transform);

Csv2Json.prototype._transform = function (line, encoding, callback) {
	this.counter += 1;
	if (this.counter === 1) return this.setHeader(line, encoding, callback);
	if (line === '') return callback();

	var self = this,
		json = {};

	line.split(this.split)
	.splice(0,this.headNames.length)
	.forEach(function(row, i){
		json[self.headNames[i]] = row;
	});

	this.push(json);
	callback();
};

Csv2Json.prototype.headerFilter = function(row) {
	this.firstClear = this.firstClear || row === '';
	return !this.firstClear;
}

Csv2Json.prototype.setHeader = function(line, encoding, callback) {
	if (Array.isArray(this.header)) return;
	
	this.headNames = line.split(this.split)
	.filter(this.headerFilter.bind(this));	

	return callback();
}


module.exports = Csv2Json;