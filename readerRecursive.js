var parseString = require('xml2js').parseString,
	fs = require('fs');
var xmlFile = "base.xml";
var fileData = fs.readFileSync(xmlFile, 'utf-8');

const attr = ['sport', 'event', 'match', 'bets', 'bet', 'choice']

function readChildren(element, indiceAtributo=0){
	let idxAttr = indiceAtributo;

	if(element.children){
		idxAttr++;
		element.children[attr[indiceAtributo]].forEach(function(elem) {
			elem.parent = element.id
			readChildren(elem, idxAttr);
		});
	}
}

parseString(fileData,{explicitChildren:true, childkey:"children", explicitRoot:false}, function (err, result) {
	readChildren(result);
});