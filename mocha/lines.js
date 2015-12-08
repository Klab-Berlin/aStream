var rootDir = __dirname.split('/').slice(0, -1).join('/');

var aStream = require(rootDir),
	should = require('should');

var exampleText = [
	"Lorem ipsum dolor sit amet,",
	"consetetur sadipscing elitr,",
	"sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,",
	"sed diam voluptua.",
	"At vero eos et accusam et justo duo dolores et ea rebum.",
	"Stet clita kasd gubergren,",
	"no sea takimata sanctus est Lorem ipsum dolor sit amet.",
	"Lorem ipsum dolor sit amet,",
	"consetetur sadipscing elitr,",
	"sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,", 
	"sed diam voluptua.",
	"At vero eos et accusam et justo duo dolores et ea rebum.",
	"Stet clita kasd gubergren,",
	"no sea takimata sanctus est Lorem ipsum dolor sit amet."
];
	
describe("Lines", function() {
	it('should return all Files on data event', function(done){
		var buffer = new Buffer(exampleText.join('\r\n'));
		var counter = 0;
		
		new aStream.Array([buffer])
		.pipe(new aStream.Lines())
		.on('data', function(line){
			counter.should.lessThan(exampleText.length);
			line.should.be.a.String;
			line.should.equal(exampleText[counter]);
			counter += 1;
		})
		.on('finish', function(){
			counter.should.equal(exampleText.length);
			done();
		});
	});
});