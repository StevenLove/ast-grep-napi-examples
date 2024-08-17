import * as sg from "@ast-grep/napi";
import * as fs from 'fs/promises';

(async() => {
		const source = await fs.readFile("./sourceFile.js", "utf-8");
		const ast = sg.js.parse(source, { sourceType: "module" });
		const node = ast.root().find("console.log");

		console.log(node.kind());
})();