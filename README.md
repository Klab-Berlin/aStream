# aStream
some Wrapper on the Stream-API

#### Array

Array is an Read Stream which gives you all Array-Elements in order

```javascript
		var aStream = require('aStream');

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
```

#### CreateFileStreams

CreateFileStreams is an Duplex Stream which get a pathes of Files and stream the Buffer File by File

```javascript
		var aStream = require('aStream'),
			fs = require('fs');
		
		new aStream.ReadDir('.')
		// .on('data', function(data){
			// console.log('exists', fs.existsSync(data));
		// })
		.pipe(new aStream.CreateFileStreams())
		// .on('data', function(data){
			// console.log('Buffer:', Buffer.isBuffer(data));
		// })
		.pipe(new aStream.WriteNull());

```
