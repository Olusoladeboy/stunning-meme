import React from 'react';
import { Box, Button, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { SECOUNDARY_COLOR, LOG_TAB } from 'utilities';

interface Props {
	onChangeTab?: (tab: string) => void;
	currentTab?: string;
}

const LogTab = ({ onChangeTab, currentTab }: Props) => {
	return (
		<Grid>
			{Object.values(LOG_TAB).map((value) => (
				<GridItem
					active={value.toLocaleLowerCase() === currentTab}
					onClick={() =>
						typeof onChangeTab === 'function' &&
						onChangeTab(value.toLocaleLowerCase())
					}
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

const GridItem = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
	backgroundColor: active ? `${SECOUNDARY_COLOR} !important` : grey['200'],
	color: active ? grey['50'] : grey['800'],
	borderRadius: '20px',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	minWidth: '120px',
	':hover': {
		backgroundColor: SECOUNDARY_COLOR,
		color: grey['50'],
	},
}));

export default LogTab;
