var rootDir = __dirname.split('/').slice(0, -1).join('/');

var aStream = require(rootDir),
	should = require('should'),
	fs = require('fs');

var testDir = rootDir + '/lib',
	dirFiles = [];

function extendFileWithDir(file){
	return testDir + '/' + file;
}
	
	
before(function(done){
	fs.readdir(testDir, function(err, data){
		dirFiles = data;
		done();
	})
})	
	
describe("ReadDir", function() {

	it('should return all Files on data event', function(done){
		var checkFiles = dirFiles.map(extendFileWithDir);
		
		new aStream.ReadDir(testDir)
		.on('data', function(file){
			checkFiles.length.should.be.greaterThan(0);
			file.should.be.equal(checkFiles.shift());
		})
		.on('end', function(){
			checkFiles.length.should.equal(0);
			done();
		})
	});

	it('should return all files by read', function(){
		var checkFiles = dirFiles.map(extendFileWithDir),
			stream = new aStream.ReadDir(testDir);
			
		for (var value = stream.read(); value !== null; value = stream.read()) {
			value.should.equal(checkFiles.shift());
		}
		
		checkFiles.length.should.equal(0);
	})
});