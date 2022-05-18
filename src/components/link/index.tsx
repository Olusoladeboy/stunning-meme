import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface Props extends NavLinkProps {}

const Link = (props: Props) => {
	return (
		<NavLink
			{...props}
			style={{ textDecoration: 'none', color: 'inherit', ...props.style }}
		>
			{props.children}
		</NavLink>
	);
};

export default Link;
