var should = require('should'),
	aStream = require('..');

describe("check the Array - Stream", function(){	
	
	describe("check the converting csv to json", function(){
		it("it should convert the array (fired with ArrayStream) to JSON", function(done){
			var testArray = [
				'spalte 1;spalte 2;spalte 3',
				'wert1;wert2;wert3',
				'value1;value2;value3'
			], counter = 0;
			
			new aStream.Array(testArray)
			.pipe(new aStream.Csv2Json())
			.on('data', function(item){
				counter++;
				item.should.be.an.Object;
				var value = (counter === 1) ? 'wert' : 'value';
				Object.keys(item).length.should.be.exactly(3);
				item.should.have.property('spalte 1', value + '1');
				item.should.have.property('spalte 2', value + '2');
				item.should.have.property('spalte 3', value + '3');
			})
			.on('end', function(){
				counter.should.be.exactly(testArray.length - 1)
				done();
			});
		});
	});
	
	describe("check a second time", function(){
		it("it should convert the array (fired with ArrayStream) to JSON", function(done){
			var testArray = [
				'spalte1;spalte2;spalte3',
				'4;5;6',
				'hihi;haha;hoho'
			], counter = 0;
			
			new aStream.Array(testArray)
			.pipe(new aStream.Csv2Json())
			.on('data', function(item){
				counter++;
				item.should.be.an.Object;
				Object.keys(item).length.should.be.exactly(3);
				if (counter === 1) {
					item.should.have.property('spalte1', '4');
					item.should.have.property('spalte2', '5');
					item.should.have.property('spalte3', '6');
					return;
				}
				
				item.should.have.property('spalte1', 'hihi');
				item.should.have.property('spalte2', 'haha');
				item.should.have.property('spalte3', 'hoho');
				
			})
			.on('end', function(){
				counter.should.be.exactly(testArray.length - 1)
				done();
			});
		});
	});
	
});