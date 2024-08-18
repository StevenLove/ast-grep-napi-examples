import * as sg from "@ast-grep/napi";
import * as fs from 'fs/promises';

const styledToCSS = async (path) => {
	const source = await fs.readFile(path, "utf-8");
	const ast = await sg.jsx.parseAsync(source);
	// This pattern will only match instances of <StyledLink> that are inside of a <div> AND that use tabs for indentation
	// let pattern = `	<div>
	// 	<StyledLink>$$$CONTENT</StyledLink>
	// </div>`; 

	// This pattern won't match instances of <StyledLink> that are inside of any other elements
	let pattern = `<StyledLink>$$$CONTENT</StyledLink>`;


	let nodes = ast.root().findAll(pattern);




	console.log(`
Searched for
  ${pattern} 
Results:`);
	nodes.forEach((node,index) => {
		console.log(`  Match ${index + 1}:
    ${node?.text()}
---------------------------------`);
	});

}

styledToCSS("./sourceFile.jsx")