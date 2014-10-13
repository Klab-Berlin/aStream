var should = require('should'),
	aStream = require('..');

describe("check the Array - Stream", function(){	
	
	describe("check an Object - Array", function(){
		it("it should fire events for every Object in Array", function(done){
			var testArray = [
				{ test : 'number 1'},
				{ test : 'number 2'}, 
				{ test : 'number 3'}, 
				{ test : 'number 4'}, 
				{ test : 'number 5'}
			], counter = 0;
			
			var str = new aStream.Array(testArray);
			str.on('data', function(item){
				item.should.should.be.an.Object;
				item.test.should.be.ok;
				item.test.should.be.a.String;
				item.test.should.be.exactly(testArray[counter].test);
				JSON.stringify(item).should.be.exactly(JSON.stringify(testArray[counter]));
				counter++;
			});
			str.on('end', function(){
				counter.should.be.exactly(testArray.length)
				done();
			});
		});
	});
	
	describe("check another time", function(){
		it("it should fire events for every Object in Array", function(done){
			var testArray = [
				{ test : 110101},
				{ test : 'hihi'}, 
				{ test : true}, 
				{ test : 11, foo : 'bar'}, 
				{ test : -1111}
			], counter = 0;
			
			var str = new aStream.Array(testArray);
			str.on('data', function(item){
				item.test.should.be.ok;
				item.test.should.be.exactly(testArray[counter].test);
				JSON.stringify(item).should.be.exactly(JSON.stringify(testArray[counter]));
				counter++;
			});
			str.on('end', function(){
				counter.should.be.exactly(testArray.length)
				done();
			});
		});
	});
	
});