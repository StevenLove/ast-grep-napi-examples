// This file exists only to be parsed by ast-grep
// There is no significance to the code in this file
module.exports = (()=>{
	console.log('we are inside sourceFile.js');
	let x = 1;
	return {
		x,
		y: ()=>x+1
	}
})();