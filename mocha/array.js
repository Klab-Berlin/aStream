var rootDir = __dirname.split('/').slice(0, -1).join('/');

var aStream = require(rootDir),
	should = require('should');
	
describe("Array", function() {

	it('should return all values in roder by event', function(done){
		var testArray = [1, 2, 3, 'four', true];
		var toTestArray = testArray.slice(0);
		
		new aStream.Array(testArray)
		.on('data', function(file){
			toTestArray.length.should.be.greaterThan(0);
			file.should.be.equal(toTestArray.shift());
		})
		.on('end', function(){
			toTestArray.length.should.equal(0);
			done();
		})
	});

	it('should return all values in roder by read', function(){
		var testArray = [1, 2, 3, 'four', true];
		var toTestArray = testArray.slice(0);
		var stream = new aStream.Array(testArray);
			
		for (var value = stream.read(); value !== null; value = stream.read()) {
			value.should.equal(toTestArray.shift());
		}
		
		toTestArray.length.should.equal(0);
	})
	
	it('should not reduce given array', function(){
		var testArray = [1, 2, 3, 'four', true];
		var length = testArray.length;
			
		new aStream.Array(testArray)
		.on('data', function(file){
			testArray.length.should.equal(length);
		})
		.on('end', function(){
			testArray.length.should.equal(length);
			done();
		})
	})
});