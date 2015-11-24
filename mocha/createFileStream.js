var rootDir = __dirname.split('/').slice(0, -1).join('/');

var aStream = require(rootDir),
	should = require('should'),
	fs = require('fs');

var testDir = rootDir + '/lib',
	dirFiles = [];

before(function(done){
	fs.readdir(testDir, function(err, data){
		dirFiles = data.map(function(file){
			return fs.statSync(testDir + "/" + file).size;
		})
		done();
	})
})	
	
describe("CreateFileStreams", function() {

	it('should return buffers and finish', function(done){
		var counter = 0;

		new aStream.ReadDir(testDir)
		.pipe(new aStream.CreateFileStreams())
		.on('data', function(data){
			data.should.be.a.Buffer;
			dirFiles[0] -= data.length;
			if (dirFiles[0] === 0) dirFiles.shift();
		})
		.pipe(new aStream.WriteNull())
		.on('finish', function(){
			dirFiles.length.should.equal(0);
			done()
		})
	});

	it('should not get something and end by given no files', function(done){
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