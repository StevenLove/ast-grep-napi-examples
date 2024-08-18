# Overview
ast-grep napi is not matching JSX elements that match just fine in the playground. A simple pattern like `<StyledLink>$A</StyledLink>` causes a problem as it won't match nested StyledLink elements.

# Difficulty matching
Similar to the napi, we can explore in the ast-grep cli and see that it also has these problems (if the default strictness is used).

- Tabs and spaces are treated as being different
- a JSX element won't be matched if it is inside of another element.
	- I believe this is because the AST created for the pattern has an `expression_statement` at its root, which will only match with the root of another JSX element and not some nested JSX element.

The problems can be resolved in the CLI by using `--strictness=relaxed` but this is not available as an option for the napi.

# Examples

You can copy these commands and run them in the terminal to see the results. They search the `sourceFile.jsx` file in this directory.


## With Spaces
This query will not match JSX that uses tabs
```sh
sg -p '  <div>
    <StyledLink>$A</StyledLink>
  </div>' -l jsx
```
Results:
```sh
sourceFile.jsx
28│  <div>
29│    <StyledLink>Inside Div With Spaces</StyledLink>
30│  </div>
```

## With Tabs
This query will only match where the JSX also uses tabs
```sh
sg -p '	<div>
		<StyledLink>$A</StyledLink>
	</div>' -l jsx
```
Results:
```sh
sourceFile.jsx
22│     <div>
23│             <StyledLink>Inside Div With Tabs</StyledLink>
24│     </div>
```
## Without Context
This only matches the StyledLink element when it is not within a div
```sh
sg -p '<StyledLink>$A</StyledLink>' -l jsx 
```
Results:
```sh
sourceFile.jsx
34│     <StyledLink>No Div, Tab</StyledLink>
```
## Without Context, but with relaxed strictness
This matches all 4 occurrences
```sh
sg -p '<StyledLink>$A</StyledLink>' -l jsx --strictness=relaxed
```
Results:
```sh
sourceFile.jsx
15│    <br />
16│    <StyledLink>Deeper Context</StyledLink>
22│     <div>
23│             <StyledLink>Inside Div With Tabs</StyledLink>
28│  <div>
29│    <StyledLink>Inside Div With Spaces</StyledLink>
34│     <StyledLink>No Div, Tab</StyledLink>
```

# Contrasting with Playground
You can see on the playground that nested jsx elements match fine.

https://ast-grep.github.io/playground.html#eyJtb2RlIjoiUGF0Y2giLCJsYW5nIjoidHN4IiwicXVlcnkiOiI8U3R5bGVkTGluaz4kJCRBPC9TdHlsZWRMaW5rPiIsInJld3JpdGUiOiIiLCJzdHJpY3RuZXNzIjoic21hcnQiLCJzZWxlY3RvciI6ImpzeF9lbGVtZW50IiwiY29uZmlnIjoiaWQ6IG5vLXVudXNlZC12YXJzXG5ydWxlOlxuICAgIGtpbmQ6IGxvY2FsX3ZhcmlhYmxlX2RlY2xhcmF0aW9uXG4gICAgYWxsOlxuICAgICAgICAtIGhhczpcbiAgICAgICAgICAgIGhhczpcbiAgICAgICAgICAgICAgICBraW5kOiBpZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgcGF0dGVybjogJElERU5UXG4gICAgICAgIC0gbm90OlxuICAgICAgICAgICAgcHJlY2VkZXM6XG4gICAgICAgICAgICAgICAgc3RvcEJ5OiBlbmRcbiAgICAgICAgICAgICAgICBoYXM6XG4gICAgICAgICAgICAgICAgICAgIHN0b3BCeTogZW5kXG4gICAgICAgICAgICAgICAgICAgIGFueTpcbiAgICAgICAgICAgICAgICAgICAgICAgIC0geyBraW5kOiBpZGVudGlmaWVyLCBwYXR0ZXJuOiAkSURFTlQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLSB7IGhhczoge2tpbmQ6IGlkZW50aWZpZXIsIHBhdHRlcm46ICRJREVOVCwgc3RvcEJ5OiBlbmR9fVxuZml4OiAnJ1xuIiwic291cmNlIjoiY29uc3QgTGluayA9ICh7IGNsYXNzTmFtZSwgY2hpbGRyZW4gfSkgPT4gKFxuICA8YSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAge2NoaWxkcmVufVxuICA8L2E+XG4pO1xuXG5jb25zdCBTdHlsZWRMaW5rID0gc3R5bGVkKExpbmspYFxuICBjb2xvcjogI0JGNEY3NDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5gO1xuXG5yZW5kZXIoXG4gIDxkaXY+XG4gICAgPExpbms+VW5zdHlsZWQsIGJvcmluZyBMaW5rPC9MaW5rPlxuICAgIDxiciAvPlxuICAgIDxTdHlsZWRMaW5rPlN0eWxlZCwgZXhjaXRpbmcgTGluazwvU3R5bGVkTGluaz5cbiAgPC9kaXY+XG4pO1xuXG5yZW5kZXIoXG4gIDxkaXY+XG4gICAgPFN0eWxlZExpbms+aGk8L1N0eWxlZExpbms+XG4gIDwvZGl2PlxuKSJ9

# Testing NAPI
you can run `node index.js` to test the NAPI rather than the CLI and manually modify the pattern you are testing by modifying index.js.