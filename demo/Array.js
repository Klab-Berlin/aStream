var aStream = require('..');

var testArray = ['a', 'b', 'c'];
var checkArray = testArray.map(function(data){
	return data;
});

new aStream.Array(testArray)
.on('data', function(arrayElement){
	console.log('same order:', arrayElement === checkArray.shift())
})
.on('end', function(){
	console.log('all elements given:', checkArray.length === 0);
});