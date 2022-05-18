import React from 'react';
import { Drawer as MuiDrawer, useTheme } from '@mui/material';
import {
	DRAWER_WIDTH,
	MIN_DRAWER_WIDTH,
	TRANSITION,
} from '../../utilities/constant';
import DrawerList from '../list/drawer-list';
import { useAppSelector } from '../../store/hooks';

const Drawer = () => {
	const theme = useTheme();
	const { isToggleDrawer } = useAppSelector((store) => store.appState);
	return (
		<MuiDrawer
			sx={{
				'& .MuiDrawer-paper': {
					boxSizing: 'border-box',
					width: isToggleDrawer ? DRAWER_WIDTH : MIN_DRAWER_WIDTH,
					transition: TRANSITION,
					padding: '20px 10px',
					borderRightColor: theme.palette.secondary.main,
				},
				padding: '20px',
			}}
			open
			variant={'permanent'}
		>
			<DrawerList />
		</MuiDrawer>
	);
};

export default Drawer;
