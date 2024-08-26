const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
);

const StyledLink = styled(Link)`
  color: #BF4F74;
  font-weight: bold;
`;

render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <br />
    <StyledLink>Deeper Context</StyledLink>
  </div>
);


render(
	<div>
		<StyledLink>Inside Div With Tabs</StyledLink>
	</div>
);

render(
  <div>
    <StyledLink>Inside Div With Spaces</StyledLink>
  </div>
);

render(
	<StyledLink>No Div, Tab</StyledLink>
);