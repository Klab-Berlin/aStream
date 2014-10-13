var should = require('should'),
	aStream = require('..');

describe("check the Lines-Break - Transform-Stream", function(){	
	
	describe("check lineBreaksfrom Buffer - Array", function(){
		it("a Buffer array with aStream.Array should return correct lines", function(done){
			var join = '\n';
			var testArray = [
				'hello,',
				'this is the second Line', 
				'the next line is clear', 
				'', 
				'last Line'
			], counter = 0;
			var buffer = new Buffer(testArray.join(join));
			
			new aStream.Array([buffer])
			.pipe(new aStream.Lines({linebreak : join}))
			.on('data', function(item){
				item.should.be.String;
				item.should.be.exactly(testArray[counter]);
				counter++;
			})
			.on('end', function(){
				counter.should.be.exactly(testArray.length)
				done();
			});
		});
	});
	
	describe("check lineBreaksfrom Buffer - Array", function(){
		it("a Buffer array with aStream.Array should return correct lines", function(done){
			var join = '\r\n';
			var testArray = [
				'hello for the second time,',
				'this is the another second Line', 
				'', 
				'there was a clear line'
			], counter = 0;
			var buffer = new Buffer(testArray.join(join));
			
			new aStream.Array([buffer])
			.pipe(new aStream.Lines({linebreak : join}))
			.on('data', function(item){
				item.should.be.String;
				item.should.be.exactly(testArray[counter]);
				counter++;
			})
			.on('end', function(){
				counter.should.be.exactly(testArray.length)
				done();
			});
		});
	});
});