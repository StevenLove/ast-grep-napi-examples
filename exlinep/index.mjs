import * as sg from "@ast-grep/napi";
import * as fs from "fs/promises";

const styledToCSS = async (path) => {
  const outputFileDir = path.split("/").slice(0, -1).join("/") + "/";
  console.log(outputFileDir);
  const source = await fs.readFile(path, "utf-8");
  const ast = await sg.tsx.parseAsync(source);
  const styledComponents = ast.root().findAll("const $COMPONENT = styled($TAG)`$CONTENT`");

  styledComponents.forEach((node) => {
    const componentName = node.getMatch("COMPONENT")?.text();
    const tagName = node.getMatch("TAG")?.text();

    const cssContent = node.getMatch("CONTENT")?.text();
    const divNodes = ast.root().findAll(`<${componentName} $$$ARGS>$$$PROPS</${componentName}>`);
    divNodes.forEach(node=>{
			const divContent = node.getMultipleMatches("PROPS").map((n) => n.text()).join("");
			console.log(`\nContents of ${componentName}: ${divContent}`);
		})

    fs.appendFile(
      outputFileDir + "styles.module.css",
      `/* ${componentName} styles */\n.${componentName} {${cssContent}}\n`,
    );
  });
};

styledToCSS("./src/components/banner/index.tsx");