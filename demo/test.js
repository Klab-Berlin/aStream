var ArrayStream = require('..').Array,
	Json2Xml =require('..').Json2Xml;
	
var arr = [{
	title : 'lala',
	elemente : [1,2,3]
},{
	title : 'lala2',
	elemente : ['aa','bb','cc']
}];

new ArrayStream(arr)
.pipe(new Json2Xml({name : 'metadata', objName : 'sinneinheit'}))
.on('data',console.log)
.on('end',console.log)