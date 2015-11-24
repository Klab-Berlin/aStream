# aStream
some Wrapper on the Stream-API

#### CreateFileStreams

CreateFileStreams is an Duplex Stream which get a pathes of Files and stream the Buffer File by File

```javascript
var aStream = require('aStream');

// create Pathes
new aStream.ReadDir('.')

// create Buffer
.pipe(new aStream.CreateFileStreams())

// remove Buffers
.pipe(new aStream.WriteNull());

```
