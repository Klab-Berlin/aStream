# aStream
some Wrapper on the Stream-API

#### CreateFileStreams

CreateFileStreams is an Duplex Stream which get a pathes of Files and stream the Buffer File by File

```javascript
		var aStream = require('..'),
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
