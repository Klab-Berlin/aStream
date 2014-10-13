var Transform = require('stream').Transform;

var Json2xml = function(options) {
	this.options = typeof options === 'object' ? options : {};
	if (typeof this.options.name === 'string'){
		this.push('<' + options.name + '>')
	}
}

Json2xml.prototype = new Transform({ objectMode : true });
Json2xml.prototype.constructur = Json2xml;

Json2xml.prototype._transform = function (unit, encoding, callback) {
	var xml = [];
	
	if (typeof this.options.objName === 'string') {
		xml.push('<' + this.options.objName + '>');
	}
	
	for (var properties in unit) {
		if (typeof unit[properties] ==='undefined') continue;
		if (unit[properties] === '') continue;
		if (unit[properties] === null) continue;
		if (Array.isArray(unit[properties]) && unit[properties].length === 0) continue;
		xml.push('\t<'+properties+'>');
		if (typeof unit[properties] === 'object') {	// ist ein Array
			for (var key in unit[properties]) {
				xml.push(
					'\t\t<' + properties.slice(0,-1) + '>',
					'\t\t<![CDATA[' + unit[properties][key]+']]>',
					'\t\t</' + properties.slice(0,-1) + '>'
				)
			}
		} else {
			xml.push('\t<![CDATA[' + unit[properties] + ']]>');
		}
		xml.push('\t</' + properties + '>');
		
	}
	
	if (typeof  this.options.objName === 'string') {
		xml.push('</' + this.options.objName +'>')
	}

	this.push(xml.join('\n'));
	callback();
};

Json2xml.prototype._flush = function(callback){
	if (typeof this.options.name === 'string'){
		this.push('</' + this.options.name + '>')
	}
	callback();
}

module.exports = Json2xml;