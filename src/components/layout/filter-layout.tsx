import React, { Fragment, ReactNode } from 'react';
import { Box, styled, Popper, ClickAwayListener } from '@mui/material';
import Button from '../button';

interface Props {
	children: ReactNode;
}

const FilterLayout: React.FC<Props> = ({ children }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const closePopper = () => setAnchorEl(null);

	return (
		<ClickAwayListener onClickAway={closePopper}>
			<Box>
				<FilterByButton onClick={handleClick}>Filter by</FilterByButton>
				<Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
					{children}
				</Popper>
			</Box>
		</ClickAwayListener>
	);
};

const FilterByButton = styled(Button)(({ theme }) => ({}));

export default FilterLayout;
