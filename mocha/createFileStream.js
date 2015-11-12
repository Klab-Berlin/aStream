var rootDir = __dirname.split('/').slice(0, -1).join('/');

var aStream = require(rootDir),
	should = require('should');
	
var dirFiles = [];

before(function(done){
	new aStream.ReadDir(rootDir + '/lib')
	.on('data', dirFiles.push.bind(dirFiles))
	.on('end', function(){
		if (dirFiles.length === 0) throw new Error('no files found for test in ' + __dirname);
		done();
	})
})	
	
describe("CreateFileStreams", function() {
	
	it ('should return buffers and finish', function(done){
		var counter = 0;
		
		new aStream.ReadDir(rootDir + '/lib')
		.pipe(new aStream.CreateFileStreams())
		.on('data', function(data){
			data.should.be.a.Buffer;
			counter += 1;
		})
		.pipe(new aStream.WriteNull())
		.on('finish', function(){
			counter.should.be.above(dirFiles.length - 1);
			done()
		})
	})
	
	it ('should not get something and end by given no files', function(done){
		var counter = 0;
		
		new aStream.Array([])
		.pipe(new aStream.CreateFileStreams())
		.on('data', function(data){
			data.should.be.a.Buffer;
			counter += 1;
		})
		.pipe(new aStream.WriteNull())
		.on('finish', function(){
			counter.should.equal(0);
			done()
		})
	})
});