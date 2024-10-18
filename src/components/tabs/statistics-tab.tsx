import React from 'react';
import { Box, Button, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { SECOUNDARY_COLOR, STATISTIC_TAB } from 'utilities';

interface Props {
	selectFilter?: (tab: string) => void;
	selectedFilter?: string;
}

const StatisticsTab = ({ selectFilter, selectedFilter }: Props) => {
	const handleSelectFilter = (value: string) => {
		typeof selectFilter === 'function' && selectFilter(value);
	};
	return (
		<Grid>
			{Object.values(STATISTIC_TAB).map((value) => (
				<GridItem
					isActive={Boolean(value === selectedFilter)}
					onClick={() => handleSelectFilter(value)}
					key={value}
				>
					{value}
				</GridItem>
			))}
		</Grid>
	);
};

const Grid = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: theme.spacing(3),
}));

const GridItem = styled(Button)<{ isActive?: boolean }>(
	({ theme, isActive }) => ({
		backgroundColor: isActive ? `${SECOUNDARY_COLOR} !important` : grey['200'],
		color: grey['800'],
		borderRadius: '20px',
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),

		':hover': {
			backgroundColor: SECOUNDARY_COLOR,
			color: grey['50'],
		},
	})
);

export default StatisticsTab;
