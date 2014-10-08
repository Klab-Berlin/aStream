var Transform = require('stream').Transform,
	inherits = require('util').inherits;


var Json2Csv = function(options) {

	Transform.call(this,{ objectMode : true });
	
	this.counter = 0;
	this.header = [];
	this.split = ';'
}

inherits(Json2Csv, Transform);

Json2Csv.prototype._transform = function (json, encoding, callback) {
	this.counter += 1;
	if (this.counter === 1) {
		this.header = Object.keys(json);
		this.push(this.header.join(this.split) + '\r\n');
	}
	var csv = [];
	
	this.header.forEach(function(row){
		csv.push(json[row]);
	});
	
	this.push(csv.join(this.split) + '\r\n');
	callback();
};


module.exports = Json2Csv;