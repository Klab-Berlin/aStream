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